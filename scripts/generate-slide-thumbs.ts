/**
 * Pre-build script: Generate thumbnail images from PDF slides.
 * Run with: npx tsx scripts/generate-slide-thumbs.ts
 */
import { pdf } from 'pdf-to-img';
import fs from 'node:fs';
import path from 'node:path';

const SLIDES_DIR = path.join(process.cwd(), 'public', 'presentations', 'slides');
const THUMBS_DIR = path.join(process.cwd(), 'public', 'presentations', 'thumbs');

async function main() {
  // Create thumbs directory
  if (!fs.existsSync(THUMBS_DIR)) {
    fs.mkdirSync(THUMBS_DIR, { recursive: true });
  }

  const pdfs = fs.readdirSync(SLIDES_DIR).filter(f => f.endsWith('.pdf'));
  console.log(`Found ${pdfs.length} PDF slide files`);

  for (const pdfFile of pdfs) {
    const baseName = pdfFile.replace('.pdf', '');
    const thumbPath = path.join(THUMBS_DIR, `${baseName}.png`);

    // Skip if thumbnail already exists
    if (fs.existsSync(thumbPath)) {
      console.log(`  Skip (exists): ${baseName}`);
      continue;
    }

    console.log(`  Generating: ${baseName}`);
    try {
      const doc = await pdf(path.join(SLIDES_DIR, pdfFile), { scale: 1.5 });
      // Get just the first page
      for await (const page of doc) {
        fs.writeFileSync(thumbPath, page);
        break; // Only first page
      }
    } catch (err) {
      console.error(`  Error processing ${pdfFile}:`, err);
    }
  }

  console.log('Done generating thumbnails');
}

main();
