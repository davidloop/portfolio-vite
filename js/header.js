import json from '/content.json';
let data = json.header[0];

export function header(element) {
    const html =`
        <h1 data-aos="fade-left" data-aos-delay="400">${data.text_h1}</h1>
        <h2 data-aos="fade-left" data-aos-delay="500">${data.text_h2}</h2>
    `;
    $(element).html(html);
}