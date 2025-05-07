/**
 * Optimized Vite Configuration
 */
import { defineConfig } from 'vite';
import inject from "@rollup/plugin-inject";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  // Base public path - adjust if deploying to a subdirectory
  base: '/',
  
  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    
    // Enable source maps for production
    sourcemap: false,
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Asset handling
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
    chunkSizeWarningLimit: 1000, // Increase warning limit for larger chunks
    
    // Ensure past directory is copied to dist
    copyPublicDir: true,
    
    // Rollup options
    rollupOptions: {
      input: {
        main: 'index.html',
        past: 'past/index.html',
      },
      output: {
        // Chunk naming format
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Group assets by type in different directories
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.(css|scss)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        },
        
        // Manual chunk configuration for better code splitting
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ['jquery', 'aos'],
          
          // Feature chunks
          'feature-projects': [
            './js/features/projects/projectsNav.js', 
            './js/features/projects/projectsDisplay.js'
          ],
          'feature-contact': [
            './js/features/contact/summary.js', 
            './js/features/contact/contact.js'
          ],
          
          // Core components
          'core-components': [
            './js/components/header.js',
            './js/components/navigation.js',
            './js/components/scrollHeader.js'
          ]
        }
      }
    }
  },
  
  // CSS processing
  css: {
    // Enable CSS source maps
    devSourcemap: true,
    
    // PostCSS configuration is in postcss.config.js
  },
  
  // Development server options
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // Plugins
  plugins: [
    // jQuery injection
    inject({ 
      $: 'jquery',
      jQuery: 'jquery',
    }),
    
    // HTML injection for footer
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
    
    // HTML processing
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: '/main.js',
          filename: 'index.html',
          template: 'index.html',
        },
        {
          entry: '/main.js',
          filename: 'past/index.html',
          template: 'past/index.html',
        }
      ]
    }),
    
    // Image optimization
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
      avif: {
        lossless: true,
      },
      gif: {
        optimizationLevel: 3,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                cleanupNumericValues: {
                  floatPrecision: 2,
                },
              },
            },
          },
          'removeDimensions',
        ],
      },
    }),
    
    // Split vendor chunks
    splitVendorChunkPlugin()
  ],
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/js/components',
      '@features': '/js/features',
      '@utils': '/js/utils',
      '@data': '/data'
    }
  },
  
  // Performance optimizations
  optimizeDeps: {
    include: ['jquery', 'aos'],
    exclude: []
  }
});
