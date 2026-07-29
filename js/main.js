/* ===== MAIN (shared init across all pages) ===== */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {

        /* --- Preloader: fade out once page is loaded --- */
        document.body.classList.add('loaded');

        /* --- Copyright year auto-update --- */
        document.querySelectorAll('.footer__bottom p').forEach(function(p) {
            p.innerHTML = p.innerHTML.replace(/© \d{4}/, '© ' + new Date().getFullYear());
        });

        /* --- Smooth page transitions (add class before navigation) --- */
        document.querySelectorAll('a').forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || link.target === '_blank') return;

            link.addEventListener('click', function(e) {
                /* Only for internal navigation */
                if (this.hostname !== window.location.hostname && this.hostname !== '') return;
            });
        });

        /* --- Lazy image loading enhancement: add 'loaded' class when images load --- */
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            if (img.complete) {
                img.classList.add('img-loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('img-loaded');
                });
            }
        });

        /* --- Back to top scroll (if button exists) --- */
        var backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, { passive: true });

            backToTop.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

    });

})();
