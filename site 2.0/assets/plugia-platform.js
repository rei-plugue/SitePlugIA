// PlugIA Platform - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initROICalculator();
    initAnimations();
    initScrollEffects();
});

// Calculadora de ROI
function initROICalculator() {
    const revenueSlider = document.getElementById('revenue');
    const employeesSlider = document.getElementById('employees');
    const dataSourcesSlider = document.getElementById('data-sources');
    
    const revenueValue = document.getElementById('revenue-value');
    const employeesValue = document.getElementById('employees-value');
    const dataSourcesValue = document.getElementById('data-sources-value');
    
    const savingsElement = document.getElementById('savings');
    const roiElement = document.getElementById('roi');
    const paybackElement = document.getElementById('payback');
    
    if (!revenueSlider || !employeesSlider || !dataSourcesSlider) return;
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
    
    function formatNumber(value) {
        return new Intl.NumberFormat('pt-BR').format(value);
    }
    
    function calculateROI() {
        const revenue = parseInt(revenueSlider.value);
        const employees = parseInt(employeesSlider.value);
        const dataSources = parseInt(dataSourcesSlider.value);
        
        // Fórmulas baseadas em dados reais da PlugIA
        const baseEfficiency = 0.15; // 15% de eficiência base
        const revenueMultiplier = revenue / 100000000; // Normalizar por 100M
        const employeeMultiplier = employees / 1000; // Normalizar por 1000 funcionários
        const dataMultiplier = dataSources / 10; // Normalizar por 10 fontes
        
        // Cálculo de economia anual
        const annualSavings = revenue * baseEfficiency * (1 + revenueMultiplier * 0.5) * (1 + employeeMultiplier * 0.3) * (1 + dataMultiplier * 0.2);
        
        // Custo estimado da plataforma (baseado no pricing)
        const platformCost = Math.max(120000, revenue * 0.001); // Mínimo 120k ou 0.1% da receita
        
        // ROI e Payback
        const roi = ((annualSavings - platformCost) / platformCost) * 100;
        const paybackMonths = Math.ceil((platformCost / annualSavings) * 12);
        
        // Atualizar valores na tela
        revenueValue.textContent = formatCurrency(revenue);
        employeesValue.textContent = formatNumber(employees);
        dataSourcesValue.textContent = dataSources;
        
        savingsElement.textContent = formatCurrency(annualSavings);
        roiElement.textContent = Math.round(roi) + '%';
        paybackElement.textContent = paybackMonths + (paybackMonths === 1 ? ' mês' : ' meses');
        
        // Animação dos números
        animateValue(savingsElement, 0, annualSavings, 1000, formatCurrency);
        animateValue(roiElement, 0, Math.round(roi), 1000, (val) => val + '%');
    }
    
    function animateValue(element, start, end, duration, formatter) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * easeOutCubic(progress);
            element.textContent = formatter(Math.round(current));
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Event listeners
    revenueSlider.addEventListener('input', calculateROI);
    employeesSlider.addEventListener('input', calculateROI);
    dataSourcesSlider.addEventListener('input', calculateROI);
    
    // Cálculo inicial
    calculateROI();
}

// Animações de entrada
function initAnimations() {
    // Animação dos cards de problema
    const problemCards = document.querySelectorAll('.problem-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const resultCards = document.querySelectorAll('.result-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Preparar elementos para animação
    [...problemCards, ...featureCards, ...resultCards].forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animação do diagrama de integração
    const integrationPoints = document.querySelectorAll('.integration-point');
    integrationPoints.forEach((point, index) => {
        point.style.animationDelay = `${index * 0.2}s`;
    });
}

// Efeitos de scroll
function initScrollEffects() {
    // Parallax suave no hero
    const hero = document.querySelector('.platform-hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Contador animado nas métricas
    const metrics = document.querySelectorAll('.metric-number');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });
}

// Animação de contador
function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    const hasH = text.includes('h');
    
    let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
    
    if (isNaN(targetValue)) return;
    
    let currentValue = 0;
    const increment = targetValue / 60; // 60 frames para 1 segundo
    
    function updateCounter() {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
        }
        
        let displayValue = Math.floor(currentValue);
        
        if (hasPercent) {
            element.textContent = displayValue + '%';
        } else if (hasX) {
            element.textContent = displayValue + 'x';
        } else if (hasH) {
            element.textContent = displayValue + 'h';
        } else {
            element.textContent = displayValue;
        }
        
        if (currentValue < targetValue) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Otimização de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos event listeners de scroll
const debouncedScrollHandler = debounce(() => {
    // Handlers de scroll otimizados
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        'https://plugia.com.br/img/logo_plugia_250_65_normal.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Executar preload
preloadCriticalResources();

// Analytics e tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Implementar tracking analytics aqui
    console.log('Event tracked:', eventName, properties);
}

// Tracking de interações importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary-large, .btn-secondary-large')) {
        trackEvent('CTA_Click', {
            button_text: e.target.textContent.trim(),
            page: 'plugia-platform'
        });
    }
});

// Tracking de scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', debounce(() => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
        maxScrollDepth = scrollDepth;
        trackEvent('Scroll_Depth', {
            depth: scrollDepth,
            page: 'plugia-platform'
        });
    }
}, 1000));

// Service Worker para cache (se disponível)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
