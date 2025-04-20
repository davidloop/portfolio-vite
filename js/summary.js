import json from '/content.json';
let dataSummary = json.summary[0];

export function summary(element) {
    const html =`
        <div class="summary--title">
            <h4>${dataSummary.summary_title}</h4>
        </div>
        <p>${dataSummary.summary_text[0].summary_text_1}</p>
        <p>${dataSummary.summary_text[1].summary_text_2}</p>
    `;

    $(element).html(html);

    $(window).on('scroll', () => {
        let windowWidth = window.innerWidth;
        const $target = $(element).parent();
        const scrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if (scrolled >= 320 && windowWidth >= 991) {
            let height = $target.height() + 40;

            $target.addClass('visible');
            $("header").addClass('scrolled');
            $("main").css({
                'padding-bottom' : height + 'px', 
            });
        } else {
            $target.removeClass('visible');
            $("header").removeClass('scrolled');
            $("main").css({
                'padding-bottom' : '0', 
            });
        }
    });
}