import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

  console.log(`🖼️  Trovati ${files.length} file JPG in ${imagesDir}`);
  console.log('📦 Inizio conversione a WebP + ridimensionamento...\n');

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.jpg', '.webp'));

    // Skip se il WebP esiste già
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`⏭️  ${file} → ${file.replace('.jpg', '.webp')} (già esiste)`);
      continue;
    }

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginal += originalStats.size;

      await sharp(inputPath)
        .resize(1920, 1920, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      totalWebp += webpStats.size;

      const reduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
      const originalMB = (originalStats.size / 1024 / 1024).toFixed(2);
      const webpMB = (webpStats.size / 1024 / 1024).toFixed(2);

      console.log(`✅ ${file}`);
      console.log(`   ${originalMB}MB → ${webpMB}MB (-${reduction}%)\n`);
    } catch (error) {
      console.error(`❌ Errore con ${file}:`, error.message);
    }
  }

  console.log('\n📊 Riassunto:');
  console.log(`Originale: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`WebP:      ${(totalWebp / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Riduzione: ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
}

optimizeImages().catch(console.error);
