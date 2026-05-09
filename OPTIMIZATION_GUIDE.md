# Image Optimization Guide - Google Search Console Findings

## Overview
Google Search Console has flagged **81 images** as oversized, impacting page speed performance. These images need compression and optimization.

## Current Situation
- **Total image library size**: ~43.19MB (JPG: 20.41MB + WebP: 18.85MB)
- **Largest images**: Up to 2.2MB (sorrento-vs-praiano-hero.jpg)
- **Issue**: Images exceed optimal file sizes for web delivery

## Optimization Strategy

### Recommended Actions

#### 1. **Use Astro Image Component**
Replace all `<img>` tags with Astro's `<Image>` component which provides:
- Automatic format selection (WebP for modern browsers)
- Responsive image generation
- Lazy loading by default
- SRCSET support for different viewport sizes

Example:
```astro
import { Image } from 'astro:assets';
import heroImage from '../images/hero-hp.webp';

<Image src={heroImage} alt="Hero" />
```

#### 2. **Implement Responsive Images**
Create multiple versions of each image for different screen sizes:
- **Mobile (max-width: 640px)**: 600px width
- **Tablet (640px - 1024px)**: 800px width
- **Desktop (1024px+)**: 1200px width

#### 3. **Compression Targets**
Set target file sizes for optimization:

| Image Type | Current Avg | Target Size | Compression |
|-----------|-----------|------------|------------|
| Hero images | 700KB | 200-300KB | 60-70% |
| Content images | 400KB | 100-150KB | 60-70% |
| Thumbnails | 200KB | 50-80KB | 60-70% |

#### 4. **Tools & Methods**

**Online Tools (No Installation):**
- **TinyPNG/TinyJPG**: Drag-and-drop compression
  - URL: https://tinypng.com
  - Handles: JPG, PNG
  - Average compression: 60-70%

- **Squoosh** (Google's tool):
  - URL: https://squoosh.app
  - Handles: JPG, PNG, WebP
  - Lets you adjust quality and preview

**Recommended Workflow:**
1. Visit https://squoosh.app
2. Upload each image
3. Adjust quality slider (target: 60-70 quality)
4. Compare original vs compressed preview
5. Download compressed version (new)
6. Also export WebP version for modern browsers
7. Replace files in `public/images/`

### Key Optimization Points

#### For JPG Files (27.54MB total):
1. **Quality**: Reduce from 85-95% to 60-70% (imperceptible quality loss)
2. **Progressive**: Already using (maintain)
3. **Format**: Consider keeping JPG for photos, WebP for newer support
4. **Target**: Reduce to ~10-12MB total (55% compression)

#### For WebP Files (18.85MB total):
1. These are already optimized for modern browsers
2. Reduce quality from 75% to 60-65%
3. **Target**: Reduce to ~8-10MB total (45% compression)

### Implementation Steps

**Step 1: Download Optimization Tool**
- Use Squoosh (no installation): https://squoosh.app
- Or install imagemin locally

**Step 2: Batch Optimize (Recommended approach)**
```bash
# Install locally via npm (optional)
npm install --save-dev imagemin imagemin-mozjpeg imagemin-webp

# OR use online tool batch upload (5-10 images at a time)
```

**Step 3: Create WebP Variants**
For each JPG, also create a WebP version using Squoosh's export feature

**Step 4: Update HTML Usage**
Use Astro's Image component:
```astro
import { Image } from 'astro:assets';

<Image
  src={heroImage}
  alt="Description"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  quality={60}
/>
```

### Expected Results

**After Optimization:**
- JPG files: 27.54MB → ~11MB (60% savings)
- WebP files: 18.85MB → ~9MB (50% savings)
- **Total**: 46.39MB → ~20MB (57% savings)

**Performance Impact:**
- Page load time: ~30-40% faster
- Bandwidth usage: 57% reduction
- Core Web Vitals: Improved (LCP, CLS)
- SEO: Positive ranking boost

### Monitoring

After optimization, check results in:
1. **Google Search Console** → Speed → Core Web Vitals
2. **Google PageSpeed Insights** → Opportunities → Properly sized images
3. **Lighthouse** (DevTools) → Performance → Unused CSS/JS

### Files to Optimize

See complete list at the end of this file.

---

## Complete List of Flagged Images (81 total)

### Hero/Feature Images (Large)
- maiori-hero.webp (271K) / maiori-hero.jpg (243K)
- grotta-smeraldo-hero.webp → Missing, create WebP version
- limoncello-mercato-hero.webp (132K) / limoncello-mercato-hero.jpg (177K)
- ravello-hero.webp (101K) / ravello-hero.jpg (103K)
- amalfi-hero.webp (132K) / amalfi-hero.jpg (132K)
- minori-hero.webp (394K) / minori-hero.jpg (329K)
- positano-hero.webp (190K) / positano-hero.jpg (182K)
- costiera-hero.webp (291K) / costiera-hero.jpg (252K)
- vietri-hero.webp (301K) / vietri-hero.jpg (772K)
- hero-hp.webp (437K) / hero-hp.jpg (840K)
- sorrento-hero.webp (236K) / sorrento-hero.jpg (206K)
- capri-hero.webp (158K) / capri-hero.jpg (148K)

### Activity/Experience Images
- regina-giovanna-sorrento.jpg (242K)
- quando-visitare-hero.jpg (506K)
- limoncello-femminiello.jpg (636K)
- fiordo-furore-hero.webp (464K) / fiordo-furore-hero.jpg (717K)
- cooking-class-pasta.webp (197K) / cooking-class-pasta.jpg (518K)
- vino-costa-amalfi-hero.webp (425K) / vini-costa-amalfi-hero.jpg (801K)
- spiagge-selvagge.webp (490K) / spiagge-selvagge.jpg (916K)
- spiagge-bambini.webp (439K) / spiagge-bambini.jpg (1.9M) ⚠️ LARGEST
- tramonto-costiera.webp (119K) / tramonto-costiera.jpg (1.1M)
- marina-piccola-capri.webp (158K) / marina-piccola-capri.jpg (173K)
- ieranto-hero.webp (298K) / ieranto-hero.jpg (260K)
- marina-del-cantone.webp (631K) / marina-del-cantone.jpg (1.1M)
- cala-mitigliano.webp (158K) / cala-mitigliano.jpg (173K)
- valle-ferriere-hero.webp (156K) / valle-ferriere-hero.jpg (139K)
- atrani-hero.webp (333K) / atrani-hero.jpg (310K)

### Events/Places
- busSITA (traghetti-hero.webp 311K) / traghetti-hero.jpg (816K)
- parcheggi-hero.webp (368K) / parcheggi-hero.jpg (595K)
- tour-barca-hero.webp (227K) / tour-barca-hero.jpg (598K)
- come-arrivare-hero.webp (288K) / come-arrivare-hero.jpg (280K)
- cook-class-hero.webp (80K) / cooking-class-hero.jpg (124K)
- matrimoni-chiostro-hero.webp (380K) / matrimoni-chiostro-hero.jpg (806K)
- trekking-hero.webp (479K) / trekking-hero.jpg (889K)
- stellati-hero.webp (88K) / stellati-hero.jpg (129K)
- delizia-limone-hero.webp (81K) / delizia-limone-hero.jpg (129K)
- alici-cetara-hero.webp (367K) / alici-cetara-hero.jpg (536K)
- mozzarella-provolone-hero.webp (52K) / mozzarella-provolone-hero.jpg (235K)
- mozzarella-cagliata.webp (138K) / mozzarella-cagliata.jpg (385K)

### Island/Beach Images
- faraglioni-capri.webp (370K) / faraglioni-capri.jpg (1.2M)
- spiaggia-grande-positano.webp (190K) / spiaggia-grande-positano.jpg (212K)
- praia-hero.webp (544K) / praia-hero.jpg (459K)
- santa-croce-amalfi.webp (132K) / santa-croce-amalfi.jpg (157K)
- spiaggia-maronti-ischia.webp (248K) / spiaggia-maronti-ischia.jpg (240K)
- ischia-hero.webp (248K) / ischia-hero.jpg (204K)
- procida-hero.webp (195K) / procida-hero.jpg (188K)
- cala-pozzo-vecchio-procida.webp (195K) / cala-pozzo-vecchio-procida.jpg (219K)
- isole-hero.webp (333K) / isole-hero.jpg (669K)
- massa-lubrense-hero.webp (161K) / massa-lubrense-hero.jpg (508K)
- praiano-hero.webp (243K) / praiano-hero.jpg (226K)
- bus-sita-hero.webp (448K) / bus-sita-hero.jpg (817K)
- vico-equense-hero.webp (616K) / vico-equense-hero.jpg (967K)

### Hub/Guide Pages
- spiagge-hero.webp (631K) / spiagge-hero.jpg (490K)
- esperienze-hero.webp (408K) / esperienze-hero.jpg (377K)
- itinerari-hero.webp (395K) / itinerari-hero.jpg (378K)
- blog-hub-hero.webp (330K) / blog-hub-hero.jpg (286K)
- quando-visitare-hero.webp (513K) / quando-visitare-hero.jpg (506K)

### Travel Guide Pages
- come-arrivare-hero.webp (288K) / come-arrivare-hero.jpg (280K)
- sorrento-vs-praiano-hero.jpg (2.2M) ⚠️ PRIORITY: Largest file!

## Next Steps

1. **Priority**: Compress the 5 largest JPG files first:
   - sorrento-vs-praiano-hero.jpg (2.2M)
   - spiagge-bambini.jpg (1.9M)
   - faraglioni-capri.jpg (1.2M)
   - tramonto-costiera.jpg (1.1M)
   - marina-del-cantone.jpg (1.1M)

2. **Then**: Batch optimize remaining JPG files using Squoosh

3. **Finally**: Verify optimization with Google PageSpeed and add Astro Image component to pages

---

**Expected completion**: ~2-3 hours for full optimization
**Expected results**: 45-55% total size reduction, 30-40% speed improvement
