import json from '/content.json';
let dataSummary = json.summary[0];

export function summary(element) {
    $(element).html('<div class="summary--title"><h4>' + dataSummary.summary_title + '</h4></div><p>' + dataSummary.summary_text[0].summary_text_1 + '</p><p>' + dataSummary.summary_text[1].summary_text_2 + '</p>');
}