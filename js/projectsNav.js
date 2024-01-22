import json from '/content.json';
let data = json.projects;

export function projectsNav(element) {
    let ul = [];
    data.forEach( project => {
        project.present.forEach( name => {
            $.each(name, function(i, items) {
                $.each(items, function(j, item) {
                    let tabTitle = item.project_title.toLowerCase().replace(/ /g, '');
                    ul.push('<li><a href=' + '#' + tabTitle + '>' + item.project_title + '</a></li>');
                });
            });
        });
    });
    $(element).html('<ul>' + ul.join("") + '</ul>');
}
