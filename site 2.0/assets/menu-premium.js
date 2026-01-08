// PlugIA Premium Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Dropdown Menus
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', function() {
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
        
        // Hide dropdown on mouse leave
        dropdown.addEventListener('mouseleave', function() {
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateX(-50%) translateY(-8px)';
            }
        });
    });
    
    // Language Selector
    const languageSelector = document.querySelector('.language-selector');
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageSelector && languageBtn && languageDropdown) {
        languageSelector.addEventListener('mouseenter', function() {
            languageDropdown.style.opacity = '1';
            languageDropdown.style.visibility = 'visible';
            languageDropdown.style.transform = 'translateY(0)';
        });
        
        languageSelector.addEventListener('mouseleave', function() {
            languageDropdown.style.opacity = '0';
            languageDropdown.style.visibility = 'hidden';
            languageDropdown.style.transform = 'translateY(-8px)';
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado! Você receberá nossos insights em breve.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileToggle) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.style.display = 'none';
                mobileToggle.classList.remove('active');
            }
        }
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header-premium');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
            }
        });
    }
});

// Load Header and Footer Function
function loadHeaderFooter() {
    // Load Header
    fetch('assets/header-premium.html')
        .then(response => response.text())
        .then(html => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = html;
                // Reinitialize menu functionality after loading
                initializeMenus();
            }
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load Footer
    fetch('assets/footer-premium.html')
        .then(response => response.text())
        .then(html => {
            const footerContainer = document.getElementById('footer-container');
            if (footerContainer) {
                footerContainer.innerHTML = html;
                // Reinitialize footer functionality after loading
                initializeFooter();
            }
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize menus after dynamic loading
function initializeMenus() {
    // Re-run menu initialization code
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

// Initialize footer after dynamic loading
function initializeFooter() {
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado! Você receberá nossos insights em breve.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadHeaderFooter };
}
