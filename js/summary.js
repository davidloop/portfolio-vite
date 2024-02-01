import json from '/content.json';
let data = json.summary[0];

export function summary(element) {
    $(element).html('<div class="summary"><h4>' + data.summary_title + '</h4><p>' + data.summary_text[0].summary_text_1 + '</p><p>' + data.summary_text[1].summary_text_2 + '</p></div>');
}