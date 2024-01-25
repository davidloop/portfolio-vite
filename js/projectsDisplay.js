import json from '/content.json';
let projects = json.projects;

export function projectsDisplay(element) {
    let trigger = $("aside ul li a");
    let targetSection = $("section[data-section='proj-display']");
    
    $(trigger).on('click', (e) => {
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $("section").offset().top - 80
        }, 200);

        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
        } else {
            $(trigger).removeClass('active');
            $(e.target).addClass('active');
        }

        let target = $(e.target).attr('href');
        let targetTitle = target.replace(/#/g, '');
        let targetID = targetTitle.replace(/ /g, '');

        projects.forEach( project => {
        
            let path;
            if (window.location.pathname === "/") {
                path = project.present;
            }
            if (window.location.pathname === "/past/") {
                path = project.past;
            }

            path.forEach( name => {
                $.each(name, function(i, items) {
                    $.each(items, function(j, item) {
                        let tabTitle = item.project_title.toLowerCase().replace(/ /g, '');
                        let tabID = tabTitle.replace(/ /g, '');
                        if (targetID == tabID) {
                            let text = [];
                            text.push('<h4>' + item.project_title + '</h4>');
                            text.push('<p>' + item.project_skills + '</p>');
                            if (item.project_url) {
                                text.push('<p>' + item.project_year + '<a href=' + item.project_url + ' target="_blank">View project</a></p>');
                            } else {
                                text.push('<p>' + item.project_year + '</p>');
                            }
                            $(targetSection).html('<div class="proj-display--meta">' + text.join("") + '</div>');
                        }
                    });
                });
            });
        });
    });

    const runFirstTab = (firstTab) => {
        let firstTabID = Object.keys(firstTab)[0];
        $(trigger).filter(`[href="#${firstTabID}"]`).addClass('active');
        if (firstTab[firstTabID][0].project_url) {
            $(targetSection).html('<div class="proj-display--meta"><h4>' + firstTab[firstTabID][0].project_title + '</h4><p>' + firstTab[firstTabID][0].project_skills + '</p><p>' + firstTab[firstTabID][0].project_year + '<a href=' + firstTab[firstTabID][0].project_url + ' target="_blank">View project</a></p></div>');
        } else {
            $(targetSection).html('<div class="proj-display--meta"><h4>' + firstTab[firstTabID][0].project_title + '</h4><p>' + firstTab[firstTabID][0].project_skills + '</p><p>' + firstTab[firstTabID][0].project_year + '</p></div>');
        }
    }

    $(window).on('load', () => {
        if (window.location.pathname === "/") {
            let firstTab = projects[0].present[0];
            runFirstTab(firstTab);
        }
        if (window.location.pathname === "/past/") {
            let firstTab = projects[0].past[0];
            runFirstTab(firstTab);
        }
    });
}