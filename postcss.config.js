/**
 * Optimized PostCSS Configuration
 */
export default {
  plugins: {
    // Process modern CSS features
    'postcss-preset-env': {
      stage: 2, // Use stage 2 features
      features: {
        'nesting-rules': true, // Enable CSS nesting
        'custom-properties': true, // Enable CSS variables
        'custom-media-queries': true, // Enable custom media queries
        'media-query-ranges': true, // Enable media query ranges
        'color-functional-notation': true, // Enable modern color syntax
        'cascade-layers': true, // Enable CSS cascade layers
      },
      browsers: [
        '> 1%', 
        'last 2 versions', 
        'not dead'
      ],
      autoprefixer: {
        grid: true // Enable grid prefixing
      }
    },
    
    // Convert px to rem for better responsive design
    'postcss-pxtorem': {
      rootValue: 16, // Base font size
      propList: ['*'], // Apply to all properties
      selectorBlackList: [/^html$/], // Don't convert html element
      minPixelValue: 2, // Only convert px values >= 2px
      mediaQuery: true // Convert px in media queries too
    },
    
    // Optimize and minify CSS in production
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true, // Remove all comments
        },
        normalizeWhitespace: false, // Don't remove all whitespace
        minifyFontValues: {
          removeQuotes: false // Don't remove quotes from font names
        },
        calc: false, // Don't optimize calc expressions (can cause issues)
        colormin: true, // Minify colors
        convertValues: true, // Convert values when possible
        discardDuplicates: true, // Remove duplicate rules
        discardEmpty: true, // Remove empty rules
        mergeIdents: false, // Don't merge identifiers
        reduceIdents: false, // Don't reduce identifiers
        zindex: false, // Don't rebase z-index values
        svgo: true // Optimize SVGs
      }]
    } : false,
    
    // Add fallbacks for modern CSS features
    'postcss-logical': {}, // Convert logical properties to physical ones
    'postcss-dir-pseudo-class': {}, // Add support for :dir() pseudo-class
    
    // Add support for modern color syntax
    'postcss-color-function': {},
    
    // Add support for modern media queries
    'postcss-custom-media': {},
    
    // Add support for modern selectors
    'postcss-custom-selectors': {},
    
    // Add support for nesting
    'postcss-nested': {}
  }
};
