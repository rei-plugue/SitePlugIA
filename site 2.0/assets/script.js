// PlugIA Ultra-Disruptive Website JavaScript
// Advanced AI Simulations and Interactive Features

class PlugIAWebsite {
    constructor() {
        this.particleSystem = null;
        this.dataVisualization = null;
        this.simulatorData = {
            revenue: 0,
            calculatedROI: 0,
            calculatedGain: 0,
            paybackMonths: 0
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParticleSystem();
        this.initDataVisualization();
        this.initScrollAnimations();
        this.initNavigation();
        this.initSimulator();
        this.initFormHandlers();
        this.initAIFeatures();
    }

    setupEventListeners() {
        // DOM Content Loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Window events
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('scroll', () => this.onScroll());
    }

    onDOMReady() {
        console.log('PlugIA Website initialized');
        this.animateOnLoad();
    }

    onResize() {
        if (this.particleSystem) {
            this.particleSystem.resize();
        }
        if (this.dataVisualization) {
            this.dataVisualization.resize();
        }
    }

    onScroll() {
        this.updateNavigation();
        this.animateOnScroll();
    }

    // Particle System for Hero Background
    initParticleSystem() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;

        this.particleSystem = {
            canvas,
            ctx,
            particles,
            
            resize() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            },

            createParticle() {
                return {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.5 ? '#FF007A' : '#007BFF'
                };
            },

            init() {
                this.resize();
                for (let i = 0; i < particleCount; i++) {
                    particles.push(this.createParticle());
                }
                this.animate();
            },

            animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach((particle, index) => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                    ctx.fill();
                    
                    // Draw connections
                    particles.slice(index + 1).forEach(otherParticle => {
                        const dx = particle.x - otherParticle.x;
                        const dy = particle.y - otherParticle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(otherParticle.x, otherParticle.y);
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                            ctx.stroke();
                        }
                    });
                });
                
                requestAnimationFrame(() => this.animate());
            }
        };

        this.particleSystem.init();
    }

    // Data Visualization for Solution Section
    initDataVisualization() {
        const container = document.getElementById('dataVisualization');
        if (!container) return;

        this.dataVisualization = {
            container,
            nodes: [],
            connections: [],
            
            init() {
                this.createNodes();
                this.animate();
            },

            createNodes() {
                const nodeCount = 12;
                const centerX = 200;
                const centerY = 200;
                
                // Central PlugIA node
                this.nodes.push({
                    x: centerX,
                    y: centerY,
                    size: 30,
                    color: '#FF007A',
                    label: 'PlugIA',
                    type: 'central'
                });
                
                // Data source nodes
                const dataSources = ['ERP', 'CRM', 'WhatsApp', 'PDFs', 'APIs', 'Cloud', 'SAP', 'Excel', 'DB', 'IoT', 'Social'];
                dataSources.forEach((source, index) => {
                    const angle = (index / dataSources.length) * Math.PI * 2;
                    const radius = 120;
                    this.nodes.push({
                        x: centerX + Math.cos(angle) * radius,
                        y: centerY + Math.sin(angle) * radius,
                        size: 15,
                        color: '#007BFF',
                        label: source,
                        type: 'source',
                        angle: angle,
                        radius: radius
                    });
                });
            },

            animate() {
                container.innerHTML = '';
                
                // Create SVG
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.setAttribute('viewBox', '0 0 400 400');
                
                // Draw connections
                this.nodes.slice(1).forEach(node => {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', this.nodes[0].x);
                    line.setAttribute('y1', this.nodes[0].y);
                    line.setAttribute('x2', node.x);
                    line.setAttribute('y2', node.y);
                    line.setAttribute('stroke', '#6A1B9A');
                    line.setAttribute('stroke-width', '2');
                    line.setAttribute('opacity', '0.6');
                    
                    // Animate connection
                    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    animate.setAttribute('attributeName', 'opacity');
                    animate.setAttribute('values', '0.3;0.8;0.3');
                    animate.setAttribute('dur', '3s');
                    animate.setAttribute('repeatCount', 'indefinite');
                    line.appendChild(animate);
                    
                    svg.appendChild(line);
                });
                
                // Draw nodes
                this.nodes.forEach(node => {
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', node.x);
                    circle.setAttribute('cy', node.y);
                    circle.setAttribute('r', node.size);
                    circle.setAttribute('fill', node.color);
                    
                    if (node.type === 'central') {
                        // Pulse animation for central node
                        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                        animate.setAttribute('attributeName', 'r');
                        animate.setAttribute('values', '25;35;25');
                        animate.setAttribute('dur', '2s');
                        animate.setAttribute('repeatCount', 'indefinite');
                        circle.appendChild(animate);
                    }
                    
                    svg.appendChild(circle);
                    
                    // Add label
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', node.x);
                    text.setAttribute('y', node.y + (node.type === 'central' ? 50 : 25));
                    text.setAttribute('text-anchor', 'middle');
                    text.setAttribute('fill', '#FFFFFF');
                    text.setAttribute('font-size', node.type === 'central' ? '14' : '10');
                    text.setAttribute('font-weight', 'bold');
                    text.textContent = node.label;
                    svg.appendChild(text);
                });
                
                container.appendChild(svg);
                
                setTimeout(() => this.animate(), 5000);
            },

            resize() {
                // Responsive handling
            }
        };

        this.dataVisualization.init();
    }

    // Navigation
    initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    updateNavigation() {
        const nav = document.querySelector('.nav-container');
        const scrolled = window.scrollY > 50;
        
        if (nav) {
            nav.style.background = scrolled 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = scrolled 
                ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
                : 'none';
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ROI Simulator
    initSimulator() {
        const revenueInput = document.getElementById('revenueInput');
        if (revenueInput) {
            revenueInput.addEventListener('input', () => this.updateSimulation());
        }
    }

    updateSimulation() {
        const revenueInput = document.getElementById('revenueInput');
        const annualGain = document.getElementById('annualGain');
        const roiValue = document.getElementById('roiValue');
        const paybackValue = document.getElementById('paybackValue');

        if (!revenueInput || !annualGain || !roiValue || !paybackValue) return;

        const revenue = this.parseNumber(revenueInput.value);
        
        if (revenue > 0) {
            // PlugIA ROI calculations based on real metrics
            const efficiencyGain = 0.30; // 30% more efficient
            const costReduction = 0.25; // 25% less processing
            const revenueIncrease = 0.15; // 15% revenue increase (conservative)
            
            const annualCost = Math.min(revenue * 0.002, 150000); // 0.2% of revenue, max $150k
            const calculatedGain = (revenue * revenueIncrease) + (annualCost * costReduction);
            const roi = ((calculatedGain - annualCost) / annualCost) * 100;
            const payback = annualCost / (calculatedGain / 12);

            this.simulatorData = {
                revenue,
                calculatedROI: roi,
                calculatedGain,
                paybackMonths: payback
            };

            // Animate the updates
            this.animateValue(annualGain, 0, calculatedGain, 1000, (value) => 
                this.formatCurrency(value));
            this.animateValue(roiValue, 0, roi, 1000, (value) => 
                Math.round(value) + '%');
            this.animateValue(paybackValue, 0, payback, 1000, (value) => 
                Math.round(value) + ' meses');
        } else {
            annualGain.textContent = 'R$ 0';
            roiValue.textContent = '0%';
            paybackValue.textContent = '0 meses';
        }
    }

    parseNumber(str) {
        return parseFloat(str.replace(/[^\d.-]/g, '')) || 0;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    }

    animateValue(element, start, end, duration, formatter) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * easeOut;
            
            element.textContent = formatter ? formatter(current) : Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Modal Management
    openContactModal() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeContactModal() {
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openSimulator() {
        const modal = document.getElementById('simulatorModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.loadSimulatorContent();
        }
    }

    closeSimulator() {
        const modal = document.getElementById('simulatorModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loadSimulatorContent() {
        const content = document.getElementById('simulatorContent');
        if (!content) return;

        content.innerHTML = `
            <div class="simulator-full">
                <h3>Calculadora de ROI PlugIA</h3>
                <p>Descubra o potencial de retorno da PlugIA para sua empresa</p>
                
                <div class="simulator-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Faturamento Anual (R$)</label>
                            <input type="text" id="modalRevenueInput" placeholder="Ex: 50.000.000">
                        </div>
                        <div class="form-group">
                            <label>Número de Funcionários</label>
                            <select id="employeeCount">
                                <option value="50">10-50</option>
                                <option value="200">51-200</option>
                                <option value="500">201-500</option>
                                <option value="1000">501-1000</option>
                                <option value="2000">1000+</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Setor</label>
                            <select id="industry">
                                <option value="retail">Varejo</option>
                                <option value="manufacturing">Manufatura</option>
                                <option value="services">Serviços</option>
                                <option value="finance">Financeiro</option>
                                <option value="healthcare">Saúde</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Sistemas Atuais</label>
                            <select id="systemCount">
                                <option value="3">1-3 sistemas</option>
                                <option value="7">4-7 sistemas</option>
                                <option value="12">8-12 sistemas</option>
                                <option value="20">13+ sistemas</option>
                            </select>
                        </div>
                    </div>
                    
                    <button class="btn-primary" onclick="plugiaWebsite.calculateFullROI()">
                        Calcular ROI Detalhado
                    </button>
                </div>
                
                <div class="simulator-results" id="fullResults" style="display: none;">
                    <h4>Projeção de Resultados</h4>
                    <div class="results-grid">
                        <div class="result-item highlight">
                            <span class="result-value" id="totalROI">0%</span>
                            <span class="result-label">ROI Total</span>
                        </div>
                        <div class="result-item">
                            <span class="result-value" id="monthlyGain">R$ 0</span>
                            <span class="result-label">Ganho Mensal</span>
                        </div>
                        <div class="result-item">
                            <span class="result-value" id="yearlyGain">R$ 0</span>
                            <span class="result-label">Ganho Anual</span>
                        </div>
                        <div class="result-item">
                            <span class="result-value" id="paybackTime">0 meses</span>
                            <span class="result-label">Payback</span>
                        </div>
                    </div>
                    
                    <div class="roi-breakdown">
                        <h5>Detalhamento dos Benefícios</h5>
                        <div class="benefit-item">
                            <span>Redução de tempo em análise de dados</span>
                            <span id="timeReduction">70%</span>
                        </div>
                        <div class="benefit-item">
                            <span>Aumento na precisão das decisões</span>
                            <span id="accuracyIncrease">93%</span>
                        </div>
                        <div class="benefit-item">
                            <span>Economia em custos operacionais</span>
                            <span id="costSavings">R$ 0</span>
                        </div>
                    </div>
                    
                    <div class="cta-section">
                        <button class="btn-primary-large" onclick="plugiaWebsite.closeSimulator(); plugiaWebsite.openContactModal();">
                            Agendar Apresentação Personalizada
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listener for the modal input
        const modalInput = document.getElementById('modalRevenueInput');
        if (modalInput) {
            modalInput.addEventListener('input', () => this.calculateFullROI());
        }
    }

    calculateFullROI() {
        const revenueInput = document.getElementById('modalRevenueInput');
        const employeeCount = document.getElementById('employeeCount');
        const industry = document.getElementById('industry');
        const systemCount = document.getElementById('systemCount');
        const resultsDiv = document.getElementById('fullResults');

        if (!revenueInput || !resultsDiv) return;

        const revenue = this.parseNumber(revenueInput.value);
        if (revenue <= 0) return;

        const employees = parseInt(employeeCount?.value || 200);
        const systems = parseInt(systemCount?.value || 7);
        const sector = industry?.value || 'services';

        // Advanced ROI calculation with multiple factors
        const baseEfficiency = 0.30; // 30% base efficiency gain
        const systemComplexity = Math.min(systems / 10, 0.5); // Up to 50% bonus for complex environments
        const scaleBonus = Math.min(employees / 1000, 0.3); // Up to 30% bonus for scale
        
        const sectorMultipliers = {
            retail: 1.2,
            manufacturing: 1.1,
            finance: 1.3,
            healthcare: 1.15,
            services: 1.0,
            other: 1.0
        };

        const totalEfficiency = baseEfficiency + systemComplexity + scaleBonus;
        const sectorMultiplier = sectorMultipliers[sector] || 1.0;
        
        // Calculate costs and benefits
        const annualCost = Math.max(12000, Math.min(revenue * 0.003, 300000)); // $1k-25k monthly
        const operationalSavings = revenue * 0.02 * totalEfficiency * sectorMultiplier; // 2% of revenue base
        const revenueIncrease = revenue * 0.08 * totalEfficiency * sectorMultiplier; // 8% revenue increase
        const totalGain = operationalSavings + revenueIncrease;
        
        const roi = ((totalGain - annualCost) / annualCost) * 100;
        const monthlyGain = totalGain / 12;
        const payback = annualCost / monthlyGain;

        // Show results
        resultsDiv.style.display = 'block';
        
        // Animate results
        this.animateValue(document.getElementById('totalROI'), 0, roi, 1500, 
            value => Math.round(value) + '%');
        this.animateValue(document.getElementById('monthlyGain'), 0, monthlyGain, 1500, 
            value => this.formatCurrency(value));
        this.animateValue(document.getElementById('yearlyGain'), 0, totalGain, 1500, 
            value => this.formatCurrency(value));
        this.animateValue(document.getElementById('paybackTime'), 0, payback, 1500, 
            value => Math.round(value) + ' meses');
        
        // Update breakdown
        document.getElementById('timeReduction').textContent = Math.round(totalEfficiency * 100) + '%';
        document.getElementById('accuracyIncrease').textContent = '93%';
        this.animateValue(document.getElementById('costSavings'), 0, operationalSavings, 1500, 
            value => this.formatCurrency(value));
    }

    // Form Handlers
    initFormHandlers() {
        const contactForm = document.getElementById('contactForm');
        const modalContactForm = document.getElementById('modalContactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        if (modalContactForm) {
            modalContactForm.addEventListener('submit', (e) => this.handleModalContactForm(e));
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeContactModal();
                this.closeSimulator();
            }
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        e.target.reset();
        
        // In a real implementation, you would send this data to your backend
        console.log('Contact form data:', data);
    }

    handleModalContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        this.showNotification('Demo agendada com sucesso! Verificaremos sua agenda e confirmaremos por email.', 'success');
        this.closeContactModal();
        
        // Reset form
        e.target.reset();
        
        console.log('Modal contact form data:', data);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.problem-card, .product-card, .case-card, .feature-item, .metric-card'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    animateOnLoad() {
        // Hero content animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease-out';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }
    }

    animateOnScroll() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // AI Features Simulation
    initAIFeatures() {
        this.initChatbot();
        this.initPersonalization();
        this.initVoiceFeatures();
        this.initFAQ();
    }

    initFAQ() {
        // FAQ Accordion functionality
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
                
                // Add cursor pointer style
                question.style.cursor = 'pointer';
            }
        });
    }

    initChatWidget() {
        // Simulated AI chat widget (would integrate with real chatbot in production)
        const chatWidget = document.createElement('div');
        chatWidget.className = 'ai-chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-toggle" onclick="plugiaWebsite.toggleChat()">
                <div class="chat-icon">🤖</div>
                <div class="chat-pulse"></div>
            </div>
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <span>PlugIA Assistant</span>
                    <button onclick="plugiaWebsite.toggleChat()">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message ai-message">
                        Olá! Sou o assistente da PlugIA. Como posso ajudar você a descobrir como nossa IA pode transformar seus dados?
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Digite sua pergunta..." id="chatInput">
                    <button onclick="plugiaWebsite.sendChatMessage()">Enviar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            chatWindow.classList.toggle('active');
        }
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const messages = document.getElementById('chatMessages');
        
        if (!input || !messages || !input.value.trim()) return;
        
        const userMessage = input.value.trim();
        
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-message';
        userDiv.textContent = userMessage;
        messages.appendChild(userDiv);
        
        // Clear input
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(userMessage);
            const aiDiv = document.createElement('div');
            aiDiv.className = 'message ai-message';
            aiDiv.textContent = aiResponse;
            messages.appendChild(aiDiv);
            
            // Scroll to bottom
            messages.scrollTop = messages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const responses = {
            'preço': 'Nossos planos começam em US$ 1.000/mês e variam conforme suas necessidades. Quer agendar uma conversa para calcularmos o ROI específico para sua empresa?',
            'roi': 'Nossos clientes veem em média 30x de ROI em 4 meses. Uma gigante europeia de alimentos aumentou suas vendas em 7x com nossa solução. Quer simular o ROI para sua empresa?',
            'como funciona': 'A PlugIA conecta seus sistemas via APIs, usa IA para normalizar os dados e cria uma única fonte de verdade. Tudo sem mover seus dados do local atual.',
            'integração': 'Temos mais de 1.200 conectores e integramos com qualquer sistema: ERP, CRM, WhatsApp, PDFs, APIs. A implementação leva em média 2 semanas.',
            'demo': 'Claro! Posso agendar uma demo personalizada para você. Clique em "Agendar Demo" no topo da página ou me informe seu email que entraremos em contato.',
            'default': 'Interessante pergunta! Nossa IA processa milhões de dados para gerar insights precisos. Que tal agendar uma conversa com nossos especialistas para discutir seu caso específico?'
        };
        
        const message = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        return responses.default;
    }

    initPersonalization() {
        // Simulate personalization based on user behavior
        const userBehavior = {
            timeOnSite: 0,
            sectionsViewed: [],
            interactionCount: 0
        };
        
        // Track time on site
        setInterval(() => {
            userBehavior.timeOnSite += 1;
            
            // Show personalized CTA after 30 seconds
            if (userBehavior.timeOnSite === 30) {
                this.showPersonalizedCTA();
            }
        }, 1000);
        
        // Track section views
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (!userBehavior.sectionsViewed.includes(sectionId)) {
                        userBehavior.sectionsViewed.push(sectionId);
                    }
                }
            });
        });
        
        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    showPersonalizedCTA() {
        const cta = document.createElement('div');
        cta.className = 'personalized-cta';
        cta.innerHTML = `
            <div class="cta-content">
                <div class="cta-icon">🎯</div>
                <div class="cta-text">
                    <strong>Vejo que você está interessado na PlugIA!</strong>
                    <p>Que tal calcular o ROI específico para sua empresa?</p>
                </div>
                <div class="cta-actions">
                    <button class="btn-primary" onclick="plugiaWebsite.openSimulator(); this.parentElement.parentElement.parentElement.remove();">
                        Calcular ROI
                    </button>
                    <button class="cta-close" onclick="this.parentElement.parentElement.parentElement.remove();">
                        &times;
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(cta);
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (cta.parentElement) {
                cta.remove();
            }
        }, 10000);
    }

    initPredictiveAnalytics() {
        // Simulate predictive analytics for user journey
        const analytics = {
            conversionProbability: 0,
            engagementScore: 0,
            recommendedAction: ''
        };
        
        // Track user engagement
        document.addEventListener('click', () => {
            analytics.engagementScore += 10;
            this.updateConversionProbability(analytics);
        });
        
        document.addEventListener('scroll', () => {
            analytics.engagementScore += 1;
            this.updateConversionProbability(analytics);
        });
        
        // Track form interactions
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', () => {
                analytics.engagementScore += 20;
                this.updateConversionProbability(analytics);
            });
        });
    }

    updateConversionProbability(analytics) {
        const maxScore = 1000;
        analytics.conversionProbability = Math.min(analytics.engagementScore / maxScore, 1);
        
        // Trigger actions based on probability
        if (analytics.conversionProbability > 0.7 && !analytics.highIntentShown) {
            analytics.highIntentShown = true;
            this.showHighIntentOffer();
        }
    }

    showHighIntentOffer() {
        const offer = document.createElement('div');
        offer.className = 'high-intent-offer';
        offer.innerHTML = `
            <div class="offer-content">
                <div class="offer-badge">💼 Oportunidade Exclusiva</div>
                <h3>Você parece muito interessado!</h3>
                <p>Que tal agendar uma apresentação personalizada para sua empresa?</p>
                <div class="offer-actions">
                    <button class="btn-primary-large" onclick="plugiaWebsite.openContactModal(); this.parentElement.parentElement.parentElement.remove();">
                        Solicitar Apresentação
                    </button>
                    <button class="offer-close" onclick="this.parentElement.parentElement.parentElement.remove();">
                        Talvez depois
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(offer);
        
        setTimeout(() => {
            if (offer.parentElement) {
                offer.remove();
            }
        }, 15000);
    }
}

// Global functions for HTML onclick handlers
function openContactModal() {
    if (window.plugiaWebsite) {
        window.plugiaWebsite.openContactModal();
    }
}

function closeContactModal() {
    if (window.plugiaWebsite) {
        window.plugiaWebsite.closeContactModal();
    }
}

function openSimulator() {
    if (window.plugiaWebsite) {
        window.plugiaWebsite.openSimulator();
    }
}

function closeSimulator() {
    if (window.plugiaWebsite) {
        window.plugiaWebsite.closeSimulator();
    }
}

function updateSimulation() {
    if (window.plugiaWebsite) {
        window.plugiaWebsite.updateSimulation();
    }
}

// Initialize the website
window.plugiaWebsite = new PlugIAWebsite();

// Add CSS for dynamic elements
const dynamicStyles = `
<style>
/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10001;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.notification-success {
    border-left: 4px solid #10B981;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6B7280;
}

/* AI Chat Widget */
.ai-chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
}

.chat-toggle {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #FF007A, #FF69B4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255, 0, 122, 0.3);
    position: relative;
}

.chat-icon {
    font-size: 24px;
}

.chat-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 0, 122, 0.3);
    animation: pulse 2s infinite;
}

.chat-window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 350px;
    height: 400px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    display: none;
    flex-direction: column;
}

.chat-window.active {
    display: flex;
}

.chat-header {
    padding: 1rem;
    background: linear-gradient(135deg, #0A2540, #007BFF);
    color: white;
    border-radius: 16px 16px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.message {
    padding: 0.75rem;
    border-radius: 12px;
    max-width: 80%;
}

.user-message {
    background: #F0F4F8;
    align-self: flex-end;
}

.ai-message {
    background: linear-gradient(135deg, #FF007A, #FF69B4);
    color: white;
    align-self: flex-start;
}

.chat-input {
    padding: 1rem;
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid #E5E7EB;
}

.chat-input input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #D1D5DB;
    border-radius: 8px;
}

.chat-input button {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #FF007A, #FF69B4);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

/* Personalized CTA */
.personalized-cta {
    position: fixed;
    bottom: 100px;
    left: 20px;
    z-index: 9999;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    animation: slideInLeft 0.5s ease-out;
}

.cta-content {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cta-icon {
    font-size: 2rem;
}

.cta-text h3 {
    margin-bottom: 0.5rem;
    color: #0A2540;
}

.cta-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cta-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6B7280;
}

/* High Intent Offer */
.high-intent-offer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10002;
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    animation: modalSlideIn 0.5s ease-out;
}

.offer-content {
    padding: 2rem;
    text-align: center;
}

.offer-badge {
    display: inline-block;
    background: linear-gradient(135deg, #FF007A, #FF69B4);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 1rem;
}

.offer-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}

.offer-close {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
}

/* Animation Keyframes */
@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Simulator Full Styles */
.simulator-full h3 {
    font-size: 2rem;
    color: #0A2540;
    margin-bottom: 0.5rem;
}

.simulator-form {
    background: #F0F4F8;
    padding: 2rem;
    border-radius: 16px;
    margin: 2rem 0;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.simulator-results {
    background: linear-gradient(135deg, #0A2540, #007BFF);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-top: 2rem;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.result-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
}

.result-item.highlight {
    background: linear-gradient(135deg, #FF007A, #FF69B4);
}

.roi-breakdown {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
}

.benefit-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.cta-section {
    text-align: center;
}

/* Scroll Animations */
.animate-in {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .chat-window {
        width: 300px;
        height: 350px;
    }
    
    .personalized-cta {
        left: 10px;
        right: 10px;
        max-width: none;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);
