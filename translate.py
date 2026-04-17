#!/usr/bin/env python3
"""
translate.py — Bulk JSON translation using Claude Haiku (or Gemini Flash).

Usage:
  python translate.py it.json en.json --lang English
  python translate.py it.json es.json --lang Spanish
  python translate.py it.json fr.json --lang French --model gemini

Options:
  --lang     Target language name (default: English)
  --model    "haiku" | "gemini"  (default: haiku)
  --batch    Strings per API call (default: 60)
  --dry-run  Estimate cost without calling the API
  --resume   Skip keys already present in output file
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

# ── Model configs ──────────────────────────────────────────────────────────────

MODELS = {
    "haiku": {
        "id": "claude-haiku-4-5-20251001",
        # fallback if haiku-4-5 not available
        "fallback": "claude-3-haiku-20240307",
        "input_price":  0.80 / 1_000_000,   # $/token (claude-3-haiku)
        "output_price": 4.00 / 1_000_000,
    },
    "gemini": {
        "id": "gemini-1.5-flash",
        "input_price":  0.075 / 1_000_000,
        "output_price": 0.30  / 1_000_000,
    },
}

# ── Helpers ────────────────────────────────────────────────────────────────────

def flatten(obj, prefix="", sep="."):
    """Flatten nested dict to {dotted.key: value} — only leaf strings."""
    items = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            new_key = f"{prefix}{sep}{k}" if prefix else k
            items.update(flatten(v, new_key, sep))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            new_key = f"{prefix}{sep}{i}" if prefix else str(i)
            items.update(flatten(v, new_key, sep))
    else:
        # Leaf value — only translate non-empty strings
        if isinstance(obj, str) and obj.strip():
            items[prefix] = obj
    return items


def unflatten(flat, sep="."):
    """Rebuild nested dict from {dotted.key: value}."""
    result = {}
    for compound_key, value in flat.items():
        parts = compound_key.split(sep)
        d = result
        for part in parts[:-1]:
            # Handle list indices
            if part.isdigit():
                part = int(part)
            if isinstance(d, dict):
                d = d.setdefault(str(part) if not isinstance(part, int) else part, {})
            else:
                d = d[part]
        last = parts[-1]
        if last.isdigit():
            last = int(last)
        if isinstance(d, dict):
            d[str(last) if not isinstance(last, int) else last] = value
        else:
            d[last] = value
    return result


def deep_merge(base, overlay):
    """Merge overlay into base, keeping base structure (for lists/nested dicts)."""
    if isinstance(base, dict) and isinstance(overlay, dict):
        result = dict(base)
        for k, v in overlay.items():
            if k in result:
                result[k] = deep_merge(result[k], v)
            else:
                result[k] = v
        return result
    return overlay


def chunk(lst, size):
    for i in range(0, len(lst), size):
        yield lst[i:i + size]


def estimate_tokens(text):
    """Rough estimate: 1 token ≈ 4 chars."""
    return len(text) // 4


# ── Translation functions ──────────────────────────────────────────────────────

SYSTEM_PROMPT = (
    "You are a professional translator. "
    "Translate the JSON values (NOT the keys) into {lang}. "
    "Preserve placeholders like {{name}}, HTML tags, URLs, numbers, and brand names exactly. "
    "Return ONLY valid JSON — no explanation, no markdown fences."
)

USER_PROMPT = (
    "Translate the values in this JSON object to {lang}. "
    "Return the same JSON structure with translated values.\n\n{batch_json}"
)


def translate_batch_haiku(client, batch: dict, lang: str, model_id: str) -> dict:
    message = client.messages.create(
        model=model_id,
        max_tokens=4096,
        temperature=0,
        system=SYSTEM_PROMPT.format(lang=lang),
        messages=[{
            "role": "user",
            "content": USER_PROMPT.format(lang=lang, batch_json=json.dumps(batch, ensure_ascii=False, indent=2))
        }]
    )
    raw = message.content[0].text.strip()
    # Strip accidental markdown fences
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    return json.loads(raw)


def translate_batch_gemini(genai, model_id: str, batch: dict, lang: str) -> dict:
    model = genai.GenerativeModel(
        model_name=model_id,
        generation_config={"temperature": 0, "response_mime_type": "application/json"},
        system_instruction=SYSTEM_PROMPT.format(lang=lang),
    )
    response = model.generate_content(
        USER_PROMPT.format(lang=lang, batch_json=json.dumps(batch, ensure_ascii=False, indent=2))
    )
    raw = response.text.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    return json.loads(raw)


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Translate a JSON file using Claude Haiku or Gemini Flash.")
    parser.add_argument("input",        help="Source JSON file (e.g. it.json)")
    parser.add_argument("output",       help="Output JSON file (e.g. en.json)")
    parser.add_argument("--lang",       default="English", help="Target language (default: English)")
    parser.add_argument("--model",      default="haiku", choices=["haiku", "gemini"], help="Model to use")
    parser.add_argument("--batch",      type=int, default=60, help="Strings per API call (default: 60)")
    parser.add_argument("--dry-run",    action="store_true", help="Estimate cost, no API calls")
    parser.add_argument("--resume",     action="store_true", help="Skip keys already in output file")
    args = parser.parse_args()

    # ── Load source ──
    src_path = Path(args.input)
    if not src_path.exists():
        print(f"Error: {args.input} not found.", file=sys.stderr)
        sys.exit(1)

    with open(src_path, encoding="utf-8") as f:
        source = json.load(f)

    flat_source = flatten(source)
    total_strings = len(flat_source)
    print(f"Source: {total_strings} translatable strings in {args.input}")

    # ── Resume: skip already-translated keys ──
    existing_translations = {}
    if args.resume and Path(args.output).exists():
        with open(args.output, encoding="utf-8") as f:
            existing_out = json.load(f)
        existing_translations = flatten(existing_out)
        skip = set(existing_translations.keys())
        flat_source = {k: v for k, v in flat_source.items() if k not in skip}
        print(f"Resume: skipping {len(skip)} already-translated keys, {len(flat_source)} remaining.")

    if not flat_source:
        print("Nothing to translate. Output is already complete.")
        sys.exit(0)

    # ── Cost estimate ──
    cfg = MODELS[args.model]
    sample_json = json.dumps(flat_source, ensure_ascii=False)
    estimated_input_tokens  = estimate_tokens(sample_json) * 1.3  # system + user overhead
    estimated_output_tokens = estimate_tokens(sample_json) * 1.1  # translated values ~same length
    estimated_cost = (
        estimated_input_tokens  * cfg["input_price"] +
        estimated_output_tokens * cfg["output_price"]
    )
    num_batches = -(-len(flat_source) // args.batch)  # ceil division

    print(f"\nEstimate:")
    print(f"  Model:        {cfg['id']}")
    print(f"  Batches:      {num_batches} calls × ~{args.batch} strings")
    print(f"  Input tokens: ~{int(estimated_input_tokens):,}")
    print(f"  Output tokens:~{int(estimated_output_tokens):,}")
    print(f"  Est. cost:    ~${estimated_cost:.4f} USD")

    if args.dry_run:
        print("\nDry run — no API calls made.")
        sys.exit(0)

    print()

    # ── Init client ──
    if args.model == "haiku":
        try:
            import anthropic
        except ImportError:
            print("Install: pip install anthropic", file=sys.stderr)
            sys.exit(1)
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            print("Set ANTHROPIC_API_KEY env var.", file=sys.stderr)
            sys.exit(1)
        client = anthropic.Anthropic(api_key=api_key)
        model_id = cfg["id"]

    else:  # gemini
        try:
            import google.generativeai as genai_lib
        except ImportError:
            print("Install: pip install google-generativeai", file=sys.stderr)
            sys.exit(1)
        api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            print("Set GEMINI_API_KEY or GOOGLE_API_KEY env var.", file=sys.stderr)
            sys.exit(1)
        genai_lib.configure(api_key=api_key)
        model_id = cfg["id"]

    # ── Translate in batches ──
    keys   = list(flat_source.keys())
    values = list(flat_source.values())
    translated_flat = dict(existing_translations)  # start from existing if resuming
    total_input_tokens = 0
    total_output_tokens = 0

    for i, key_chunk in enumerate(chunk(keys, args.batch)):
        batch = {k: flat_source[k] for k in key_chunk}
        print(f"  Batch {i+1}/{num_batches} ({len(batch)} strings)...", end=" ", flush=True)
        t0 = time.time()

        retries = 3
        for attempt in range(retries):
            try:
                if args.model == "haiku":
                    result = translate_batch_haiku(client, batch, args.lang, model_id)
                else:
                    result = translate_batch_gemini(genai_lib, model_id, batch, args.lang)
                break
            except json.JSONDecodeError as e:
                print(f"\n  Warning: JSON parse error on attempt {attempt+1}: {e}")
                if attempt == retries - 1:
                    print("  Keeping original strings for this batch.")
                    result = batch
            except Exception as e:
                print(f"\n  Error on attempt {attempt+1}: {e}")
                if attempt == retries - 1:
                    print("  Keeping original strings for this batch.")
                    result = batch
                else:
                    time.sleep(2 ** attempt)

        # Merge result (keep original keys, use translated values)
        for k in key_chunk:
            translated_flat[k] = result.get(k, flat_source[k])

        elapsed = time.time() - t0
        print(f"done ({elapsed:.1f}s)")

        # Save checkpoint after each batch
        checkpoint = deep_merge(source, unflatten(translated_flat))
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(checkpoint, f, ensure_ascii=False, indent=2)

    # ── Final output ──
    final = deep_merge(source, unflatten(translated_flat))
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(final, f, ensure_ascii=False, indent=2)

    print(f"\nDone! Translated {len(flat_source)} strings → {args.output}")
    print(f"Tip: verify with:  python translate.py {args.output} check.json --lang Italian --dry-run")


if __name__ == "__main__":
    main()
