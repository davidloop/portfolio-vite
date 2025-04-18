import json from '/content.json';
let projects = json.projects;

export function projectsDisplay(element) {
    const triggerSelector = "aside ul li a";
    const targetSection = $("section[data-section='proj-display']");

    function setupToggleDescription(triggerSelector, contentSelector) {
        $(triggerSelector + " > a").on('click', function (e) {
            e.preventDefault();

            const $clicked = $(this);
            const $section = $clicked.closest("section[data-section='proj-display']");
            const $content = $section.find(contentSelector);
            const isOpen = $clicked.hasClass('open');

            $clicked.toggleClass('open', !isOpen).attr('aria-expanded', !isOpen);
            $content.slideToggle('fast');
        });
    }

    function setupImages() {
        const $images = $(".proj-display--images img");
        $images.filter(".loader").delay(1000).fadeTo(300, 0);
        $images.not(".loader").delay(1000).fadeTo(300, 1);
    }

    function setupDetails(item) {
        const links = [];
        if (item.project_url) links.push(`<a href="${item.project_url}" target="_blank">View project</a>`);
        if (item.project_url_2) links.push(`<a href="${item.project_url_2}" target="_blank">View project</a>`);

        const detailsTrigger = item.project_description ? `
            <div class="meta--description-trigger" data-aos="fade-in" data-aos-delay="600">
                <a href="#" aria-expanded="false">
                    <img src="/icon-angle-up.svg" alt="Details arrow icon" />Details
                </a>
            </div>
        ` : '';

        return {
            links: links.join(''),
            details: detailsTrigger
        };
    }

    function renderProject(item) {
        const { links, details } = setupDetails(item);
        return `
            <h4 data-aos="fade-left" data-aos-delay="400">${item.project_title}</h4>
            <div class="proj-display--meta">
                <div class="meta--title-skills-year" data-aos="fade-left" data-aos-delay="800">
                    <p>${item.project_year}${links}</p>
                    <p>${item.project_skills}</p>
                </div>
                ${details}
            </div>
            <div class="meta--description-target">${item.project_description}</div>
            <div class="proj-display--images">${item.images}</div>
        `;
    }

    function handleProjectClick(item) {
        const html = renderProject(item);
        $(targetSection).html(html);
        setupImages();
        setupToggleDescription('.meta--description-trigger', '.meta--description-target');
    }

    $(triggerSelector).on('click', (e) => {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $("section").offset().top - 80
        }, 200);

        const $target = $(e.target);
        const isActive = $target.hasClass('active');
        $(triggerSelector).removeClass('active');
        $target.toggleClass('active', !isActive);

        const href = $target.attr('href');
        const targetID = href?.replace(/[# ]/g, '');
        const pathname = window.location.pathname;

        projects.forEach(project => {
            const path = pathname === "/" ? project.present : pathname === "/past/" ? project.past : null;
            if (!path) return;

            for (const group of path) {
                for (const items of Object.values(group)) {
                    for (const item of items) {
                        const tabID = item.project_title.toLowerCase().replace(/\s+/g, '');
                        if (targetID === tabID) {
                            handleProjectClick(item);
                            return;
                        }
                    }
                }
            }
        });
    });

    function runFirstTab(firstTab) {
        const firstTabID = Object.keys(firstTab)[0];
        const project = firstTab[firstTabID][0];

        handleProjectClick(project);
        $(triggerSelector).filter(`[href="#${firstTabID}"]`).addClass('active');
    }

    $(window).on('load', () => {
        const path = window.location.pathname;
        const tabType = path === "/" ? "present" : path === "/past/" ? "past" : null;
        if (!tabType) return;

        const firstTab = projects[0][tabType][0];
        runFirstTab(firstTab);
    });
}