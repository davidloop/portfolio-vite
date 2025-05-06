import dataContact from '../../../data/contact.json';

export function contact(element) {
    const html = `
        <div class="contact--title"><h4>${dataContact.contact_title}</h4></div>
        <iframe
            id="JotFormIFrame-250690445873060"
            title="General Inquiry Contact Form"
            onload="window.parent.scrollTo(0,0)"
            allowtransparency="true"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://form.jotform.com/250690445873060"
            frameborder="0"
            style="min-width:100%;max-width:100%;height:350px;background:transparent;border:none;"
            scrolling="no"
        >
        </iframe>
        <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
        <script>window.jotformEmbedHandler("iframe[id='JotFormIFrame-250690445873060']", "https://form.jotform.com/")</script> 
    `;

    $(element).html(html);
}
