import json from '/content.json';
let projects = json.projects;
let headings = json.projects_headings;

export function projectsNav(element) {
    let heading;
    let ul = [];

    if (window.location.pathname === "/") {
        heading = headings[0].projects_heading_recent;
        projects.forEach( project => {
            project.present.forEach( name => {
                $.each(name, function(i, items) {
                    $.each(items, function(j, item) {
                        let tabTitle = item.project_title.toLowerCase().replace(/ /g, '');
                        ul.push('<li><a href=' + '#' + tabTitle + '>' + item.project_title + '</a></li>');
                    });
                });
            });
        });
    }
    
    if (window.location.pathname === "/past/") {
        heading = headings[0].projects_heading_past;
        projects.forEach( project => {
            project.past.forEach( name => {
                $.each(name, function(i, items) {
                    $.each(items, function(j, item) {
                        let tabTitle = item.project_title.toLowerCase().replace(/ /g, '');
                        ul.push('<li><a href=' + '#' + tabTitle + '>' + item.project_title + '</a></li>');
                    });
                });
            });
        });
    }

    $(element).html('<h3>' + heading + '</h3><ul>' + ul.join("") + '</ul>');
}
