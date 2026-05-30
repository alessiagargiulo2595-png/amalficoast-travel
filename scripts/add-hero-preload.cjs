const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'pages');

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, out);
    else if (f.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const heroImgRe = /<img[^>]*src="(\/images\/[^"]+)"[^>]*(?:loading="eager"|fetchpriority="high")[^>]*>/;
const heroImgReAlt = /<img[^>]*(?:loading="eager"|fetchpriority="high")[^>]*src="(\/images\/[^"]+)"[^>]*>/;
const baseLayoutOpen = /<BaseLayout\b/;
const hasHeroImageProp = /heroImage\s*=/;

let updated = 0;
let skippedNoHero = 0;
let skippedAlready = 0;
let skippedDynamic = 0;

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  if (!baseLayoutOpen.test(src)) continue;
  if (hasHeroImageProp.test(src)) { skippedAlready++; continue; }

  const m = src.match(heroImgRe) || src.match(heroImgReAlt);
  if (!m) { skippedNoHero++; continue; }
  const heroPath = m[1];

  // Find <BaseLayout ... > opening — match until the closing > of the tag
  const open = src.indexOf('<BaseLayout');
  if (open === -1) continue;
  // Find end of opening tag
  let i = open;
  let depth = 0;
  let inAttrValue = false;
  let quoteChar = '';
  let endIdx = -1;
  while (i < src.length) {
    const c = src[i];
    if (inAttrValue) {
      if (c === quoteChar) inAttrValue = false;
      else if (c === '{') depth++;
      else if (c === '}') depth--;
    } else {
      if (c === '"' || c === "'") { inAttrValue = true; quoteChar = c; }
      else if (c === '{') depth++;
      else if (c === '}') depth--;
      else if (c === '>' && depth === 0) { endIdx = i; break; }
    }
    i++;
  }
  if (endIdx === -1) { skippedDynamic++; continue; }

  // Insert before the closing >: detect if multi-line (find last newline before >)
  const before = src.slice(open, endIdx);
  const lines = before.split('\n');
  const lastLine = lines[lines.length - 1];
  // Indentation: match prefix whitespace on a typical prop line
  const propLineMatch = before.match(/\n(\s+)\w+=/);
  const indent = propLineMatch ? propLineMatch[1] : '  ';

  const insertion = `\n${indent}heroImage="${heroPath}"`;
  // Insert insertion just before endIdx but ensure not on the same line as >
  // Replace the closing `>` (or `>\n`) appropriately
  // Simply insert before endIdx
  const newSrc = src.slice(0, endIdx) + insertion + '\n' + (lastLine.match(/^\s*$/) ? '' : '') + src.slice(endIdx);
  fs.writeFileSync(file, newSrc, 'utf8');
  updated++;
}

console.log(`Updated: ${updated}`);
console.log(`Skipped (already has heroImage): ${skippedAlready}`);
console.log(`Skipped (no hero img found): ${skippedNoHero}`);
console.log(`Skipped (couldn't parse BaseLayout tag): ${skippedDynamic}`);
