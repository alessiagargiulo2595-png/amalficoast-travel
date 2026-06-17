#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const conversions = require('./blog-image-conversions.json');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', '.astro'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(astro|ts|tsx|js|jsx|json|md|html|css)$/i.test(e.name)) out.push(full);
  }
  return out;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const ROOT = path.join(__dirname, '..');
const files = walk(path.join(ROOT, 'src'));
console.log('Scanning', files.length, 'source files');

let totalChanges = 0;
const fileChanges = {};
for (const f of files) {
  let txt = fs.readFileSync(f, 'utf8');
  let changed = false;
  let perFile = 0;
  for (const c of conversions) {
    const re = new RegExp(escapeRe(c.from), 'g');
    const matches = (txt.match(re) || []).length;
    if (matches > 0) {
      txt = txt.replace(re, c.to);
      changed = true;
      perFile += matches;
    }
  }
  if (changed) {
    fs.writeFileSync(f, txt);
    fileChanges[path.relative(ROOT, f)] = perFile;
    totalChanges += perFile;
  }
}

console.log('Total replacements:', totalChanges);
console.log('Files updated:', Object.keys(fileChanges).length);
for (const [k, v] of Object.entries(fileChanges)) console.log('  ', String(v).padStart(3), k);
