import json from '/content.json';
let data = json.header[0];

export function header(element) {
    $(element).html('<h1>' + data.text_h1 + '</h1><h2>' + data.text_h2 + '</h2>');
}