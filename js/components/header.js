/**
 * Header Component
 * Renders the main header with title and subtitle
 */
import json from '../../data/header.json';

/**
 * Renders the header component
 * @param {jQuery} element - The jQuery element to render the header into
 */
export function header(element) {
    const data = json;
    
    const html = `
        <h1 data-aos="fade-left" data-aos-delay="400">${data.text_h1}</h1>
        <h2 data-aos="fade-left" data-aos-delay="500">${data.text_h2}</h2>
    `;
    
    $(element).html(html);
}
