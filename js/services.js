/* ===== SERVICES PAGE ===== */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var serviceCardsContainer = document.getElementById('serviceCards');
        var packageTiersContainer = document.getElementById('packageTiers');

        if (!window.servicesData) return;

        /* --- Render service cards --- */
        if (serviceCardsContainer && window.renderServiceCard) {
            serviceCardsContainer.innerHTML = window.servicesData.map(function(service, i) {
                return window.renderServiceCard(service, i);
            }).join('');
        }

        /* --- Render package tiers --- */
        if (packageTiersContainer && window.renderPackageTier) {
            /* Default: show first service's packages, or create a selector */
            var allPackagesHTML = '';
            var tierIndex = 0;

            window.servicesData.forEach(function(service) {
                allPackagesHTML += '<div class="packages__service-section reveal" data-reveal="fade-up">' +
                                  '  <h3 class="packages__service-name">' + service.name + '</h3>' +
                                  '  <div class="packages__tier-row">';

                service.packages.forEach(function(pkg) {
                    allPackagesHTML += window.renderPackageTier(service, pkg, tierIndex);
                    tierIndex++;
                });

                allPackagesHTML += '  </div></div>';
            });

            packageTiersContainer.innerHTML = allPackagesHTML;
        }

        /* Re-init scroll reveal for dynamically added content */
        if (window.initScrollReveal) window.initScrollReveal();
    });

})();
