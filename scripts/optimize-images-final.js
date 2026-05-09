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
    // Read the original image and re-encode with lower quality
    // This removes any arithmetic coding from the original
    const jpgBuffer = await sharp(filePath)
      .rotate() // Auto-rotate based on EXIF
      .jpeg({ quality: 60, progressive: true }) // No arithmetic coding
      .toBuffer();

    fs.writeFileSync(filePath, jpgBuffer);
    const newJpgSize = jpgBuffer.length;

    // Create WebP version
    const webpPath = path.join(dirName, `${baseName}.webp`);
    const webpBuffer = await sharp(filePath)
      .webp({ quality: 60 })
      .toBuffer();

    fs.writeFileSync(webpPath, webpBuffer);
    const webpSize = webpBuffer.length;

    return {
      file: fileName,
      originalSize,
      jpgSize: newJpgSize,
      webpSize,
      jpgSaved: originalSize - newJpgSize,
      webpPath: `${baseName}.webp`
    };
  } catch (error) {
    console.error(`  ⚠️  Error processing ${fileName}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  try {
    console.log('📸 Starting image optimization with Sharp...\n');

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

    console.log(`📊 Current image library sizes:`);
    console.log(`   JPG files (${files.length}): ${formatSize(originalTotalSize)}`);
    console.log(`   WebP files: ${formatSize(originalWebpSize)}`);
    console.log(`   Total: ${formatSize(originalTotalSize + originalWebpSize)}\n`);

    console.log(`🔄 Processing ${files.length} JPG files...\n`);

    const results = [];
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(imagesDir, file);

      process.stdout.write(`   [${i + 1}/${files.length}] ${file}`);

      const result = await optimizeImage(filePath);
      if (result) {
        results.push(result);
        successCount++;
        const jpgPercent = ((result.jpgSaved / result.originalSize) * 100).toFixed(1);
        const webpPercent = ((result.originalSize - result.webpSize) / result.originalSize) * 100;
        console.log(`  ✅ JPG: -${jpgPercent}% | WebP: -${webpPercent.toFixed(1)}%`);
      } else {
        console.log(` ⚠️  Failed`);
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
        if (!results.some(r => r.webpPath === `${baseName}.webp`)) {
          newWebpTotalSize += getFileSize(path.join(imagesDir, file));
        }
      }
    });

    const totalSaved = originalTotalSize - newJpgTotalSize;
    const totalPercent = ((totalSaved / originalTotalSize) * 100).toFixed(1);

    console.log(`\n📊 Optimized image library sizes:`);
    console.log(`   JPG files: ${formatSize(newJpgTotalSize)} (saved ${formatSize(totalSaved)})`);
    console.log(`   WebP files: ${formatSize(newWebpTotalSize)}`);
    console.log(`   Total: ${formatSize(newJpgTotalSize + newWebpTotalSize)}\n`);

    console.log(`✨ Results:`);
    console.log(`   - Processed: ${successCount}/${files.length} images`);
    console.log(`   - JPG compression: ${totalPercent}% reduction (${formatSize(totalSaved)})`);
    console.log(`   - WebP versions created for all JPG files`);
    console.log(`   - Quality: 60% (good balance of quality/size)\n`);

    console.log('🎉 Image optimization complete!');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

optimizeAllImages();
