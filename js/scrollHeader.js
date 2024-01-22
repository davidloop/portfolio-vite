export function scrollHeader(element) {

    $(window).on('scroll', (e) => {
        if ($(e.target).scrollTop() >= 150) {
            $(element).addClass('scrolled');
        } else {
            $(element).removeClass('scrolled');
        }
    });
}