# Project Rules

## Image Standards

All images in `public/images/` must follow these rules:

- **Format**: WebP only for production use
- **Max width**: 1400px (2x retina for ~700px max display width)
- **Quality**: 85 (visually identical to higher, much smaller file size)
- **Optimization rule**: Never overwrite an image if the optimized version is larger than the original
- **Script**: Run `node scripts/optimize-images.cjs` after adding new images — it resizes any image wider than 1400px and only saves if the result is smaller
- **No quality 100**: Re-encoding lossy WebP at quality 100 inflates file size without adding real visual quality

## Deployment

- Never push to GitHub without explicit user approval
- Test changes locally before pushing
- Wait for explicit "ok", "pusha", or "push" command before pushing
