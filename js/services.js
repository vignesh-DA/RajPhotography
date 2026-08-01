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

        /* --- Custom Package Estimator Logic --- */
        var estForm = document.getElementById('estimatorForm');
        var estCategory = document.getElementById('estCategory');
        var estDuration = document.getElementById('estDuration');
        var estPriceDisplay = document.getElementById('estPriceDisplay');
        var estBookBtn = document.getElementById('estBookBtn');

        function calculateEstimate() {
            if (!estCategory || !estDuration || !estPriceDisplay) return;

            var catOption = estCategory.options[estCategory.selectedIndex];
            var durOption = estDuration.options[estDuration.selectedIndex];

            var basePrice = parseFloat(catOption.getAttribute('data-base')) || 35000;
            var durationMult = parseFloat(durOption.getAttribute('data-mult')) || 1.0;

            var total = basePrice * durationMult;

            /* Add-ons */
            var addOnsText = [];
            var drone = document.getElementById('addOnDrone');
            var album = document.getElementById('addOnAlbum');
            var reel = document.getElementById('addOnReel');

            if (drone && drone.checked) {
                total += parseFloat(drone.getAttribute('data-price')) || 12000;
                addOnsText.push('4K Drone');
            }
            if (album && album.checked) {
                total += parseFloat(album.getAttribute('data-price')) || 15000;
                addOnsText.push('Leather Album');
            }
            if (reel && reel.checked) {
                total += parseFloat(reel.getAttribute('data-price')) || 8000;
                addOnsText.push('Teaser Reel');
            }

            var formattedPrice = '₹' + Math.round(total).toLocaleString('en-IN');
            estPriceDisplay.textContent = formattedPrice;

            if (estBookBtn) {
                var categoryName = catOption.textContent.trim();
                var durationName = durOption.textContent.trim();
                var addOnStr = addOnsText.length ? ' Add-ons: ' + addOnsText.join(', ') : '';
                var msg = encodeURIComponent("Hi Raj! I calculated a package quote on your website for " + categoryName + " (" + durationName + ")." + addOnStr + ". Estimated Total: " + formattedPrice + ". Can we discuss booking availability?");
                estBookBtn.href = "https://wa.me/917676147560?text=" + msg;
            }
        }

        if (estForm) {
            estForm.addEventListener('change', calculateEstimate);
            calculateEstimate();
        }
    });

})();
