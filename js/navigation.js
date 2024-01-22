import json from '/content.json';
let data = json.navigation;

export function navigation(element) {
    let ul = [];
    data.forEach( obj => {
        if (window.location.pathname == obj.nav_url) {
            ul.push('<li><a class="active" href=' + obj.nav_url + '><span>' + obj.nav_title + '</span></a></li>');
        } else {
            ul.push('<li><a href=' + obj.nav_url + '><span>' + obj.nav_title + '</span></a></li>');
        }
    });
    $(element).html('<ul>' + ul.join("") + '</ul>');
}