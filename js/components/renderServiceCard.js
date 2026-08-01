/* ===== RENDER SERVICE CARD ===== */
(function() {
    'use strict';

    /**
     * Renders a single service card for the services grid.
     * @param {Object} service - Service data object from services.js
     * @param {number} index - Index for staggered animation delay
     * @returns {string} HTML string
     */
    function renderServiceCard(service, index) {
        var delay = index * 100;

        return '<div class="service-card reveal" data-reveal="fade-up" data-delay="' + delay + '">' +
               '  <div class="service-card__image">' +
               '    <img src="' + service.image + '" alt="' + service.name + ' photography by Raj Photography" loading="lazy">' +
               '  </div>' +
               '  <div class="service-card__content">' +
               '    <h3 class="service-card__name">' + service.name + '</h3>' +
               '    <p class="service-card__desc">' + service.shortDescription + '</p>' +
               '    <a href="#packages" class="service-card__link">View Packages →</a>' +
               '  </div>' +
               '</div>';
    }

    /**
     * Renders a package tier card for a given service.
     * @param {Object} service - Parent service object
     * @param {Object} pkg - Package tier object
     * @param {number} index - Index for staggered delay
     * @returns {string} HTML string
     */
    function renderPackageTier(service, pkg, index) {
        var delay = index * 100;
        var isPremium = pkg.name === 'Premium';
        var badgeHTML = isPremium ? '<span class="package-card__badge">Most Popular</span>' : '';

        var inclusionsHTML = pkg.inclusions.map(function(item) {
            return '<li>' + item + '</li>';
        }).join('');

        return '<div class="package-card ' + (isPremium ? 'package-card--featured' : '') + ' reveal" data-reveal="fade-up" data-delay="' + delay + '">' +
               badgeHTML +
               '  <div class="package-card__header">' +
               '    <h3 class="package-card__tier">' + pkg.name + '</h3>' +
               '    <p class="package-card__service">' + service.name + '</p>' +
               '  </div>' +
               '  <div class="package-card__pricing">' +
               '    <span class="package-card__price">' + pkg.price + '</span>' +
               '    <span class="package-card__duration">' + pkg.duration + '</span>' +
               '  </div>' +
               '  <ul class="package-card__inclusions">' +
               inclusionsHTML +
               '  </ul>' +
               '  <a href="contact.html" class="btn ' + (isPremium ? 'btn-primary' : 'btn-outline') + ' package-card__cta">Book This Package</a>' +
               '</div>';
    }

    window.renderServiceCard = renderServiceCard;
    window.renderPackageTier = renderPackageTier;

})();
