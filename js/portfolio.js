/* ===== PORTFOLIO PAGE ===== */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var container = document.querySelector('#portfolioStories .container');
        var filterTabs = document.getElementById('filterTabs');

        if (!container || !window.weddingsData || !window.renderWeddingCard) return;

        /* --- Render all stories --- */
        function renderStories(filter) {
            var stories = window.weddingsData;

            if (filter && filter !== 'all') {
                stories = stories.filter(function(s) {
                    return s.serviceType === filter;
                });
            }

            if (stories.length === 0) {
                container.innerHTML = '<div class="portfolio-empty"><p>No stories found for this category yet. Stay tuned!</p></div>';
                return;
            }

            container.innerHTML = stories.map(function(story, i) {
                return window.renderWeddingCard(story, i);
            }).join('');

            /* Re-init scroll reveal for new elements */
            if (window.initScrollReveal) window.initScrollReveal();

            /* Attach lightbox listeners to new images */
            initImageClick();
        }

        /* --- Filter tabs --- */
        if (filterTabs) {
            filterTabs.addEventListener('click', function(e) {
                var tab = e.target.closest('.portfolio-filters__tab');
                if (!tab) return;

                /* Update active state */
                filterTabs.querySelectorAll('.portfolio-filters__tab').forEach(function(t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');

                var filter = tab.getAttribute('data-filter');
                renderStories(filter);
            });
        }

        /* --- Lightbox --- */
        var lightbox = document.getElementById('lightbox');
        var lightboxImage = document.getElementById('lightboxImage');
        var lightboxCounter = document.getElementById('lightboxCounter');
        var lightboxClose = document.getElementById('lightboxClose');
        var lightboxPrev = document.getElementById('lightboxPrev');
        var lightboxNext = document.getElementById('lightboxNext');

        var currentImages = [];
        var currentIndex = 0;

        function openLightbox(storyId, imgIndex) {
            var story = window.weddingsData.find(function(s) { return s.id === storyId; });
            if (!story) return;

            currentImages = story.images;
            currentIndex = parseInt(imgIndex, 10) || 0;

            updateLightboxImage();
            lightbox.hidden = false;
            document.body.classList.add('no-scroll');
        }

        function closeLightbox() {
            lightbox.hidden = true;
            document.body.classList.remove('no-scroll');
            currentImages = [];
            currentIndex = 0;
        }

        function updateLightboxImage() {
            if (!currentImages.length) return;
            lightboxImage.src = currentImages[currentIndex];
            lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
        }

        function nextImage() {
            if (!currentImages.length) return;
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightboxImage();
        }

        function prevImage() {
            if (!currentImages.length) return;
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxImage();
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

        /* Close on backdrop click */
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
                    closeLightbox();
                }
            });
        }

        /* Keyboard navigation */
        document.addEventListener('keydown', function(e) {
            if (lightbox && !lightbox.hidden) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        });

        function initImageClick() {
            container.querySelectorAll('[data-story]').forEach(function(el) {
                el.style.cursor = 'pointer';
                el.addEventListener('click', function() {
                    var storyId = this.getAttribute('data-story');
                    var imgIndex = this.getAttribute('data-index');
                    openLightbox(storyId, imgIndex);
                });
            });
        }

        /* Initial render */
        renderStories('all');
    });

})();
