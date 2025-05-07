import recentData from '../../../data/projects/recent.json';
import pastData from '../../../data/projects/past.json';

export function projectsDisplay(element) {
    let windowWidth = window.innerWidth;
    const triggerSelector = "aside ul li a";
    const targetSection = $("section[data-section='proj-display']");
    const heading = $(triggerSelector).parents("aside").find("h3");

    function setupToggleDescription(triggerSelector, contentSelector) {
        $(triggerSelector + " > a").on('click', function (e) {
            e.preventDefault();

            const $clicked = $(this);
            const $section = $clicked.closest("section[data-section='proj-display']");
            const $content = $section.find(contentSelector);
            const isOpen = $clicked.hasClass('open');

            $clicked.toggleClass('open', !isOpen).attr('aria-expanded', !isOpen);
            $content.stop(true, true).slideToggle('fast');
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
                    <img src="/images/icons/icon-angle-up.svg" alt="Details arrow icon" />Details
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

        if ($(heading).hasClass("mobile") && windowWidth <= 992) {
            $(heading).removeClass("open").next("ul").stop(true, true).slideToggle('fast');
        }

        const $target = $(e.currentTarget);
        const isActive = $target.hasClass('active');
        $(triggerSelector).removeClass('active');
        $target.addClass('active', !isActive);

        const href = $target.attr('href');
        const targetID = href?.replace(/[# ]/g, '');
        const pathname = window.location.pathname;
        const $section = $("article:first-of-type");

        setTimeout( () => {
            $("html, body").animate({
                scrollTop: $section.offset().top - 40
            }, 200);
        }, 500);

        const data = pathname === "/" ? recentData : pathname === "/past/" ? pastData : null;
        if (!data) return;

        data.projects.forEach(project => {
            $.each(project, (_, items) => {
                items.forEach(item => {
                    const tabID = item.project_title.toLowerCase().replace(/\s+/g, '');
                    if (targetID === tabID) {
                        handleProjectClick(item);
                        return;
                    }
                });
            });
        });
    });

    function runFirstTab() {
        const pathname = window.location.pathname;
        console.log('Current pathname:', pathname);
        const data = pathname === "/" ? recentData : pathname === "/past/" ? pastData : null;
        if (!data) {
            console.log('No data found for pathname:', pathname);
            return;
        }

        console.log('Data found:', data);
        const firstProject = data.projects[0];
        console.log('First project:', firstProject);
        const firstTabID = Object.keys(firstProject)[0];
        console.log('First tab ID:', firstTabID);
        const project = firstProject[firstTabID][0];
        console.log('Project to display:', project);

        handleProjectClick(project);
        $(triggerSelector).filter(`[href="#${firstTabID}"]`).addClass('active');
    }

    // Call runFirstTab immediately instead of waiting for window.load
    runFirstTab();
    
    // Also keep the window.load event as a backup
    $(window).on('load', () => {
        if (!$(targetSection).html()) {
            console.log('No content in target section, running first tab again');
            runFirstTab();
        }
    });
}
