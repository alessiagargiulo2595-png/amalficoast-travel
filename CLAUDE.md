# Project Rules

## Image Standards

All images in `public/images/` must follow these rules:

- **Format**: WebP only for production use
- **Max width**: 1400px (2x retina for ~700px max display width)
- **Quality**: 85 (visually identical to higher, much smaller file size)
- **Optimization rule**: Never overwrite an image if the optimized version is larger than the original
- **Script**: Run `node scripts/optimize-images.cjs` after adding new images — it resizes any image wider than 1400px and only saves if the result is smaller
- **No quality 100**: Re-encoding lossy WebP at quality 100 inflates file size without adding real visual quality

## Multilingual Content Parity

**Every text change must be applied in ALL 5 languages: en-us, it-it, de-de, fr-fr, es-es.**

This applies to any user-facing text, not just new pages:
- New pages and new blog posts
- Rewrites of titles, H1s, meta descriptions, intros
- New paragraphs, sections, FAQs, tables added to an existing page
- Contextual internal links added inside body copy
- Alt text, breadcrumb labels, CTA labels

A change shipped in one language only is incomplete work. If a language genuinely
has no equivalent page, say so explicitly instead of silently skipping it.

**Pre-push check (mandatory):** before every push, verify parity across the 5
locales for each file touched. A quick check on the changed set:

```bash
git diff --name-only origin/main...HEAD | grep -oE 'src/pages/[a-z]{2}-[a-z]{2}/' | sort | uniq -c
```

The five locales should all appear, with comparable counts. Investigate any
imbalance before pushing.

## Deployment

- Never push to GitHub without explicit user approval
- Test changes locally before pushing
- Wait for explicit "ok", "pusha", or "push" command before pushing
- Run the multilingual parity check above as part of pre-push
