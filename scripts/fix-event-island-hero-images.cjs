#!/usr/bin/env node
/* eslint-disable */
/**
 * Fix the "all images look the same" bug on the 15 event/islands pages.
 *
 * Two patches:
 *   1. LocalitySlider items: each of Procida / Ischia / Capri / Anacapri was
 *      pointing at capri-hero.jpg. Map each name to its own *-hero.jpg.
 *   2. Related Events <img>: each card linked to a sibling event/hub but
 *      reused capri-hero.jpg. Resolve the heroImage of the linked page and
 *      reuse it on the card.
 *
 * Bonus: anacapri-settembre-borgo/index.astro itself had
 *   heroImage="/images/capri-hero.jpg" — switch to anacapri-hero.jpg so the
 *   card image is coherent with the destination page.
 *
 * Run with: node scripts/fix-event-island-hero-images.cjs [--dry]
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DRY = process.argv.includes('--dry');

// 1. Switch the anacapri-settembre-borgo heroImage to anacapri-hero.jpg
const anacapriPages = glob.sync('src/pages/*/{events/islands,eventi/isole,veranstaltungen/inseln,evenements/iles,eventos/islas}/anacapri-settembre-borgo/index.astro');

const ISLAND_HERO_BY_NAME = {
  Procida:  '/images/procida-hero.jpg',
  Ischia:   '/images/ischia-hero.jpg',
  Capri:    '/images/capri-hero.jpg',
  Anacapri: '/images/anacapri-hero.jpg',
};

// 2. All event island pages get LocalitySlider + Related Events fixed
const islandEventPages = glob.sync('src/pages/*/{events/islands,eventi/isole,veranstaltungen/inseln,evenements/iles,eventos/islas}/*/index.astro');

function patchLocalitySlider(src) {
  const re = /(\{\s*name:\s*"(\w+)",\s*href:\s*'[^']+',\s*image:\s*')\/images\/capri-hero\.jpg('[^}]*\})/g;
  let count = 0;
  const next = src.replace(re, (m, before, name, after) => {
    const hero = ISLAND_HERO_BY_NAME[name];
    if (!hero) return m;
    if (hero === '/images/capri-hero.jpg') return m;
    count++;
    return `${before}${hero}${after}`;
  });
  return { src: next, count };
}

function readHeroImage(file) {
  try {
    const src = fs.readFileSync(file, 'utf8');
    const m = src.match(/heroImage=["']([^"']+)["']/);
    return m ? m[1] : null;
  } catch { return null; }
}

function patchRelatedEvents(src, fileDir) {
  // <a href="..."> ... <img src="..." ...>
  const re = /<a href="([^"]+)"[^>]*>\s*<img\s+src="([^"]+)"/g;
  let count = 0;
  const next = src.replace(re, (m, href, currentImg) => {
    if (currentImg !== '/images/capri-hero.jpg') return m;
    if (!href.startsWith('/')) return m;
    const targetFile = path.join('src/pages', href, 'index.astro').replace(/\\/g, '/');
    const heroImage = readHeroImage(targetFile);
    if (!heroImage) return m;
    if (heroImage === '/images/capri-hero.jpg') return m;
    count++;
    return m.replace(currentImg, heroImage);
  });
  return { src: next, count };
}

let totalChanges = 0;
const summary = [];

// Step 1: fix anacapri-settembre-borgo hero (so Step 2 below picks up the right hero)
for (const f of anacapriPages) {
  const src = fs.readFileSync(f, 'utf8');
  if (!/heroImage="\/images\/capri-hero\.jpg"/.test(src)) continue;
  const next = src.replace('heroImage="/images/capri-hero.jpg"', 'heroImage="/images/anacapri-hero.jpg"');
  if (!DRY) fs.writeFileSync(f, next);
  totalChanges++;
  summary.push(`heroImage updated: ${f}`);
}

// Step 2: patch each event islands page
for (const f of islandEventPages) {
  const original = fs.readFileSync(f, 'utf8');
  let src = original;
  const a = patchLocalitySlider(src); src = a.src;
  const b = patchRelatedEvents(src, path.dirname(f)); src = b.src;
  const changes = a.count + b.count;
  if (changes === 0) continue;
  if (!DRY) fs.writeFileSync(f, src);
  totalChanges += changes;
  summary.push(`${f}: slider=${a.count}, related=${b.count}`);
}

console.log(`\nEvent island hero fix ${DRY ? '(DRY RUN)' : ''}`);
console.log(`  total changes: ${totalChanges}`);
summary.forEach(s => console.log('  ' + s));
