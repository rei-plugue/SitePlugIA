// Fênix IA - JavaScript Interativo

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initAssessmentTool();
    initAnimations();
    initScrollEffects();
});

// Ferramenta de Avaliação de Projetos
function initAssessmentTool() {
    const investmentSlider = document.getElementById('investment');
    const timelineSlider = document.getElementById('timeline');
    const accuracySlider = document.getElementById('accuracy');
    
    const investmentValue = document.getElementById('investment-value');
    const timelineValue = document.getElementById('timeline-value');
    const accuracyValue = document.getElementById('accuracy-value');
    
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const calculateBtn = document.getElementById('calculate');
    
    const formSteps = document.querySelectorAll('.form-step');
    const resultsSection = document.getElementById('assessment-results');
    
    let currentStep = 1;
    
    if (!investmentSlider || !timelineSlider || !accuracySlider) return;
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }
    
    function updateSliderValues() {
        const investment = parseInt(investmentSlider.value);
        const timeline = parseInt(timelineSlider.value);
        const accuracy = parseInt(accuracySlider.value);
        
        investmentValue.textContent = formatCurrency(investment);
        timelineValue.textContent = timeline + (timeline === 1 ? ' mês' : ' meses');
        accuracyValue.textContent = accuracy + '%';
    }
    
    function showStep(step) {
        formSteps.forEach((stepEl, index) => {
            stepEl.classList.toggle('active', index + 1 === step);
        });
        
        prevBtn.style.display = step === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = step === 2 ? 'none' : 'inline-block';
        calculateBtn.style.display = step === 2 ? 'inline-block' : 'none';
        
        currentStep = step;
    }
    
    function calculateRecoveryPotential() {
        const investment = parseInt(investmentSlider.value);
        const timeline = parseInt(timelineSlider.value);
        const accuracy = parseInt(accuracySlider.value);
        const projectType = document.querySelector('input[name="project-type"]:checked')?.value || 'recommendation';
        
        // Algoritmo de cálculo baseado em dados reais da PlugIA
        let baseScore = 60; // Score base de recuperação
        
        // Fatores que aumentam a chance de sucesso
        if (investment >= 1000000) baseScore += 15; // Projetos maiores têm mais dados
        if (timeline >= 6) baseScore += 10; // Mais tempo = mais aprendizado
        if (accuracy <= 50) baseScore += 20; // Muito espaço para melhoria
        
        // Ajustes por tipo de projeto
        const typeMultipliers = {
            'recommendation': 1.1,
            'fraud': 1.2,
            'prediction': 1.0,
            'nlp': 0.9
        };
        
        const recoveryScore = Math.min(95, Math.round(baseScore * typeMultipliers[projectType]));
        
        // Cálculos de métricas
        const expectedAccuracy = Math.min(95, Math.max(85, 93 - (accuracy * 0.1)));
        const projectedROI = Math.round(200 + (investment / 10000) + (100 - accuracy) * 3);
        const recoveryWeeks = Math.max(4, Math.min(12, 8 - (recoveryScore - 60) / 10));
        const additionalInvestment = Math.round(investment * 0.15);
        
        // Atualizar interface
        document.getElementById('recovery-score').textContent = recoveryScore + '%';
        document.getElementById('expected-accuracy').textContent = expectedAccuracy + '%';
        document.getElementById('projected-roi').textContent = projectedROI + '%';
        document.getElementById('recovery-time').textContent = Math.floor(recoveryWeeks) + '-' + Math.ceil(recoveryWeeks + 2) + ' semanas';
        document.getElementById('additional-investment').textContent = formatCurrency(additionalInvestment);
        
        // Atualizar círculo de score
        const scoreCircle = document.querySelector('.score-circle');
        const percentage = recoveryScore;
        const degrees = (percentage / 100) * 360;
        scoreCircle.style.background = `conic-gradient(#e74c3c 0deg ${degrees}deg, rgba(255,255,255,0.2) ${degrees}deg 360deg)`;
        
        // Mostrar resultados
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Animar números
        animateCountUp(document.getElementById('recovery-score'), 0, recoveryScore, '%');
        animateCountUp(document.getElementById('expected-accuracy'), 0, expectedAccuracy, '%');
        animateCountUp(document.getElementById('projected-roi'), 0, projectedROI, '%');
    }
    
    function animateCountUp(element, start, end, suffix = '') {
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.round(start + (end - start) * easeOutCubic(progress));
            element.textContent = current + suffix;
            
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
    investmentSlider.addEventListener('input', updateSliderValues);
    timelineSlider.addEventListener('input', updateSliderValues);
    accuracySlider.addEventListener('input', updateSliderValues);
    
    nextBtn.addEventListener('click', () => {
        if (currentStep < 2) {
            showStep(currentStep + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });
    
    calculateBtn.addEventListener('click', () => {
        const selectedType = document.querySelector('input[name="project-type"]:checked');
        if (!selectedType) {
            alert('Por favor, selecione o tipo de projeto.');
            return;
        }
        calculateRecoveryPotential();
    });
    
    // Inicialização
    updateSliderValues();
    showStep(1);
}

// Animações de entrada
function initAnimations() {
    // Animação dos cards de problema
    const problemCards = document.querySelectorAll('.problem-card');
    const storyCards = document.querySelectorAll('.story-card');
    
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
    [...problemCards, ...storyCards].forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animação da timeline de processo
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });
        
        stepObserver.observe(step);
    });
    
    // Animação das barras de progresso no diagnóstico
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Efeitos de scroll
function initScrollEffects() {
    // Parallax suave no hero
    const hero = document.querySelector('.fenix-hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Contador animado nas estatísticas
    const stats = document.querySelectorAll('.stat-number, .problem-stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Animação das métricas de performance
    const metricCards = document.querySelectorAll('.metric-card .metric-number');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricCards.forEach(metric => {
        metricsObserver.observe(metric);
    });
}

// Animação de contador
function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    const hasCurrency = text.includes('R$');
    const hasM = text.includes('M');
    
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
        
        if (hasCurrency && hasM) {
            element.textContent = 'R$ ' + displayValue + 'M';
        } else if (hasCurrency) {
            element.textContent = 'R$ ' + displayValue;
        } else if (hasPercent) {
            element.textContent = displayValue + '%';
        } else if (hasX) {
            element.textContent = displayValue + 'x';
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

// Analytics e tracking
function trackEvent(eventName, properties = {}) {
    // Implementar tracking analytics aqui
    console.log('Event tracked:', eventName, properties);
}

// Tracking de interações importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary-large, .btn-secondary-large')) {
        trackEvent('CTA_Click', {
            button_text: e.target.textContent.trim(),
            page: 'fenix-ia'
        });
    }
    
    if (e.target.matches('#calculate')) {
        const investment = document.getElementById('investment')?.value;
        const accuracy = document.getElementById('accuracy')?.value;
        const projectType = document.querySelector('input[name="project-type"]:checked')?.value;
        
        trackEvent('Assessment_Completed', {
            investment: investment,
            current_accuracy: accuracy,
            project_type: projectType,
            page: 'fenix-ia'
        });
    }
});

// Tracking de seleção de tipo de projeto
document.addEventListener('change', (e) => {
    if (e.target.matches('input[name="project-type"]')) {
        trackEvent('Project_Type_Selected', {
            project_type: e.target.value,
            page: 'fenix-ia'
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
            page: 'fenix-ia'
        });
    }
}, 1000));

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

// Funcionalidade adicional: Simulador de recuperação em tempo real
function initRecoverySimulator() {
    const simulatorBtn = document.createElement('button');
    simulatorBtn.textContent = 'Simular Recuperação';
    simulatorBtn.className = 'btn-primary';
    simulatorBtn.style.position = 'fixed';
    simulatorBtn.style.bottom = '20px';
    simulatorBtn.style.right = '20px';
    simulatorBtn.style.zIndex = '1000';
    simulatorBtn.style.display = 'none';
    
    document.body.appendChild(simulatorBtn);
    
    // Mostrar botão quando usuário rolar para baixo
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            simulatorBtn.style.display = 'block';
        } else {
            simulatorBtn.style.display = 'none';
        }
    });
    
    simulatorBtn.addEventListener('click', () => {
        const assessmentSection = document.getElementById('avaliacao');
        if (assessmentSection) {
            assessmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Inicializar simulador
initRecoverySimulator();
