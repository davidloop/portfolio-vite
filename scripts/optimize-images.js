/**
 * Image Optimization Script
 * 
 * This script optimizes images in the public/images directory and outputs them to the same location.
 * It can be run manually or as part of the build process.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import * as glob from 'glob';
import * as chalk from 'chalk';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images'),
  quality: {
    jpeg: 80,
    jpg: 80,
    png: 80,
    webp: 75,
    avif: 65
  },
  createWebp: true,
  createAvif: true,
  skipExisting: true,
  resize: false,
  maxWidth: 1920,
  maxHeight: 1080
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`, { nodir: true });

// Stats
let stats = {
  total: imageFiles.length,
  processed: 0,
  skipped: 0,
  webpCreated: 0,
  avifCreated: 0,
  errors: 0
};

// Process each image
async function processImages() {
  console.log(chalk.default.blue(`\n🖼️  Processing ${stats.total} images...\n`));
  
  for (const file of imageFiles) {
    const relativePath = path.relative(config.inputDir, file);
    const outputPath = path.join(config.outputDir, relativePath);
    const outputDir = path.dirname(outputPath);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    try {
      // Skip if output file exists and skipExisting is true
      if (config.skipExisting && fs.existsSync(outputPath)) {
        console.log(chalk.default.yellow(`⏭️  Skipping existing file: ${relativePath}`));
        stats.skipped++;
        continue;
      }
      
      // Process image with sharp
      let image = sharp(file);
      
      // Get image metadata
      const metadata = await image.metadata();
      
      // Resize if needed
      if (config.resize && (metadata.width > config.maxWidth || metadata.height > config.maxHeight)) {
        image = image.resize({
          width: Math.min(metadata.width, config.maxWidth),
          height: Math.min(metadata.height, config.maxHeight),
          fit: 'inside',
          withoutEnlargement: true
        });
      }
      
      // Optimize based on image type
      if (ext === '.jpg' || ext === '.jpeg') {
        await image
          .jpeg({ quality: config.quality.jpeg, mozjpeg: true })
          .toFile(outputPath);
      } else if (ext === '.png') {
        await image
          .png({ quality: config.quality.png, compressionLevel: 9, palette: true })
          .toFile(outputPath);
      } else if (ext === '.gif') {
        // Just copy GIFs as sharp doesn't handle them well
        fs.copyFileSync(file, outputPath);
      }
      
      // Create WebP version if enabled
      if (config.createWebp && ext !== '.gif') {
        const webpPath = path.join(outputDir, `${baseName}.webp`);
        await image
          .webp({ quality: config.quality.webp })
          .toFile(webpPath);
        stats.webpCreated++;
      }
      
      // Create AVIF version if enabled
      if (config.createAvif && ext !== '.gif') {
        const avifPath = path.join(outputDir, `${baseName}.avif`);
        await image
          .avif({ quality: config.quality.avif })
          .toFile(avifPath);
        stats.avifCreated++;
      }
      
      stats.processed++;
      console.log(chalk.default.green(`✅ Processed: ${relativePath}`));
    } catch (error) {
      stats.errors++;
      console.error(chalk.default.red(`❌ Error processing ${relativePath}: ${error.message}`));
    }
  }
  
  // Print summary
  console.log(chalk.default.blue('\n📊 Summary:'));
  console.log(chalk.default.white(`Total images: ${stats.total}`));
  console.log(chalk.default.green(`Processed: ${stats.processed}`));
  console.log(chalk.default.yellow(`Skipped: ${stats.skipped}`));
  console.log(chalk.default.cyan(`WebP created: ${stats.webpCreated}`));
  console.log(chalk.default.magenta(`AVIF created: ${stats.avifCreated}`));
  console.log(chalk.default.red(`Errors: ${stats.errors}`));
  console.log(chalk.default.blue('\n✨ Image optimization complete!\n'));
}

// Run the process
processImages().catch(error => {
  console.error(chalk.default.red(`\n❌ Fatal error: ${error.message}\n`));
  process.exit(1);
});
