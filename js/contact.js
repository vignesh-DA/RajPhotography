/* ===== CONTACT FORM — Web3Forms ===== */
/*
 * Form submissions are sent via Web3Forms (https://web3forms.com).
 * FREE plan: Unlimited submissions, no backend needed.
 *
 * HOW YOUR ACCESS KEY WORKS:
 *   The hidden input[name="access_key"] in contact.html contains the key
 *   tied to ntraj767@gmail.com. Web3Forms routes every submission to
 *   that inbox — no further setup required.
 *
 *   If you ever want to change the recipient email:
 *     1. Go to https://web3forms.com  → enter the new email
 *     2. Verify it via the confirmation link
 *     3. Paste the new access key into the hidden input in contact.html
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var form        = document.getElementById('contactForm');
        var successDiv  = document.getElementById('contactSuccess');
        var sendAnother = document.getElementById('sendAnother');
        var submitBtn   = document.getElementById('submitBtn');

        if (!form) return;

        /* ── Validation helper ─────────────────────────────────────── */
        function validateField(field, errorId, message) {
            var errorEl = document.getElementById(errorId);
            if (!errorEl) return true;

            if (!field.value.trim() && field.required) {
                errorEl.textContent = message || 'This field is required.';
                field.parentElement.classList.add('form-group--error');
                return false;
            }

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

        /* ── Clear error on input ──────────────────────────────────── */
        form.querySelectorAll('input, select, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                var errorEl = this.parentElement.querySelector('.form-error');
                if (errorEl) errorEl.textContent = '';
                this.parentElement.classList.remove('form-group--error');
            });
        });

        /* ── Form submit ───────────────────────────────────────────── */
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var nameField    = document.getElementById('contactName');
            var emailField   = document.getElementById('contactEmail');
            var serviceField = document.getElementById('contactService');
            var messageField = document.getElementById('contactMessage');

            var isValid = true;
            if (!validateField(nameField,    'nameError',    'Please enter your name.'))          isValid = false;
            if (!validateField(emailField,   'emailError'))                                        isValid = false;
            if (!validateField(serviceField, 'serviceError', 'Please select an event type.'))     isValid = false;
            if (!validateField(messageField, 'messageError', 'Please tell us about your event.')) isValid = false;

            if (!isValid) {
                var firstError = form.querySelector('.form-group--error input, .form-group--error select, .form-group--error textarea');
                if (firstError) firstError.focus();
                return;
            }

            /* ── Loading state ────────────────────────────────────── */
            var btnText    = submitBtn.querySelector('.btn-text');
            var btnLoading = submitBtn.querySelector('.btn-loading');
            submitBtn.disabled = true;
            if (btnText)    btnText.hidden    = true;
            if (btnLoading) btnLoading.hidden = false;

            /* ── POST to Web3Forms ────────────────────────────────── */
            var formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method:  'POST',
                body:    formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function (response) {
                return response.json().then(function (data) {
                    if (response.ok && data.success) {
                        /* ✅ Success */
                        form.reset();
                        form.hidden = true;
                        if (successDiv) successDiv.hidden = false;
                    } else {
                        throw new Error(data.message || 'Submission failed. Please try again.');
                    }
                });
            })
            .catch(function (err) {
                /* ❌ Network / server error */
                alert(
                    'Sorry, something went wrong: ' + err.message +
                    '\n\nPlease call us directly at +91 76761 47560.'
                );
            })
            .finally(function () {
                submitBtn.disabled = false;
                if (btnText)    btnText.hidden    = false;
                if (btnLoading) btnLoading.hidden = true;
            });
        });

        /* ── Send another inquiry ──────────────────────────────────── */
        if (sendAnother) {
            sendAnother.addEventListener('click', function () {
                form.reset();
                form.hidden = false;
                if (successDiv) successDiv.hidden = true;
            });
        }
    });
})();
