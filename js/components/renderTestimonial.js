/* ===== RENDER TESTIMONIAL CARD ===== */
(function() {
    'use strict';

    /**
     * Renders a single testimonial card.
     * @param {Object} testimonial - Testimonial data object
     * @param {number} index - Index for staggered animation delay
     * @returns {string} HTML string
     */
    function renderTestimonial(testimonial, index) {
        var delay = (index % 3) * 100;
        var stars = '';

        for (var i = 0; i < (testimonial.rating || 5); i++) {
            stars += '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
        }

        return '<div class="testimonial-card reveal" data-reveal="fade-up" data-delay="' + delay + '">' +
               '  <div class="testimonial-card__stars">' + stars + '</div>' +
               '  <blockquote class="testimonial-card__quote">"' + testimonial.quote + '"</blockquote>' +
               '  <div class="testimonial-card__footer">' +
               '    <div class="testimonial-card__avatar">' + getInitials(testimonial.name) + '</div>' +
               '    <div class="testimonial-card__info">' +
               '      <span class="testimonial-card__name">' + testimonial.name + '</span>' +
               '      <span class="testimonial-card__meta">' + testimonial.serviceType + ' · ' + testimonial.location + '</span>' +
               '    </div>' +
               '  </div>' +
               '</div>';
    }

    function getInitials(name) {
        var parts = name.replace(/&/g, '').split(/\s+/).filter(function(w) { return w.length > 0; });
        if (parts.length >= 2) {
            return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
        }
        return parts[0] ? parts[0].charAt(0).toUpperCase() : '?';
    }

    window.renderTestimonial = renderTestimonial;

})();
