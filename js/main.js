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

        /* --- Inject Floating WhatsApp Button --- */
        if (!document.querySelector('.floating-actions')) {
            var floatWrap = document.createElement('div');
            floatWrap.className = 'floating-actions';
            floatWrap.innerHTML = `
                <a href="https://wa.me/917676147560?text=Hi%20Raj!%20I'm%20interested%20in%20booking%20a%20photography%20session." target="_blank" rel="noopener noreferrer" class="float-btn float-whatsapp" aria-label="Chat with Raj Photography on WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
                </a>
            `;
            document.body.appendChild(floatWrap);
        }

        /* --- Before / After Slider Logic --- */
        var baSliders = document.querySelectorAll('.ba-slider');
        baSliders.forEach(function(slider) {
            var before = slider.querySelector('.ba-before');
            var handle = slider.querySelector('.ba-handle');
            var beforeImg = before ? before.querySelector('img') : null;
            var isDragging = false;

            function updateSliderPos(x) {
                var rect = slider.getBoundingClientRect();
                var pos = ((x - rect.left) / rect.width) * 100;
                if (pos < 0) pos = 0;
                if (pos > 100) pos = 100;
                if (before) before.style.width = pos + '%';
                if (handle) handle.style.left = pos + '%';
                if (beforeImg) beforeImg.style.width = rect.width + 'px';
            }

            function syncImageWidth() {
                var rect = slider.getBoundingClientRect();
                if (beforeImg) beforeImg.style.width = rect.width + 'px';
            }
            window.addEventListener('resize', syncImageWidth);
            syncImageWidth();

            slider.addEventListener('mousedown', function(e) {
                isDragging = true;
                updateSliderPos(e.clientX);
            });
            window.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                updateSliderPos(e.clientX);
            });
            window.addEventListener('mouseup', function() { isDragging = false; });

            slider.addEventListener('touchstart', function(e) {
                isDragging = true;
                if (e.touches[0]) updateSliderPos(e.touches[0].clientX);
            });
            window.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                if (e.touches[0]) updateSliderPos(e.touches[0].clientX);
            });
            window.addEventListener('touchend', function() { isDragging = false; });
        });

        /* --- Quick Availability Inquiry Form --- */
        var inquiryForm = document.getElementById('quickInquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                var eventType = document.getElementById('inquiryEvent').value;
                var location = document.getElementById('inquiryLocation').value;
                var date = document.getElementById('inquiryDate').value;

                var text = "Hi Raj! I'd like to check your availability for a " + eventType + " on " + (date || "upcoming date") + " in " + location + ". Can you please share details?";
                var url = "https://wa.me/917676147560?text=" + encodeURIComponent(text);
                window.open(url, '_blank');
            });
        }

        /* --- Client FAQ Accordion Toggle --- */
        var faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(function(item) {
            var btn = item.querySelector('.faq-question');
            if (!btn) return;
            btn.addEventListener('click', function() {
                var isActive = item.classList.contains('active');
                faqItems.forEach(function(i) { i.classList.remove('active'); });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

    });

})();
