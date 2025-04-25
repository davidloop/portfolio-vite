import './style.scss';
import $ from 'jquery';
import { animations } from './js/animations.js';
import { scrollHeader } from './js/scrollHeader.js';
import { navigation } from './js/navigation.js';
import { projectsNav } from './js/projectsNav.js';
import { header } from './js/header.js';
import { backToTop } from './js/backToTop.js';
import { projectsDisplay } from './js/projectsDisplay.js';
import { summary } from './js/summary.js';
import { contact } from './js/contact.js';

document.querySelector('main').innerHTML = `
  <header></header>
  <article>
    <section data-section="proj-nav">
      <aside></aside>
    </section>
    <section data-section="proj-display"></section>
  </article>
  <article>
    <section data-section="summary-contact">
      <div class="summary"></div>
      <div class="contact"></div>
    </section>
  </article>
`
animations($("body"));
scrollHeader($("body"));
projectsNav($("aside"));
projectsDisplay($("section[data-section='proj-display']"));
navigation($("nav"));
header($("header"));
backToTop($(".back-to-top"));
summary($(".summary"));
contact($(".contact"));
document.querySelector('.year').innerHTML = new Date().getFullYear();

// Needs to happen bcuz 'time'
let previousWidth = $(window).width();

$(window).on('resize', ()=>  {
  const currentWidth = $(window).width();

  if (previousWidth < 992 && currentWidth >= 992 || previousWidth > 991 && currentWidth <= 991) {
    location.reload();
  }

  previousWidth = currentWidth;
});