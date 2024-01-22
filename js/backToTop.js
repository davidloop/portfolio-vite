export function backToTop(element) {
  
    $(element).on('click', function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("[id=top]").offset().top
        }, 200);
    });
}