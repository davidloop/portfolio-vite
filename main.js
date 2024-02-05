import './style.scss';
import $ from 'jquery';
import { scrollHeader } from './js/scrollHeader.js';
import { navigation } from './js/navigation.js';
import { projectsNav } from './js/projectsNav.js';
import { header } from './js/header.js';
import { backToTop } from './js/backToTop.js';
import { projectsDisplay } from './js/projectsDisplay.js';
import { summary } from './js/summary.js';
import { contact } from './js/contact.js';

document.querySelector('main').innerHTML = `
  <header></header>
  <article>
    <section data-section="proj-nav">
      <aside></aside>
    </section>
    <section data-section="proj-display"></section>
    <section data-section="summary-contact">
      <div class="summary"></div>
      <div class="contact">
        <div class="contact--title"></div>
          <iframe
            id="JotFormIFrame-240335912420143"
            title="General Inquiry Contact Form"
            onload="window.parent.scrollTo(0,0)"
            allowtransparency="true"
            allowfullscreen="true"
            allow="geolocation; microphone; camera"
            src="https://form.jotform.com/240335912420143"
            frameborder="0"
            style="min-width:100%;max-width:100%;height:377px;border:none;"
            scrolling="no"
          >
          </iframe>
          <script type="text/javascript">
            var ifr = document.getElementById("JotFormIFrame-240335912420143");
            if (ifr) {
              var src = ifr.src;
              var iframeParams = [];
              if (window.location.href && window.location.href.indexOf("?") > -1) {
                iframeParams = iframeParams.concat(window.location.href.substr(window.location.href.indexOf("?") + 1).split('&'));
              }
              if (src && src.indexOf("?") > -1) {
                iframeParams = iframeParams.concat(src.substr(src.indexOf("?") + 1).split("&"));
                src = src.substr(0, src.indexOf("?"))
              }
              iframeParams.push("isIframeEmbed=1");
              ifr.src = src + "?" + iframeParams.join('&');
            }
          window.handleIFrameMessage = function(e) {
            if (typeof e.data === 'object') { return; }
            var args = e.data.split(":");
            if (args.length > 2) { iframe = document.getElementById("JotFormIFrame-" + args[(args.length - 1)]); } else { iframe = document.getElementById("JotFormIFrame"); }
            if (!iframe) { return; }
            switch (args[0]) {
              case "scrollIntoView":
                iframe.scrollIntoView();
                break;
              case "setHeight":
                iframe.style.height = args[1] + "px";
                if (!isNaN(args[1]) && parseInt(iframe.style.minHeight) > parseInt(args[1])) {
                  iframe.style.minHeight = args[1] + "px";
                }
                break;
              case "collapseErrorPage":
                if (iframe.clientHeight > window.innerHeight) {
                  iframe.style.height = window.innerHeight + "px";
                }
                break;
              case "reloadPage":
                window.location.reload();
                break;
              case "loadScript":
                if( !window.isPermitted(e.origin, ['jotform.com', 'jotform.pro']) ) { break; }
                var src = args[1];
                if (args.length > 3) {
                    src = args[1] + ':' + args[2];
                }
                var script = document.createElement('script');
                script.src = src;
                script.type = 'text/javascript';
                document.body.appendChild(script);
                break;
              case "exitFullscreen":
                if      (window.document.exitFullscreen)        window.document.exitFullscreen();
                else if (window.document.mozCancelFullScreen)   window.document.mozCancelFullScreen();
                else if (window.document.mozCancelFullscreen)   window.document.mozCancelFullScreen();
                else if (window.document.webkitExitFullscreen)  window.document.webkitExitFullscreen();
                else if (window.document.msExitFullscreen)      window.document.msExitFullscreen();
                break;
            }
            var isJotForm = (e.origin.indexOf("jotform") > -1) ? true : false;
            if(isJotForm && "contentWindow" in iframe && "postMessage" in iframe.contentWindow) {
              var urls = {"docurl":encodeURIComponent(document.URL),"referrer":encodeURIComponent(document.referrer)};
              iframe.contentWindow.postMessage(JSON.stringify({"type":"urls","value":urls}), "*");
            }
          };
          window.isPermitted = function(originUrl, whitelisted_domains) {
            var url = document.createElement('a');
            url.href = originUrl;
            var hostname = url.hostname;
            var result = false;
            if( typeof hostname !== 'undefined' ) {
              whitelisted_domains.forEach(function(element) {
                if( hostname.slice((-1 * element.length - 1)) === '.'.concat(element) ||  hostname === element ) {
                  result = true;
                }
              });
              return result;
            }
          };
          if (window.addEventListener) {
            window.addEventListener("message", handleIFrameMessage, false);
          } else if (window.attachEvent) {
            window.attachEvent("onmessage", handleIFrameMessage);
          }
        </script>      
      </div>
    </section>
  </article>
`
scrollHeader($("body"));
projectsNav($("aside"));
projectsDisplay($("section[data-section='proj-display']"));
navigation($("nav"));
header($("header"));
backToTop($(".back-to-top"));
summary($(".summary"));
contact($(".contact--title"));
document.querySelector('.year').innerHTML = new Date().getFullYear();