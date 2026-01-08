// PlugIA Premium Menu JavaScript - Fixed Version

class PlugIAMenu {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupMenu());
        } else {
            this.setupMenu();
        }
    }

    setupMenu() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupLanguageSelector();
        this.setupScrollEffects();
        this.setupForms();
        this.setupSmoothScroll();
        this.setupClickOutside();
        
        console.log('PlugIA Menu initialized successfully');
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = mobileMenu.style.display === 'block';
                mobileMenu.style.display = isOpen ? 'none' : 'block';
                mobileToggle.classList.toggle('active', !isOpen);
                
                // Animate hamburger lines
                const spans = mobileToggle.querySelectorAll('span');
                if (!isOpen) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        }
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            let hoverTimeout;
            
            if (dropdownMenu) {
                // Show dropdown on hover
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    this.showDropdown(dropdownMenu);
                });
                
                // Hide dropdown on mouse leave with delay
                dropdown.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        this.hideDropdown(dropdownMenu);
                    }, 150);
                });
                
                // Keep dropdown open when hovering over it
                dropdownMenu.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                });
                
                dropdownMenu.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        this.hideDropdown(dropdownMenu);
                    }, 150);
                });
            }
        });
    }

    showDropdown(menu) {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateX(-50%) translateY(0)';
        menu.style.pointerEvents = 'auto';
    }

    hideDropdown(menu) {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateX(-50%) translateY(-8px)';
        menu.style.pointerEvents = 'none';
    }

    setupLanguageSelector() {
        const languageSelector = document.querySelector('.language-selector');
        const languageDropdown = document.querySelector('.language-dropdown');
        
        if (languageSelector && languageDropdown) {
            let hoverTimeout;
            
            languageSelector.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                languageDropdown.style.opacity = '1';
                languageDropdown.style.visibility = 'visible';
                languageDropdown.style.transform = 'translateY(0)';
            });
            
            languageSelector.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    languageDropdown.style.opacity = '0';
                    languageDropdown.style.visibility = 'hidden';
                    languageDropdown.style.transform = 'translateY(-8px)';
                }, 150);
            });
            
            // Handle language selection
            const languageOptions = languageDropdown.querySelectorAll('.language-option');
            languageOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    const selectedLang = option.textContent.trim();
                    const langBtn = languageSelector.querySelector('.language-btn');
                    if (langBtn) {
                        langBtn.childNodes[0].textContent = selectedLang + ' ';
                    }
                    
                    // Hide dropdown
                    languageDropdown.style.opacity = '0';
                    languageDropdown.style.visibility = 'hidden';
                    languageDropdown.style.transform = 'translateY(-8px)';
                });
            });
        }
    }

    setupScrollEffects() {
        const header = document.querySelector('.header-premium');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 20px rgba(26, 26, 46, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 1px 3px 0 rgba(26, 26, 46, 0.1), 0 1px 2px 0 rgba(26, 26, 46, 0.06)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupForms() {
        // Newsletter form
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                
                if (this.validateEmail(email)) {
                    this.showNotification('Obrigado! Você receberá nossos insights em breve.', 'success');
                    form.querySelector('input[type="email"]').value = '';
                } else {
                    this.showNotification('Por favor, insira um e-mail válido.', 'error');
                }
            });
        });
        
        // Contact forms
        const contactForms = document.querySelectorAll('.contact-form');
        contactForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showNotification('Mensagem enviada! Entraremos em contato em breve.', 'success');
                form.reset();
            });
        });
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-size: 14px;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.hideNotification(notification);
        });
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    setupSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header-premium')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            // Close mobile menu when clicking outside
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileMenu && mobileToggle) {
                if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    mobileMenu.style.display = 'none';
                    mobileToggle.classList.remove('active');
                    
                    // Reset hamburger animation
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
            
            // Close dropdowns when clicking outside
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                if (!dropdown.closest('.dropdown').contains(e.target)) {
                    this.hideDropdown(dropdown);
                }
            });
            
            // Close language dropdown when clicking outside
            const languageSelector = document.querySelector('.language-selector');
            const languageDropdown = document.querySelector('.language-dropdown');
            
            if (languageSelector && languageDropdown && !languageSelector.contains(e.target)) {
                languageDropdown.style.opacity = '0';
                languageDropdown.style.visibility = 'hidden';
                languageDropdown.style.transform = 'translateY(-8px)';
            }
        });
    }

    // Public method to reinitialize after dynamic content loading
    reinitialize() {
        this.setupMenu();
    }
}

// Header/Footer Loading System
class PlugIALoader {
    constructor() {
        this.menu = null;
    }

    async loadHeaderFooter() {
        try {
            await Promise.all([
                this.loadHeader(),
                this.loadFooter()
            ]);
            
            // Initialize menu after loading
            this.menu = new PlugIAMenu();
            
        } catch (error) {
            console.error('Error loading header/footer:', error);
        }
    }

    async loadHeader() {
        try {
            const response = await fetch('assets/header-premium.html');
            if (!response.ok) throw new Error('Header not found');
            
            const html = await response.text();
            const headerContainer = document.getElementById('header-container');
            
            if (headerContainer) {
                headerContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    async loadFooter() {
        try {
            const response = await fetch('assets/footer-premium.html');
            if (!response.ok) throw new Error('Footer not found');
            
            const html = await response.text();
            const footerContainer = document.getElementById('footer-container');
            
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // For pages in subdirectories
    async loadHeaderFooterFromPages() {
        try {
            await Promise.all([
                this.loadHeaderFromPages(),
                this.loadFooterFromPages()
            ]);
            
            // Initialize menu after loading
            this.menu = new PlugIAMenu();
            
        } catch (error) {
            console.error('Error loading header/footer from pages:', error);
        }
    }

    async loadHeaderFromPages() {
        try {
            const response = await fetch('../assets/header-premium.html');
            if (!response.ok) throw new Error('Header not found');
            
            const html = await response.text();
            const headerContainer = document.getElementById('header-container');
            
            if (headerContainer) {
                headerContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading header from pages:', error);
        }
    }

    async loadFooterFromPages() {
        try {
            const response = await fetch('../assets/footer-premium.html');
            if (!response.ok) throw new Error('Footer not found');
            
            const html = await response.text();
            const footerContainer = document.getElementById('footer-container');
            
            if (footerContainer) {
                footerContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading footer from pages:', error);
        }
    }
}

// Initialize when DOM is ready
const plugiaLoader = new PlugIALoader();

// Auto-detect if we're in root or pages directory and load accordingly
document.addEventListener('DOMContentLoaded', () => {
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    
    if (isInPagesDirectory) {
        plugiaLoader.loadHeaderFooterFromPages();
    } else {
        plugiaLoader.loadHeaderFooter();
    }
});

// Export for manual initialization if needed
window.PlugIAMenu = PlugIAMenu;
window.PlugIALoader = PlugIALoader;

// Fix navigation routing issue
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Fix routing for pages/index -> /index
    if (href === 'pages/index.html' || href === 'pages/') {
        e.preventDefault();
        window.location.href = '/';
    }
    
    // Fix relative paths for pages in subdirectories
    if (window.location.pathname.includes('/pages/') && href.startsWith('pages/')) {
        e.preventDefault();
        window.location.href = href.replace('pages/', '');
    }
});
