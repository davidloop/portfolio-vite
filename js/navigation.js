import json from '/content.json';
let data = json.navigation;

export function navigation(element) {
    let delay = 500;

    const ul = data.map(item => {
        const className = item.nav_title.toLowerCase().replace(/[\s&]/g, '');
        const isActive = window.location.pathname === item.nav_url;
        const classes = `${className}${isActive ? ' active' : ''}`;
        const li = `
            <li data-aos="fade-in" data-aos-delay="${delay}">
                <a tabindex="0" class="${classes}" href="${item.nav_url}" target="${item.target}">
                    <span>${item.nav_title}</span>
                </a>
            </li>
        `;

        delay += 100;
        return li;
    });

    $(element).html(`<ul data-aos="fade-in">${ul.join('')}</ul>`);

    $("a.summarycontact").on('click', (e) => {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("section[data-section='summary-contact']").offset().top - 80
        }, 200);
    });    
}