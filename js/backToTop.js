export function backToTop(element) {

    $(window).on('scroll', () => {
        const scrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (scrolled >= 100) {
            $(element).addClass('visible');
        } else {
            $(element).removeClass('visible');
        }
    });
  
    $(element).on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("[id=top]").offset().top
        }, 200);
    });
}