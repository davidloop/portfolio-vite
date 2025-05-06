import recentData from '../../../data/projects/recent.json';
import pastData from '../../../data/projects/past.json';

export function projectsNav(element) {
    const pathname = window.location.pathname;
    const isRecent = pathname === "/";
    const isPast = pathname === "/past/";

    if (!isRecent && !isPast) return;

    const data = isRecent ? recentData : pastData;
    const heading = data.heading;
    const ul = [];

    let delay = 400;

    data.projects.forEach(project => {
        $.each(project, (_, items) => {
            items.forEach(item => {
                const tabTitle = item.project_title.toLowerCase().replace(/\s+/g, '');
                ul.push(`<li data-aos="fade-in" data-aos-delay="${delay}"><a tabindex="0" href="#${tabTitle}">${item.project_title}</a></li>`);
                delay += 100;
            });
        });
    });

    const html =`
        <h3 data-aos="fade-in" data-aos-delay="400">${heading}</h3>
        <ul>${ul.join("")}</ul>
    `;

    $(element).html(html);

    let windowWidth = window.innerWidth;
    const $trigger = $("aside h3");

    if ($trigger.hasClass('mobile') && windowWidth >= 991) {
        $trigger.removeClass('mobile');
    } else {
        $trigger.addClass('mobile');
        $trigger.off('click').on('click', (e) => {
            $(e.currentTarget).toggleClass('open').next("ul").stop(true, true).slideToggle('fast');
        });
    }
}
