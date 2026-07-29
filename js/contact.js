/* ===== CONTACT FORM ===== */
/*
 * Form submissions are sent via Formspree (https://formspree.io).
 * FREE plan: 50 submissions/month, no backend needed.
 *
 * SETUP (one-time, takes 2 minutes):
 *   1. Go to https://formspree.io/register → create a free account
 *   2. Click "New Form" → give it a name (e.g. "Raj Photography Inquiry")
 *   3. Copy the Form Endpoint URL — it looks like:
 *        https://formspree.io/f/xyzabcde
 *   4. Paste it into the FORMSPREE_ENDPOINT constant below.
 *   5. Verify your email once — and that's it. Inquiries land in your inbox!
 */
(function() {
    'use strict';

    /* ── CHANGE THIS to your Formspree endpoint ── */
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    document.addEventListener('DOMContentLoaded', function() {
        var form       = document.getElementById('contactForm');
        var successDiv = document.getElementById('contactSuccess');
        var sendAnother = document.getElementById('sendAnother');
        var submitBtn  = document.getElementById('submitBtn');

        if (!form) return;

        /* --- Validation rules --- */
        function validateField(field, errorId, message) {
            var errorEl = document.getElementById(errorId);
            if (!errorEl) return true;

            if (!field.value.trim() && field.required) {
                errorEl.textContent = message || 'This field is required.';
                field.parentElement.classList.add('form-group--error');
                return false;
            }

            /* Email validation */
            if (field.type === 'email' && field.value.trim()) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value.trim())) {
                    errorEl.textContent = 'Please enter a valid email address.';
                    field.parentElement.classList.add('form-group--error');
                    return false;
                }
            }

            errorEl.textContent = '';
            field.parentElement.classList.remove('form-group--error');
            return true;
        }

        /* --- Clear error on input --- */
        form.querySelectorAll('input, select, textarea').forEach(function(field) {
            field.addEventListener('input', function() {
                var errorEl = this.parentElement.querySelector('.form-error');
                if (errorEl) errorEl.textContent = '';
                this.parentElement.classList.remove('form-group--error');
            });
        });

        /* --- Form submit --- */
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var name    = document.getElementById('contactName');
            var email   = document.getElementById('contactEmail');
            var service = document.getElementById('contactService');
            var message = document.getElementById('contactMessage');

            var isValid = true;
            if (!validateField(name,    'nameError',    'Please enter your name.'))       isValid = false;
            if (!validateField(email,   'emailError'))                                     isValid = false;
            if (!validateField(service, 'serviceError', 'Please select an event type.')) isValid = false;
            if (!validateField(message, 'messageError', 'Please tell us about your event.')) isValid = false;

            if (!isValid) {
                var firstError = form.querySelector('.form-group--error input, .form-group--error select, .form-group--error textarea');
                if (firstError) firstError.focus();
                return;
            }

            /* --- Show loading state --- */
            var btnText    = submitBtn.querySelector('.btn-text');
            var btnLoading = submitBtn.querySelector('.btn-loading');
            submitBtn.disabled = true;
            if (btnText)    btnText.hidden    = true;
            if (btnLoading) btnLoading.hidden = false;

            /* --- POST to Formspree --- */
            var formData = new FormData(form);

            fetch(FORMSPREE_ENDPOINT, {
                method:  'POST',
                body:    formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function(response) {
                if (response.ok) {
                    /* ✅ Success — show thank-you message */
                    form.hidden = true;
                    if (successDiv) successDiv.hidden = false;
                } else {
                    /* Server returned an error */
                    return response.json().then(function(data) {
                        throw new Error(data.error || 'Submission failed. Please try again.');
                    });
                }
            })
            .catch(function(err) {
                /* ❌ Network error or server error */
                alert('Sorry, something went wrong: ' + err.message + '\n\nPlease call us directly at +91 76761 47560.');
            })
            .finally(function() {
                submitBtn.disabled = false;
                if (btnText)    btnText.hidden    = false;
                if (btnLoading) btnLoading.hidden = true;
            });
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
