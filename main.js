import './scss/style.scss';
import $ from 'jquery';
import { scrollHeader } from './js/scrollHeader.js';
import { navigation } from './js/navigation.js';
import { projectsNav } from './js/projectsNav.js';
import { header } from './js/header.js';
import { backToTop } from './js/backToTop.js';
import { projectsDisplay } from './js/projectsDisplay.js';

document.querySelector('main').innerHTML = `
  <header></header>
  <article>
    <section data-section="proj-nav">
      <aside></aside>
    </section>
    <section data-section="proj-display"></section>
  </article>
`
scrollHeader($("body"));
projectsNav($("aside"));
projectsDisplay($("section[data-section='proj-display']"));
navigation($("nav"));
header($("header"));
backToTop($(".back-to-top"));

document.querySelector('.year').innerHTML = new Date().getFullYear();