export function animations(element) {

    (function($, AOS) {
        AOS.init({
            delay: 300,
            duration: 200,
            anchorPlacement: 'top-center',
            easing: 'ease-out-cubic',
            once: true,
            disable: 'mobile'
        });
    })(jQuery, AOS); 
}