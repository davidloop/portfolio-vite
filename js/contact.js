import json from '/content.json';
let dataContact = json.contact[0];

export function contact(element) {
    $(element).html('<h4>' + dataContact.contact_title + '</h4>');
}