import data from '../../data/navigation.json';

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

    const html = `
        <ul data-aos="fade-in">
            ${ul.join('')}
        </ul>
        <a href="#" class="trigger-mobile-menu" title="Mobile Menu">
            <span></span>
            <span></span>
            <span></span>
        </a>
    `;

    $(element).html(html);

    $("a.summarycontact").on('click', (e) => {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $("article:last-of-type").offset().top - 80
        }, 200);

        $("a.trigger-mobile-menu").hasClass("open") && (
            $("nav ul").slideUp("fast"), $("a.trigger-mobile-menu").removeClass("open")
        );
    });

    $("a.trigger-mobile-menu").on('click', (e) => {
        e.preventDefault();
        
        const $trigger = $(e.currentTarget);

        $trigger.toggleClass('open');
        $("nav ul").stop(true, true).slideToggle('fast');
    });
}
