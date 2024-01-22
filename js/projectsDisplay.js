import json from '/content.json';
let projects = json.projects;

export function projectsDisplay(element) {

    let trigger = $("aside ul li a");
    $(trigger).on('click', (e) => {
        e.preventDefault();

        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
        } else {
            $(trigger).removeClass('active');
            $(e.target).addClass('active');
        }

        let target = $(e.target).attr('href');
        let targetTitle = target.replace(/#/g, '');
        let targetID = targetTitle.replace(/ /g, '');
        let targetSection = $("section[data-section='proj-display']");

        projects.forEach( project => {
            project.present.forEach( name => {
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

    $(window).on('load', () => {
        let firstTab = projects[0].present[0];
        let firstTabID = Object.keys(firstTab)[0];
        console.log(Object.keys(firstTab)[0]);
        $(trigger).filter(`[href="#${firstTabID}"]`).trigger('click');
    });
}