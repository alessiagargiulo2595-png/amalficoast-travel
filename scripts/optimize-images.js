#!/usr/bin/env node
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';

const imagesDir = 'public/images';

/**
 * Get total file size of all files in a directory
 */
function getTotalSize(dir, extensions) {
  let total = 0;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
      const stats = fs.statSync(filePath);
      total += stats.size;
    }
  });
  return total;
}

/**
 * Format bytes to KB/MB
 */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

async function optimizeImages() {
  try {
    console.log('📸 Starting image optimization...\n');

    // Get original sizes
    const originalJpgSize = getTotalSize(imagesDir, ['.jpg', '.jpeg']);
    const originalPngSize = getTotalSize(imagesDir, ['.png']);
    const originalWebpSize = getTotalSize(imagesDir, ['.webp']);
    const originalTotalSize = originalJpgSize + originalPngSize + originalWebpSize;

    console.log(`📊 Current image sizes:`);
    console.log(`   JPG: ${formatSize(originalJpgSize)}`);
    console.log(`   PNG: ${formatSize(originalPngSize)}`);
    console.log(`   WebP: ${formatSize(originalWebpSize)}`);
    console.log(`   Total: ${formatSize(originalTotalSize)}\n`);

    // Optimize JPG files
    console.log('⚙️  Compressing JPG files...');
    try {
      await imagemin([`${imagesDir}/*.jpg`, `${imagesDir}/*.jpeg`], {
        destination: imagesDir,
        plugins: [
          imageminMozjpeg({
            quality: 75,
            progressive: true,
            arithmetic: true
          })
        ]
      });
      console.log('✅ JPG compression complete\n');
    } catch (err) {
      console.log('⚠️  No JPG files to compress\n');
    }

    // Optimize PNG files
    console.log('⚙️  Processing PNG files...');
    try {
      await imagemin([`${imagesDir}/*.png`], {
        destination: imagesDir,
        plugins: [
          imageminWebp({
            quality: 75,
            alphaQuality: 100,
            method: 6
          })
        ]
      });
      console.log('✅ PNG processing complete\n');
    } catch (err) {
      console.log('⚠️  No PNG files to process\n');
    }

    // Create WebP versions for JPG files
    console.log('⚙️  Creating WebP versions of JPG files...');
    const jpgFiles = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg)$/i.test(f));
    if (jpgFiles.length > 0) {
      const jpgGlobs = jpgFiles.map(f => path.join(imagesDir, f));
      try {
        await imagemin(jpgGlobs, {
          destination: imagesDir,
          plugins: [
            imageminWebp({
              quality: 75,
              alphaQuality: 100,
              method: 6
            })
          ]
        });
        console.log('✅ WebP conversion complete\n');
      } catch (err) {
        console.error('⚠️  WebP conversion encountered issues:', err.message, '\n');
      }
    } else {
      console.log('⚠️  No JPG files found for WebP conversion\n');
    }

    // Get new sizes
    const newJpgSize = getTotalSize(imagesDir, ['.jpg', '.jpeg']);
    const newPngSize = getTotalSize(imagesDir, ['.png']);
    const newWebpSize = getTotalSize(imagesDir, ['.webp']);
    const newTotalSize = newJpgSize + newPngSize + newWebpSize;

    // Calculate savings
    const jpgSavings = originalJpgSize - newJpgSize;
    const pngSavings = originalPngSize - newPngSize;
    const totalSavings = originalTotalSize - newTotalSize;
    const savingsPercent = originalTotalSize > 0 ? ((totalSavings / originalTotalSize) * 100).toFixed(1) : 0;

    console.log('📊 Optimized image sizes:');
    console.log(`   JPG: ${formatSize(newJpgSize)} (saved ${formatSize(jpgSavings)})`);
    console.log(`   PNG: ${formatSize(newPngSize)} (saved ${formatSize(pngSavings)})`);
    console.log(`   WebP: ${formatSize(newWebpSize)}`);
    console.log(`   Total: ${formatSize(newTotalSize)}\n`);

    console.log(`✨ Total savings: ${formatSize(totalSavings)} (${savingsPercent}%)\n`);
    console.log('🎉 Image optimization complete!');

  } catch (error) {
    console.error('❌ Error during image optimization:', error);
    process.exit(1);
  }
}

optimizeImages();
