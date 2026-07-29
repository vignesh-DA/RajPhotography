/* ===== SCROLL REVEAL (Intersection Observer) ===== */
(function() {
    'use strict';

    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal:not(.active)');

        if (!reveals.length) return;

        if (!('IntersectionObserver' in window)) {
            /* Fallback: show everything immediately */
            reveals.forEach(function(el) {
                el.classList.add('active');
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = parseInt(el.getAttribute('data-delay') || '0', 10);

                    setTimeout(function() {
                        el.classList.add('active');
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function(el) {
            observer.observe(el);
        });
    }

    /* --- Stats Counter Animation --- */
    function initStatsCounter() {
        var stats = document.querySelectorAll('.stats__number[data-target]');
        if (!stats.length) return;

        if (!('IntersectionObserver' in window)) {
            stats.forEach(function(stat) {
                stat.textContent = stat.getAttribute('data-target');
            });
            return;
        }

        var statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-target'), 10);
                    animateCount(el, 0, target, 2000);
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function(stat) {
            statsObserver.observe(stat);
        });
    }

    function animateCount(el, start, end, duration) {
        var startTime = null;

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            var progress = Math.min((currentTime - startTime) / duration, 1);
            /* Ease-out quad */
            var easedProgress = 1 - (1 - progress) * (1 - progress);
            var current = Math.floor(easedProgress * (end - start) + start);
            el.textContent = current;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end;
            }
        }

        window.requestAnimationFrame(step);
    }

    /* --- Hero Slider --- */
    function initHeroSlider() {
        var slides = document.querySelectorAll('.hero__slide');
        if (slides.length < 2) return;

        var currentSlide = 0;

        setInterval(function() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    /* Run on DOM ready */
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initStatsCounter();
        initHeroSlider();
    });

    /* Expose for dynamic content */
    window.initScrollReveal = initScrollReveal;

})();
