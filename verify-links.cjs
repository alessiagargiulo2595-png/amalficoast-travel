const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const distDir = './dist';

function getPagePaths() {
  const pages = new Set();

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file === 'index.html') {
        const urlPath = fullPath.replace(distDir, '').replace(/index\.html$/, '').replace(/\/g, '/');
        pages.add(urlPath);
      }
    });
  }

  walkDir(distDir);
  return pages;
}

function checkLinks() {
  const pages = getPagePaths();
  let totalLinks = 0;
  let brokenCount = 0;
  const broken = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file === 'index.html') {
        const html = fs.readFileSync(fullPath, 'utf8');
        const $ = cheerio.load(html);
        const pagePath = fullPath.replace(distDir, '').replace(/index\.html$/, '').replace(/\/g, '/');

        $('a[href]').each((i, el) => {
          let href = $(el).attr('href');
          if (!href) return;

          // Skip external links, anchors, and special URLs
          if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return;
          }

          totalLinks++;

          // Normalize href
          let normalizedHref = href;
          if (href.startsWith('/')) {
            normalizedHref = href;
          } else {
            normalizedHref = path.join(pagePath, href).replace(/\/g, '/');
          }

          // Remove query params and anchors for checking
          const cleanHref = normalizedHref.split('?')[0].split('#')[0];

          // Check if page exists
          let exists = false;
          if (pages.has(cleanHref) || pages.has(cleanHref + '/')) {
            exists = true;
          }

          if (!exists && !cleanHref.includes('.')) {
            brokenCount++;
            broken.push(`${pagePath.substring(1)} → ${href}`);
          }
        });
      }
    });
  }

  walkDir(distDir);
  
  if (brokenCount > 0) {
    console.log('Broken links found:\n');
    broken.forEach(link => console.log(`❌ ${link}`));
  }
  
  console.log(`\n✅ Total links checked: ${totalLinks}`);
  console.log(`❌ Broken links: ${brokenCount}`);
}

checkLinks();
