# Portfolio-Vite Optimization Plan

This document outlines a comprehensive plan to optimize the directory structure and performance of the portfolio-vite project.

## Current Structure Analysis

The current project structure has several areas that could be improved:

- **Asset Organization**: All images are stored directly in the public directory without categorization
- **JavaScript Organization**: JS files are in a flat structure in the js directory
- **SCSS Organization**: SCSS files are well-organized but could be improved
- **Build Configuration**: Basic Vite configuration without optimization plugins
- **Code Organization**: Limited code splitting and modularization

## Optimization Plan

### 1. Asset Organization

Reorganize the public directory to improve asset management:

```
public/
├── images/
│   ├── projects/
│   │   ├── noaa/
│   │   ├── abswavesight/
│   │   ├── kbr/
│   │   └── ...
│   ├── icons/
│   │   ├── icon-angle-up.svg
│   │   └── ...
│   └── common/
│       ├── loader.gif
│       └── ...
└── favicon.ico
```

Benefits:
- Easier asset management and discovery
- Improved caching strategies
- Better organization for future additions

### 2. JavaScript Module Organization

Restructure the JavaScript files for better maintainability:

```
js/
├── components/
│   ├── header.js
│   ├── navigation.js
│   └── backToTop.js
├── features/
│   ├── projects/
│   │   ├── projectsDisplay.js
│   │   └── projectsNav.js
│   └── contact/
│       └── contact.js
├── utils/
│   └── animations.js
└── main.js
```

Benefits:
- Clearer separation of concerns
- Easier to locate and maintain specific functionality
- Better scalability for future features

### 3. Build Optimization

Enhance the Vite configuration for better performance:

1. Add image optimization plugin:
   ```javascript
   // vite.config.js
   import { defineConfig } from 'vite';
   import inject from "@rollup/plugin-inject";
   import { htmlInjectionPlugin } from "vite-plugin-html-injection";
   import { imagetools } from 'vite-imagetools';

   export default defineConfig({
       build: {
           rollupOptions: {
               input: {
                   main: 'index.html',
                   past: '/past/index.html',
               },
               output: {
                   manualChunks: {
                       vendor: ['jquery', 'aos'],
                       projects: ['./js/projectsDisplay.js', './js/projectsNav.js'],
                   }
               }
           },
           assetsInlineLimit: 4096, // 4kb
           chunkSizeWarningLimit: 1000,
           minify: 'terser',
           terserOptions: {
               compress: {
                   drop_console: true,
                   drop_debugger: true
               }
           }
       },
       plugins: [
           inject({ 
               $: 'jquery',
               jQuery: 'jquery',
           }),
           htmlInjectionPlugin({
               injections: [
                   {
                       name: "Footer",
                       path: "./includes/footer.html",
                       type: "raw",
                       injectTo: "body"
                   }
               ]
           }),
           imagetools()
       ]
   });
   ```

2. Add CSS optimization:
   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       'postcss-preset-env': {},
       'postcss-pxtorem': {
         rootValue: 16,
         propList: ['*'],
         selectorBlackList: [/^html$/]
       },
       'cssnano': process.env.NODE_ENV === 'production' ? {
         preset: ['default', {
           discardComments: {
             removeAll: true,
           },
           normalizeWhitespace: false,
         }]
       } : false
     }
   };
   ```

Benefits:
- Reduced bundle size
- Optimized images
- Improved loading performance
- Better code splitting

### 4. Code Splitting and Lazy Loading

Implement code splitting and lazy loading for better performance:

1. Update main.js to use dynamic imports:
   ```javascript
   // main.js
   import './style.scss';
   import $ from 'jquery';
   
   // Core functionality loaded immediately
   import { scrollHeader } from './js/components/scrollHeader.js';
   import { navigation } from './js/components/navigation.js';
   import { header } from './js/components/header.js';
   
   // Features loaded dynamically
   const loadProjectFeatures = async () => {
     const { projectsNav } = await import('./js/features/projects/projectsNav.js');
     const { projectsDisplay } = await import('./js/features/projects/projectsDisplay.js');
     
     projectsNav($("aside"));
     projectsDisplay($("section[data-section='proj-display']"));
   };
   
   const loadContactFeatures = async () => {
     const { summary } = await import('./js/features/contact/summary.js');
     const { contact } = await import('./js/features/contact/contact.js');
     
     summary($(".summary"));
     contact($(".contact"));
   };
   
   // Initialize core functionality
   scrollHeader($("body"));
   navigation($("nav"));
   header($("header"));
   
   // Load features based on current page
   if (document.querySelector("section[data-section='proj-display']")) {
     loadProjectFeatures();
   }
   
   if (document.querySelector(".summary, .contact")) {
     loadContactFeatures();
   }
   
   // Load back-to-top functionality when user scrolls
   let backToTopLoaded = false;
   window.addEventListener('scroll', async () => {
     if (!backToTopLoaded && window.scrollY > 500) {
       const { backToTop } = await import('./js/components/backToTop.js');
       backToTop($(".back-to-top"));
       backToTopLoaded = true;
     }
   });
   
   document.querySelector('.year').innerHTML = new Date().getFullYear();
   
   // Responsive handling
   let previousWidth = $(window).width();
   $(window).on('resize', ()=>  {
     const currentWidth = $(window).width();
   
     if (previousWidth < 992 && currentWidth >= 992 || previousWidth > 991 && currentWidth <= 991) {
       location.reload();
     }
   
     previousWidth = currentWidth;
   });
   ```

Benefits:
- Reduced initial load time
- Better performance on mobile devices
- Only load what's needed when it's needed

### 5. SCSS Organization Improvements

Enhance the SCSS structure for better maintainability:

```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _functions.scss
│   └── _index.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   ├── _root.scss
│   └── _index.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _index.scss
├── layout/
│   ├── _navigation.scss
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _article.scss
│   └── _index.scss
├── pages/
│   ├── _home.scss
│   ├── _past.scss
│   └── _index.scss
└── main.scss
```

Benefits:
- Better organization of styles
- Easier to locate and maintain specific styles
- Improved reusability of style components

### 6. Content Management

Consider moving the content.json to a more structured format:

```
data/
├── navigation.json
├── projects/
│   ├── recent.json
│   └── past.json
└── summary.json
```

Benefits:
- More manageable content files
- Easier to update specific sections
- Better separation of concerns

## Implementation Strategy

1. **Phase 1: Asset Reorganization**
   - Create new directory structure in public folder
   - Move images to appropriate directories
   - Update references in content.json and HTML files

2. **Phase 2: JavaScript Restructuring**
   - Create new directory structure for JS files
   - Refactor JS modules to fit new structure
   - Implement code splitting and lazy loading

3. **Phase 3: Build Optimization**
   - Update Vite configuration
   - Add optimization plugins
   - Configure code splitting

4. **Phase 4: SCSS Reorganization**
   - Create new SCSS directory structure
   - Refactor SCSS files to fit new structure
   - Extract common styles into reusable components

5. **Phase 5: Content Management**
   - Restructure content.json into multiple files
   - Update references in JS files

## Expected Benefits

- **Improved Performance**: Faster loading times through optimized assets and code splitting
- **Better Maintainability**: Clearer organization makes the codebase easier to maintain
- **Enhanced Scalability**: Structured approach allows for easier addition of new features
- **Reduced Bundle Size**: Optimized assets and code splitting reduce the overall bundle size
- **Better Developer Experience**: Clearer organization improves the development workflow
