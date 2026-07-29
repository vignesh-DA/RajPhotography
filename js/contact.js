/* ===== CONTACT FORM ===== */
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        var form = document.getElementById('contactForm');
        var successDiv = document.getElementById('contactSuccess');
        var sendAnother = document.getElementById('sendAnother');
        var submitBtn = document.getElementById('submitBtn');

        if (!form) return;

        /* --- Validation rules --- */
        function validateField(field, errorId, message) {
            var errorEl = document.getElementById(errorId);
            if (!errorEl) return true;

            if (!field.value.trim() && field.required) {
                errorEl.textContent = message || 'This field is required.';
                field.classList.add('form-group--error');
                return false;
            }

            /* Email validation */
            if (field.type === 'email' && field.value.trim()) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    errorEl.textContent = 'Please enter a valid email address.';
                    field.classList.add('form-group--error');
                    return false;
                }
            }

            errorEl.textContent = '';
            field.classList.remove('form-group--error');
            return true;
        }

        /* --- Clear error on input --- */
        form.querySelectorAll('input, select, textarea').forEach(function(field) {
            field.addEventListener('input', function() {
                var errorEl = this.parentElement.querySelector('.form-error');
                if (errorEl) errorEl.textContent = '';
                this.classList.remove('form-group--error');
            });
        });

        /* --- Form submit --- */
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var name = document.getElementById('contactName');
            var email = document.getElementById('contactEmail');
            var service = document.getElementById('contactService');
            var message = document.getElementById('contactMessage');

            var isValid = true;

            if (!validateField(name, 'nameError', 'Please enter your name.')) isValid = false;
            if (!validateField(email, 'emailError')) isValid = false;
            if (!validateField(service, 'serviceError', 'Please select an event type.')) isValid = false;
            if (!validateField(message, 'messageError', 'Please tell us about your event.')) isValid = false;

            if (!isValid) {
                /* Focus first invalid field */
                var firstError = form.querySelector('.form-group--error');
                if (firstError) firstError.focus();
                return;
            }

            /* Simulate form submission */
            var btnText = submitBtn.querySelector('.btn-text');
            var btnLoading = submitBtn.querySelector('.btn-loading');

            submitBtn.disabled = true;
            if (btnText) btnText.hidden = true;
            if (btnLoading) btnLoading.hidden = false;

            setTimeout(function() {
                form.hidden = true;
                if (successDiv) successDiv.hidden = false;

                submitBtn.disabled = false;
                if (btnText) btnText.hidden = false;
                if (btnLoading) btnLoading.hidden = true;
            }, 1500);
        });

        /* --- Send another inquiry --- */
        if (sendAnother) {
            sendAnother.addEventListener('click', function() {
                form.reset();
                form.hidden = false;
                if (successDiv) successDiv.hidden = true;
            });
        }
    });

})();
