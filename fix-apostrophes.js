const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.astro')) {
      callback(filePath);
    }
  });
}

let count = 0;
walkDir('src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/\'/g, "'");
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    count++;
  }
});

console.log(`Fixed ${count} files`);
