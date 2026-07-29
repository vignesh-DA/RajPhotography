/* ===== NAVBAR ===== */
(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navbar || !navToggle || !navMenu) return;

    /* --- Mobile menu toggle --- */
    navToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('navbar__nav--open');
        navToggle.classList.toggle('navbar__hamburger--active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('no-scroll', isOpen);
    });

    /* Close menu when a link is clicked */
    navMenu.querySelectorAll('.navbar__link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('navbar__nav--open');
            navToggle.classList.remove('navbar__hamburger--active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        });
    });

    /* Close menu on ESC key */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('navbar__nav--open')) {
            navMenu.classList.remove('navbar__nav--open');
            navToggle.classList.remove('navbar__hamburger--active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        }
    });

    /* --- Scroll: add solid background --- */
    var lastScrollY = 0;
    var ticking = false;

    function updateNavbar() {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollY > 60) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }

        /* Optional: hide on scroll down, show on scroll up */
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    /* Initial state */
    updateNavbar();

    /* --- Smooth anchor scroll --- */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = navbar.offsetHeight;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    /* --- Active link highlight based on current page --- */
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link').forEach(function(link) {
        var href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

})();
