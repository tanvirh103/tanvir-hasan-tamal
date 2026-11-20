/**
 * Clickjacking protection for GitHub Pages, which cannot send `X-Frame-Options` or
 * `frame-ancestors` headers (and `frame-ancestors` is ignored in a <meta> CSP).
 * When the page is framed, try to move the top window to this page, and hide the content
 * either way, so a transparent overlay cannot be used to trick visitors into clicking it.
 */
export const frameBustScript = `(function(){try{if(window.top!==window.self){try{window.top.location=window.self.location;}catch(e){}document.documentElement.style.display="none";}}catch(e){document.documentElement.style.display="none";}})();`;
