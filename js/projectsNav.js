import json from '/content.json';
let projects = json.projects;
let headings = json.projects_headings;

export function projectsNav(element) {
    const pathname = window.location.pathname;
    const isRecent = pathname === "/";
    const isPast = pathname === "/past/";

    if (!isRecent && !isPast) return;

    const heading = isRecent ? headings[0].projects_heading_recent : headings[0].projects_heading_past;
    const ul = [];

    let delay = 400;

    projects.forEach(project => {
        const section = isRecent ? project.present : project.past;

        section.forEach(group => {
            $.each(group, (_, items) => {
                items.forEach(item => {
                    const tabTitle = item.project_title.toLowerCase().replace(/\s+/g, '');
                    ul.push(`<li data-aos="fade-in" data-aos-delay="${delay}"><a tabindex="0" href="#${tabTitle}">${item.project_title}</a></li>`);
                    delay += 100;
                });
            });
        });
    });

    $(element).html(`<h3 data-aos="fade-in" data-aos-delat="500">${heading}</h3><ul>${ul.join("")}</ul>`);
}
