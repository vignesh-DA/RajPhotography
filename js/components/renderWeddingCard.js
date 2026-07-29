/* ===== RENDER WEDDING / PORTFOLIO STORY CARD ===== */
(function() {
    'use strict';

    /**
     * Renders a single wedding/portfolio story section as an editorial layout.
     * @param {Object} story - Story data object from weddings.js
     * @param {number} index - Index for alternating layout direction
     * @returns {string} HTML string
     */
    function renderWeddingCard(story, index) {
        var isReversed = index % 2 !== 0;
        var directionClass = isReversed ? 'story--reversed' : '';
        var delayBase = 100;

        /* Build detail images (first 4 after cover) */
        var detailImages = story.images.slice(1, 5);
        var detailHTML = detailImages.map(function(img, i) {
            return '<div class="story__detail-item" data-story="' + story.id + '" data-index="' + (i + 1) + '">' +
                   '  <img src="' + img + '" alt="' + story.coupleNames + ' — ' + story.serviceType + ' photo ' + (i + 2) + '" loading="lazy">' +
                   '</div>';
        }).join('');

        return '<article class="story ' + directionClass + ' reveal" data-reveal="fade-up" data-service-type="' + story.serviceType + '" id="story-' + story.id + '">' +
               '  <div class="story__hero" data-story="' + story.id + '" data-index="0">' +
               '    <img src="' + story.coverImage + '" alt="' + story.coupleNames + ' — ' + story.serviceType + ' cover photo by Raj Photography" loading="lazy">' +
               '    <div class="story__hero-overlay">' +
               '      <span class="story__tag">' + story.serviceType + '</span>' +
               '    </div>' +
               '  </div>' +
               '  <div class="story__info">' +
               '    <h3 class="story__couple">' + story.coupleNames + '</h3>' +
               '    <div class="story__meta">' +
               '      <span class="story__location">' +
               '        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>' +
               '        ' + story.location +
               '      </span>' +
               '      <span class="story__date">' + story.date + '</span>' +
               '    </div>' +
               (story.quote ? '    <blockquote class="story__quote">"' + story.quote + '"</blockquote>' : '') +
               '  </div>' +
               '  <div class="story__details">' +
               detailHTML +
               '  </div>' +
               '</article>';
    }

    window.renderWeddingCard = renderWeddingCard;

})();
