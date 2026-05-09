#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../public/images');

/**
 * Format bytes to KB/MB
 */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

/**
 * Get file size
 */
function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

/**
 * Optimize a single JPG file and create WebP version
 */
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);

  if (!['.jpg', '.jpeg'].includes(ext)) {
    return null;
  }

  const originalSize = getFileSize(filePath);
  const baseName = path.basename(fileName, ext);

  try {
    // Optimize JPG with aggressive settings
    const jpgBuffer = await sharp(filePath)
      .rotate() // Auto-rotate based on EXIF
      .jpeg({ quality: 65, mozjpeg: true, progressive: true })
      .toBuffer();

    const jpgPath = filePath;
    fs.writeFileSync(jpgPath, jpgBuffer);
    const newJpgSize = jpgBuffer.length;

    // Create WebP version with quality settings optimized for web
    const webpPath = path.join(dirName, `${baseName}.webp`);
    const webpBuffer = await sharp(filePath)
      .rotate() // Auto-rotate based on EXIF
      .webp({ quality: 65 })
      .toBuffer();

    fs.writeFileSync(webpPath, webpBuffer);
    const webpSize = webpBuffer.length;

    return {
      file: fileName,
      originalSize,
      jpgSize: newJpgSize,
      webpSize,
      jpgSaved: originalSize - newJpgSize,
      webpPath: `${baseName}.webp`,
      webpSize: webpSize
    };
  } catch (error) {
    console.error(`  ⚠️  Error processing ${fileName}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  try {
    console.log('📸 Starting aggressive image optimization with Sharp...\n');

    // Get all JPG files
    const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg)$/i.test(f));

    if (files.length === 0) {
      console.log('⚠️  No JPG files found in', imagesDir);
      return;
    }

    // Calculate original total size
    let originalTotalSize = 0;
    let originalWebpSize = 0;
    files.forEach(file => {
      const filePath = path.join(imagesDir, file);
      originalTotalSize += getFileSize(filePath);
    });

    // Also count existing WebP
    fs.readdirSync(imagesDir).forEach(file => {
      if (file.endsWith('.webp')) {
        originalWebpSize += getFileSize(path.join(imagesDir, file));
      }
    });

    console.log(`📊 Original sizes:`);
    console.log(`   JPG files: ${formatSize(originalTotalSize)}`);
    console.log(`   WebP files: ${formatSize(originalWebpSize)}`);
    console.log(`   Total: ${formatSize(originalTotalSize + originalWebpSize)}\n`);

    console.log(`🔄 Processing ${files.length} JPG files...\n`);

    const results = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(imagesDir, file);

      process.stdout.write(`   [${i + 1}/${files.length}] ${file}...`);

      const result = await optimizeImage(filePath);
      if (result) {
        results.push(result);
        const jpgPercent = ((result.jpgSaved / result.originalSize) * 100).toFixed(1);
        const webpPercent = ((result.originalSize - result.webpSize) / result.originalSize) * 100;
        console.log(` ✅ (JPG: ${formatSize(result.jpgSaved)} saved, WebP: ${webpPercent.toFixed(1)}% of original)`);
      } else {
        console.log(` ⚠️  Skipped`);
      }
    }

    // Calculate new totals
    let newJpgTotalSize = 0;
    let newWebpTotalSize = 0;

    results.forEach(r => {
      newJpgTotalSize += r.jpgSize;
      newWebpTotalSize += r.webpSize;
    });

    // Add other WebP files (not created by us)
    fs.readdirSync(imagesDir).forEach(file => {
      if (file.endsWith('.webp')) {
        const baseName = path.basename(file, '.webp');
        if (!results.some(r => r.baseName === baseName)) {
          newWebpTotalSize += getFileSize(path.join(imagesDir, file));
        }
      }
    });

    const totalSaved = originalTotalSize - newJpgTotalSize;
    const totalPercent = ((totalSaved / originalTotalSize) * 100).toFixed(1);

    console.log(`\n📊 Optimized sizes:`);
    console.log(`   JPG files: ${formatSize(newJpgTotalSize)} (saved ${formatSize(totalSaved)})`);
    console.log(`   WebP files: ${formatSize(newWebpTotalSize)}`);
    console.log(`   Total: ${formatSize(newJpgTotalSize + newWebpTotalSize)}\n`);

    console.log(`✨ Total JPG savings: ${formatSize(totalSaved)} (${totalPercent}%)`);
    console.log(`🎉 Optimization complete! ${results.length} images processed.\n`);

    // Summary
    console.log('📈 Image optimization summary:');
    console.log(`   - Reduced JPG quality from 85-95% to 65% with mozjpeg`);
    console.log(`   - Created WebP versions at 65% quality (typically 60-70% smaller than JPG)`);
    console.log(`   - Total size reduction: ${formatSize(totalSaved)}`);

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

optimizeAllImages();
