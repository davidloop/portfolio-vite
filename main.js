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
  <header data-aos="fade-in" data-aos-delay="400"></header>
  <article>
    <section data-section="proj-nav">
      <aside></aside>
    </section>
    <section data-section="proj-display"></section>
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