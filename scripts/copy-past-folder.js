/**
 * Script to copy the past folder to the dist directory
 * and fix the paths in the past/index.html file
 */
import fs from 'fs';
import path from 'path';

// Create dist/past directory if it doesn't exist
if (!fs.existsSync(path.resolve('dist/past'))) {
  fs.mkdirSync(path.resolve('dist/past'), { recursive: true });
  console.log('Created dist/past directory');
}

// Copy and fix past/index.html to dist/past/index.html
try {
  const sourceFile = path.resolve('past/index.html');
  const destFile = path.resolve('dist/past/index.html');
  const footerFile = path.resolve('includes/footer.html');
  
  if (fs.existsSync(sourceFile)) {
    // Read the source file and footer
    let content = fs.readFileSync(sourceFile, 'utf8');
    const footer = fs.existsSync(footerFile) ? fs.readFileSync(footerFile, 'utf8') : '';
    
    // Get the latest CSS and JS file names from dist
    const distFiles = fs.readdirSync(path.resolve('dist/assets/css'));
    const cssFile = distFiles.find(file => file.startsWith('main-') && file.endsWith('.css'));
    
    const jsFiles = fs.readdirSync(path.resolve('dist/assets/js'));
    const mainJsFile = jsFiles.find(file => file.startsWith('main-') && file.endsWith('.js'));
    const vendorJsFile = jsFiles.find(file => file.startsWith('vendor-') && file.endsWith('.js'));
    
    // Fix the paths
    content = content.replace('href="/style.scss"', `href="/assets/css/${cssFile}"`);
    
    // Update script references
    content = content.replace('<script type="module" src="/main.js"></script>', 
      `<script type="module" crossorigin src="/assets/js/${vendorJsFile}"></script>\n` +
      `  <script type="module" crossorigin src="/assets/js/${mainJsFile}"></script>\n` +
      `  <link rel="stylesheet" crossorigin href="/assets/css/${cssFile}">`);
    
    // Add footer before closing body tag
    content = content.replace('</body>', `${footer}\n</body>`);
    
    // Minify HTML
    content = minifyHtml(content);
    
    // Write the fixed content to the destination file
    fs.writeFileSync(destFile, content);
    console.log('Successfully copied and fixed past/index.html to dist/past/index.html');
  } else {
    console.error('Source file past/index.html does not exist');
  }
} catch (error) {
  console.error('Error copying past/index.html:', error);
}

/**
 * Simple HTML minification function
 * @param {string} html - HTML content to minify
 * @returns {string} - Minified HTML
 */
function minifyHtml(html) {
  return html
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Remove leading and trailing whitespace
    .replace(/^\s+|\s+$/g, '')
    // Remove unnecessary whitespace in attributes
    .replace(/\s{2,}/g, ' ')
    // Remove type="text/css" and type="text/javascript" as they're defaults
    .replace(/\stype="text\/css"/g, '')
    .replace(/\stype="text\/javascript"/g, '');
}
