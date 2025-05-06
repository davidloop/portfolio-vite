/**
 * Copy Images Script
 * 
 * This script copies images from the public directory to the new organized directory structure
 * in public/images based on the mapping in update-image-paths.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project name mapping (original prefix to folder name)
const projectMapping = {
  'abswavesight': 'abswavesight',
  'kbr': 'kbr',
  'cpchem': 'cpchem',
  'loomis': 'loomis',
  'rlh': 'rlh',
  'apf': 'apf',
  'adc2015': 'adc2015',
  'mbci': 'mbci',
  'metaldepots': 'metaldepots',
  'tmo': 'tmobile',
  'xbox': 'microsoft',
  'mem': 'memorialhermannhospital',
  'val': 'valerus',
  'alertlogic': 'alert',
  'hpecosystem': 'hptouchsmartcommunity',
  'tattu': 'tattu',
  'dog': 'dog',
  'jiffy': 'jiffy',
  'joes': 'joes',
  'mah': 'mahindra',
  'scion': 'scion',
  'art': 'misterart',
  'driskill': 'driskill',
  'print': 'print',
  'cpo': 'noaa',
  'climate': 'noaa'
};

// Special case for loader gif
const loaderGif = '89.gif';
const newLoaderGif = 'images/common/loader.gif';

// Special case for icons
const iconMapping = {
  'icon-angle-up.svg': 'images/icons/icon-angle-up.svg',
  'linkedin.svg': 'images/icons/linkedin.svg'
};

// Base directories
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy a file
function copyFile(source, destination) {
  ensureDirectoryExists(path.dirname(destination));
  fs.copyFileSync(source, destination);
  console.log(`Copied: ${path.relative(publicDir, source)} -> ${path.relative(publicDir, destination)}`);
}

// Copy special files
function copySpecialFiles() {
  // Copy loader gif
  const loaderSource = path.join(publicDir, loaderGif);
  const loaderDest = path.join(publicDir, newLoaderGif);
  
  if (fs.existsSync(loaderSource)) {
    copyFile(loaderSource, loaderDest);
  } else {
    console.warn(`Warning: Loader gif not found at ${loaderSource}`);
  }
  
  // Copy icons
  for (const [oldName, newPath] of Object.entries(iconMapping)) {
    const iconSource = path.join(publicDir, oldName);
    const iconDest = path.join(publicDir, newPath);
    
    if (fs.existsSync(iconSource)) {
      copyFile(iconSource, iconDest);
    } else {
      console.warn(`Warning: Icon not found at ${iconSource}`);
    }
  }
}

// Copy project images
function copyProjectImages() {
  for (const [prefix, folder] of Object.entries(projectMapping)) {
    const projectDir = path.join(imagesDir, 'projects', folder);
    ensureDirectoryExists(projectDir);
    
    // Find all files with this prefix
    const files = fs.readdirSync(publicDir);
    const projectFiles = files.filter(file => file.startsWith(`${prefix}-`) && 
      (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif')));
    
    // Copy each file
    for (const file of projectFiles) {
      const source = path.join(publicDir, file);
      const dest = path.join(projectDir, file);
      copyFile(source, dest);
    }
  }
}

// Main function
function main() {
  console.log('Starting image copy process...');
  
  // Ensure base directories exist
  ensureDirectoryExists(imagesDir);
  ensureDirectoryExists(path.join(imagesDir, 'projects'));
  ensureDirectoryExists(path.join(imagesDir, 'common'));
  ensureDirectoryExists(path.join(imagesDir, 'icons'));
  
  // Copy files
  copySpecialFiles();
  copyProjectImages();
  
  console.log('Image copy process complete!');
}

// Run the script
main();
