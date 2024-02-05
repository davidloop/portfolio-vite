import json from '/content.json';
let data = json.navigation;

export function navigation(element) {
    let ul = [];
    data.forEach( obj => {
        let className = obj.nav_title.toLowerCase().replace(/ /g, '').replace(/&/g, '');
        if (window.location.pathname == obj.nav_url) {
            ul.push('<li><a tabindex="0" class="' + className + ' active" href=' + obj.nav_url + '><span>' + obj.nav_title + '</span></a></li>');
        } else {
            ul.push('<li><a tabindex="0" class="' + className + '" href=' + obj.nav_url + '><span>' + obj.nav_title + '</span></a></li>');
        }
    });
    $(element).html('<ul>' + ul.join("") + '</ul>');

    $("a.summarycontact").on('click', (e) => {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("section[data-section='summary-contact']").offset().top - 80
        }, 200);
    });
}