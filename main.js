/**
 * Main Application Entry Point
 * Optimized with code splitting and lazy loading
 */
import './style.scss';
import $ from 'jquery';
import { preloadAllData } from './js/utils/dataService.js';

// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    delay: 300,
    duration: 200,
    anchorPlacement: 'top-center',
    easing: 'ease-out-cubic',
    once: true,
    disable: window.innerWidth < 992
  });
});

// Create main DOM structure
document.querySelector('main').innerHTML = `
  <header></header>
  <article>
    <section data-section="proj-nav">
      <aside></aside>
    </section>
    <section data-section="proj-display"></section>
  </article>
  <article>
    <section id="summary-contact" data-section="summary-contact">
      <div class="summary"></div>
      <div class="contact"></div>
    </section>
  </article>
`;

// Core components loaded immediately
import('./js/components/scrollHeader.js').then(({ scrollHeader }) => {
  scrollHeader($("body"));
});

import('./js/components/navigation.js').then(({ navigation }) => {
  navigation($("nav"));
});

import('./js/components/header.js').then(({ header }) => {
  header($("header"));
});

// Feature components loaded based on current page
const pathname = window.location.pathname;

// Load project features if on a project page
if (pathname === "/" || pathname === "/past/") {
  Promise.all([
    import('./js/features/projects/projectsNav.js'),
    import('./js/features/projects/projectsDisplay.js')
  ]).then(([navModule, displayModule]) => {
    navModule.projectsNav($("aside"));
    displayModule.projectsDisplay($("section[data-section='proj-display']"));
  });
}

// Load summary and contact features
// Always load these features regardless of whether the elements exist yet
Promise.all([
  import('./js/features/contact/summary.js'),
  import('./js/features/contact/contact.js')
]).then(([summaryModule, contactModule]) => {
  // Check if the elements exist before trying to populate them
  if ($(".summary").length) {
    summaryModule.summary($(".summary"));
  } else {
    console.log("Summary element not found");
  }
  
  if ($(".contact").length) {
    contactModule.contact($(".contact"));
  } else {
    console.log("Contact element not found");
  }
});

// Load back-to-top functionality when user scrolls
let backToTopLoaded = false;
window.addEventListener('scroll', () => {
  if (!backToTopLoaded && window.scrollY > 500) {
    import('./js/components/backToTop.js').then(({ backToTop }) => {
      backToTop($(".back-to-top"));
      backToTopLoaded = true;
    });
  }
});

// Set current year in footer
document.querySelector('.year').innerHTML = new Date().getFullYear();

// Handle responsive behavior
let previousWidth = $(window).width();
$(window).on('resize', () => {
  const currentWidth = $(window).width();

  if ((previousWidth < 992 && currentWidth >= 992) || 
      (previousWidth > 991 && currentWidth <= 991)) {
    location.reload();
  }

  previousWidth = currentWidth;
});

// Preload data for faster access
preloadAllData().catch(error => {
  console.error('Error preloading data:', error);
});
