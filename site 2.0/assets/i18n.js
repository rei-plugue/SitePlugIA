// ===== PLUGIA I18N SYSTEM =====

(function(window) {
    'use strict';

    let translations = {};
    let currentLanguage = 'pt-br';

    async function loadTranslations(lang) {
        if (translations[lang]) {
            return;
        }
        try {
            const response = await fetch(`/translations/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Translation file not found: ${lang}.json`);
            }
            translations[lang] = await response.json();
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            if (lang !== 'pt-br') {
                await loadTranslations('pt-br'); // Fallback
            }
        }
    }

    function getTranslation(key) {
        const lang = currentLanguage;
        const fallbackLang = 'pt-br';
        
        const findKey = (source, keyParts) => {
            let result = source;
            for (const part of keyParts) {
                if (result === undefined || result === null) return undefined;
                result = result[part];
            }
            return result;
        };

        const keyParts = key.split('.');
        let translation = findKey(translations[lang], keyParts);

        if (translation === undefined && lang !== fallbackLang) {
            translation = findKey(translations[fallbackLang], keyParts);
        }

        return translation === undefined ? key : translation;
    }

    function translatePage() {
        document.documentElement.lang = currentLanguage.startsWith('en') ? 'en-US' : 'pt-BR';
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);

            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else if (element.hasAttribute('content')) {
                element.setAttribute('content', translation);
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else {
                element.innerHTML = translation;
            }
        });
    }

    function changeLanguage(newLang) {
        if (newLang === currentLanguage) return;

        localStorage.setItem('plugia-language', newLang);

        const currentPath = window.location.pathname;
        let newPath;

        if (newLang === 'en-us') {
            newPath = currentPath.startsWith('/en/') ? currentPath : '/en' + (currentPath.startsWith('/') ? '' : '/') + currentPath.replace(/^\/|\/$/g, '');
        } else { // pt-br
            newPath = currentPath.startsWith('/en/') ? currentPath.substring(3) : currentPath;
        }

        if (newPath === '' || newPath === '/en') {
            newPath = newLang === 'en-us' ? '/en/' : '/';
        }

        window.location.href = newPath || '/';
    }

    function setupLanguageSelector() {
        const languageToggle = document.getElementById('language-toggle');
        if (!languageToggle) return;

        const languageDropdown = languageToggle.nextElementSibling;
        const languageOptions = languageDropdown.querySelectorAll('.language-option');
        const flagIcon = languageToggle.querySelector('.flag-icon');
        const languageText = languageToggle.querySelector('.language-text');

        // Set initial state
        if (currentLanguage === 'en-us') {
            flagIcon.textContent = '🇺🇸';
            languageText.textContent = 'EN';
        } else {
            flagIcon.textContent = '🇧🇷';
            languageText.textContent = 'PT';
        }
        languageOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLanguage);
        });

        // Event Listeners
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault();
            languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target)) {
                languageDropdown.style.display = 'none';
            }
        });

        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = option.getAttribute('data-lang');
                changeLanguage(newLang);
            });
        });
    }

    async function init() {
        const path = window.location.pathname;
        let lang = 'pt-br';
        if (path.startsWith('/en/')) {
            lang = 'en-us';
        } else {
            const savedLang = localStorage.getItem('plugia-language');
            if (savedLang) {
                lang = savedLang;
            }
        }
        currentLanguage = lang;

        await loadTranslations(currentLanguage);
        translatePage();
        setupLanguageSelector();
        
        // Dispatch event after initialization
        document.dispatchEvent(new CustomEvent('i18n:loaded', { detail: { language: currentLanguage } }));
    }

    // Expose to global window object
    window.i18n = {
        init: init,
        t: getTranslation,
        getLanguage: () => currentLanguage,
        changeLanguage: changeLanguage
    };

})(window);

document.addEventListener('DOMContentLoaded', () => {
    window.i18n.init();
});


