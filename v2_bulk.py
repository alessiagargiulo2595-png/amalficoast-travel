#!/usr/bin/env python3
"""Apply Style Guide V2.0 to all Astro pages."""

import os
import re

PAGES_DIR = os.path.join(os.path.dirname(__file__), 'src', 'pages')

def process_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # ── OVERLINES: text-med-blue uppercase → text-med-gold
    # Pattern: tracking-[0.2em] or tracking-[0.3em] + uppercase labels
    content = re.sub(r'text-med-blue([\s"]+[^"]*?uppercase)', r'text-med-gold\1', content)
    # Fix back any non-overline med-blue usages reversed above (headings, links)
    # We specifically target tracking-[0.2em] and tracking-[0.3em] patterns already in overline context
    # Safer: replace tracking-[0.2em] → tracking-[0.3em] for overlines
    content = content.replace('tracking-[0.2em]', 'tracking-[0.3em]')

    # ── IMAGE CARDS: rounded values
    content = content.replace('rounded-[2.5rem]', 'rounded-[3rem]')
    # Section-level large containers: rounded-3xl → rounded-[4rem]
    content = content.replace('rounded-3xl', 'rounded-[4rem]')

    # ── IMAGE CARD OVERLAYS: from-black/80 → from-black/90 (gradient overlays)
    content = content.replace('from-black/80', 'from-black/90')
    content = content.replace('from-black/70', 'from-black/90')

    # ── INFO CARDS: border-gray-100 → border-slate-100
    content = content.replace('border-gray-100', 'border-slate-100')
    content = content.replace('border-gray-200', 'border-slate-200')

    # ── INFO CARDS: shadow-2xl → shadow-sm with hover:shadow-xl
    # Only for info card context (bg-white, bg-med-cream cards, not image cards)
    # Replace standalone shadow-2xl that's not on image cards (image cards have rounded-[3rem])
    # This is tricky — skip for now, handle per-page

    # ── TYPOGRAPHY: text-gray-500 → text-slate-500, text-gray-400 → text-slate-400
    content = content.replace('text-gray-500', 'text-slate-500')
    content = content.replace('text-gray-400', 'text-slate-400')
    content = content.replace('text-gray-600', 'text-slate-600')
    content = content.replace('text-gray-700', 'text-slate-700')
    content = content.replace('text-gray-300', 'text-slate-300')

    # ── HEADING COLOR: text-charcoal → text-slate-900 for headings
    content = re.sub(r'(font-serif[^"]*?)text-charcoal', r'\1text-slate-900', content)

    # ── BUTTONS: rounded-xl/rounded-lg on buttons → rounded-full
    content = re.sub(r'(bg-med-blue[^"]*?)rounded-xl', r'\1rounded-full', content)
    content = re.sub(r'(bg-med-blue[^"]*?)rounded-lg', r'\1rounded-full', content)
    content = re.sub(r'(bg-med-gold[^"]*?)rounded-xl', r'\1rounded-full', content)
    content = re.sub(r'(bg-med-gold[^"]*?)rounded-lg', r'\1rounded-full', content)

    # ── ICON CONTAINERS: bg-med-gold/20 → bg-med-gold/10
    content = content.replace('bg-med-gold/20', 'bg-med-gold/10')

    # ── font-light on body text
    # Add font-light to leading-relaxed text blocks if missing
    content = re.sub(r'(text-slate-500 text-(?:lg|base|sm) leading-relaxed)(?! font-light)', r'\1 font-light', content)

    # ── referrerpolicy on img tags (Astro uses lowercase referrerpolicy)
    content = re.sub(r'(<img\b(?:(?!referrerpolicy)[^>])*?)(/?>)',
                     lambda m: m.group(0) if 'referrerpolicy' in m.group(0) else m.group(1) + ' referrerpolicy="no-referrer"' + m.group(2),
                     content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


count = 0
for root, dirs, files in os.walk(PAGES_DIR):
    # Skip non-it-it pages for now
    for fname in files:
        if fname.endswith('.astro'):
            fpath = os.path.join(root, fname)
            if process_file(fpath):
                print(f'  updated: {os.path.relpath(fpath, PAGES_DIR)}')
                count += 1

print(f'\nDone. {count} files updated.')
