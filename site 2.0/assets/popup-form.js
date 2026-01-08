/**
 * PlugIA Premium Popup Form System
 * Premium popup form system with optimized UX
 */

class PlugIAPopupForm {
    constructor() {
        this.overlay = null;
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createPopupHTML();
        this.bindEvents();
        this.setupTriggers();
    }

    createPopupHTML() {
        const popupHTML = `
            <div class="popup-overlay" id="popup-overlay">
                <div class="popup-modal">
                    <div class="popup-header">
                        <button class="popup-close" id="popup-close">×</button>
                        <h2 class="popup-title">Schedule a Strategic Call</h2>
                        <p class="popup-subtitle">Discover how AI can transform your results in 30 days</p>
                    </div>
                    <div class="popup-content">
                        <form class="popup-form" id="popup-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Full Name <span class="required">*</span></label>
                                    <input type="text" class="form-input" name="name" required placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Business Email <span class="required">*</span></label>
                                    <input type="email" class="form-input" name="email" required placeholder="your.email@company.com">
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">Your Job Title <span class="required">*</span></label>
                                    <select class="form-select" name="job_title" required>
                                        <option value="">Select your job title</option>
                                        <option value="CEO">CEO / President</option>
                                        <option value="CTO">CTO / Head of Technology</option>
                                        <option value="CDO">CDO / Head of Data</option>
                                        <option value="CMO">CMO / Head of Marketing</option>
                                        <option value="COO">COO / Head of Operations</option>
                                        <option value="CFO">CFO / Head of Finance</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Coordinator">Coordinator</option>
                                        <option value="Analyst">Analyst</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Company <span class="required">*</span></label>
                                    <input type="text" class="form-input" name="company" required placeholder="Your company's name">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Company Revenue (Annual USD)</label>
                                <select class="form-select" name="revenue">
                                    <option value="">Select annual revenue</option>
                                    <option value="under-1m">Under $1 Million</option>
                                    <option value="1m-10m">$1M - $10M</option>
                                    <option value="10m-50m">$10M - $50M</option>
                                    <option value="50m-100m">$50M - $100M</option>
                                    <option value="100m-500m">$100M - $500M</option>
                                    <option value="500m-1b">$500M - $1 Billion</option>
                                    <option value="over-1b">Over $1 Billion</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Describe your main challenge with data or AI</label>
                                <textarea class="form-textarea" name="challenge" placeholder="e.g., We have fragmented data across multiple systems and need actionable insights to increase sales..."></textarea>
                            </div>
                            
                            <button type="submit" class="form-submit">
                                Schedule Strategic Call
                            </button>
                        </form>
                        
                        <div class="contact-info">
                            <h3 class="contact-title">PlugIA is not just another platform.</h3>
                            <p class="contact-subtitle">It's what makes AI actually work.</p>
                            
                            <div class="contact-grid">
                                <div class="contact-item">
                                    <div class="contact-icon email">📧</div>
                                    <div class="contact-details">
                                        <div class="contact-label">Email</div>
                                        <div class="contact-value">
                                            <a href="mailto:sales@plugia.com.br">sales@plugia.com.br</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon phone">📞</div>
                                    <div class="contact-details">
                                        <div class="contact-label">Phone</div>
                                        <div class="contact-value">
                                            <a href="tel:+5531350035999">+55 (31) 3500-3599</a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon location">📍</div>
                                    <div class="contact-details">
                                        <div class="contact-label">Head Office</div>
                                        <div class="contact-value">
                                            Rua da Paisagem, 220 1º Andar<br>
                                            Sala 11<br>
                                            Nova Lima, MG - CEP 34000-000
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-icon platform">🌐</div>
                                    <div class="contact-details">
                                        <div class="contact-label">Platform</div>
                                        <div class="contact-value">
                                            <a href="https://app.plugia.com.br" target="_blank">app.plugia.com.br</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.overlay = document.getElementById('popup-overlay');
        this.modal = this.overlay.querySelector('.popup-modal');
    }

    bindEvents() {
        // Close button
        const closeBtn = document.getElementById('popup-close');
        closeBtn.addEventListener('click', () => this.close());

        // Overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Form submission
        const form = document.getElementById('popup-form');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Prevent modal close on modal click
        this.modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    setupTriggers() {
        // Convert existing buttons to popup triggers
        const triggers = document.querySelectorAll('.btn-primary, .btn-popup-trigger, [data-popup-trigger]');
        
        triggers.forEach(trigger => {
            // Skip if already has click handler
            if (trigger.hasAttribute('data-popup-bound')) return;
            
            trigger.setAttribute('data-popup-bound', 'true');
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.open();
            });
        });

        // Add trigger to CTA buttons
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a[href="#contact"], .btn-primary, .cta-button');
            if (target && !target.hasAttribute('data-popup-bound')) {
                e.preventDefault();
                this.open();
            }
        });
    }

    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        this.overlay.classList.add('active');
        
        // Focus first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('.form-input');
            if (firstInput) firstInput.focus();
        }, 300);

        // Analytics
        this.trackEvent('popup_opened');
    }

    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        document.body.style.overflow = '';
        this.overlay.classList.remove('active');

        // Analytics
        this.trackEvent('popup_closed');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.form-submit');
        const formData = new FormData(form);
        
        // Validation
        if (!this.validateForm(form)) {
            return;
        }

        // Loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending...';

        try {
            // Simulate API call
            await this.submitForm(formData);
            
            // Success
            this.showSuccess();
            this.trackEvent('form_submitted', {
                job_title: formData.get('job_title'),
                revenue: formData.get('revenue')
            });
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error submitting the form. Please try again or contact us directly.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Schedule Strategic Call';
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '#e5e7eb';
            }
        });

        // Email validation
        const emailField = form.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ef4444';
            isValid = false;
        }

        return isValid;
    }

    async submitForm(formData) {
        // Convert FormData to object
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add timestamp and source
        data.timestamp = new Date().toISOString();
        data.source = 'website_popup';
        data.page = window.location.pathname;

        // Simulate API call (replace with actual endpoint)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Form data:', data);
                
                // Here you would send to your actual API
                // fetch('/api/leads', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(data)
                // });
                
                resolve(data);
            }, 2000);
        });
    }

    showSuccess() {
        const content = this.modal.querySelector('.popup-content');
        content.innerHTML = `
            <div class="form-success">
                <div class="success-icon">✓</div>
                <h3 class="success-title">Thank you for your interest!</h3>
                <p class="success-message">
                    We have received your request and will be in touch within 24 hours to schedule your strategic call.
                </p>
                <p class="success-message">
                    In the meantime, why not explore some of our success stories?
                </p>
                <div style="margin-top: 2rem;">
                    <a href="/cases" class="btn-popup-trigger" style="margin-right: 1rem;">View Success Stories</a>
                    <button class="btn-popup-trigger" onclick="plugiaPopup.close()" style="background: #6b7280;">Close</button>
                </div>
            </div>
        `;

        // Auto close after 10 seconds
        setTimeout(() => {
            this.close();
        }, 10000);
    }

    trackEvent(eventName, data = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'popup_form',
                ...data
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', data);
        }

        console.log('Event tracked:', eventName, data);
    }
}

// Initialize popup system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.plugiaPopup = new PlugIAPopupForm();
});

// Global function for manual triggering
window.openPlugIAPopup = function() {
    if (window.plugiaPopup) {
        window.plugiaPopup.open();
    }
};