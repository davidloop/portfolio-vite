import json from '/content.json';
let data = json.navigation;

export function navigation(element) {
    let ul = [];
    data.forEach( obj => {
        ul.push('<li><a href=' + obj.nav_url + '><span>' + obj.nav_title + '</span></a></li>');
    });
    $(element).html('<ul>' + ul.join("") + '</ul>');
}