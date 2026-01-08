/**
 * Simulador ROI PlugIA - Versão Melhorada
 * Com setores específicos e benchmarks reais
 */

class PlugIAROISimulator {
    constructor() {
        this.sectorBenchmarks = {
            'varejo': {
                name: 'Varejo & E-commerce',
                baseROI: 380,
                conversionLift: 0.25,
                costReduction: 0.18,
                description: 'Otimização de estoque, personalização e previsão de demanda'
            },
            'financeiro': {
                name: 'Serviços Financeiros',
                baseROI: 420,
                conversionLift: 0.35,
                costReduction: 0.22,
                description: 'Detecção de fraudes, análise de crédito e automação'
            },
            'manufatura': {
                name: 'Manufatura & Indústria',
                baseROI: 350,
                conversionLift: 0.20,
                costReduction: 0.28,
                description: 'Manutenção preditiva, controle de qualidade e otimização'
            },
            'saude': {
                name: 'Saúde & Farmacêutico',
                baseROI: 290,
                conversionLift: 0.15,
                costReduction: 0.25,
                description: 'Diagnósticos assistidos, gestão de recursos e compliance'
            },
            'logistica': {
                name: 'Logística & Transporte',
                baseROI: 340,
                conversionLift: 0.22,
                costReduction: 0.30,
                description: 'Otimização de rotas, gestão de frota e previsão'
            },
            'telecomunicacoes': {
                name: 'Telecomunicações',
                baseROI: 310,
                conversionLift: 0.28,
                costReduction: 0.20,
                description: 'Predição de churn, otimização de rede e atendimento'
            },
            'energia': {
                name: 'Energia & Utilities',
                baseROI: 360,
                conversionLift: 0.18,
                costReduction: 0.32,
                description: 'Gestão inteligente, manutenção preditiva e eficiência'
            },
            'educacao': {
                name: 'Educação & Treinamento',
                baseROI: 250,
                conversionLift: 0.20,
                costReduction: 0.15,
                description: 'Personalização de ensino, análise de performance'
            },
            'agronegocio': {
                name: 'Agronegócio',
                baseROI: 320,
                conversionLift: 0.25,
                costReduction: 0.35,
                description: 'Agricultura de precisão, previsão climática e otimização'
            },
            'outros': {
                name: 'Outros Setores',
                baseROI: 300,
                conversionLift: 0.20,
                costReduction: 0.20,
                description: 'Soluções customizadas para seu setor específico'
            }
        };

        this.revenueBrackets = {
            'ate-10mi': { 
                multiplier: 1.0, 
                baseCost: 15000,
                description: 'Pequenas e médias empresas' 
            },
            '10mi-50mi': { 
                multiplier: 1.3, 
                baseCost: 25000,
                description: 'Empresas em crescimento' 
            },
            '50mi-200mi': { 
                multiplier: 1.8, 
                baseCost: 45000,
                description: 'Empresas consolidadas' 
            },
            '200mi-1bi': { 
                multiplier: 2.5, 
                baseCost: 75000,
                description: 'Grandes empresas' 
            },
            '1bi-5bi': { 
                multiplier: 3.5, 
                baseCost: 120000,
                description: 'Corporações' 
            },
            'acima-5bi': { 
                multiplier: 5.0, 
                baseCost: 200000,
                description: 'Multinacionais' 
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateSelectors();
    }

    populateSelectors() {
        // Popular setor
        const sectorSelect = document.getElementById('setor');
        if (sectorSelect) {
            sectorSelect.innerHTML = '<option value="">Selecione seu setor</option>';
            Object.entries(this.sectorBenchmarks).forEach(([key, sector]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = sector.name;
                sectorSelect.appendChild(option);
            });
        }

        // Popular faturamento
        const revenueSelect = document.getElementById('faturamento');
        if (revenueSelect) {
            revenueSelect.innerHTML = '<option value="">Selecione o faturamento anual</option>';
            Object.entries(this.revenueBrackets).forEach(([key, bracket]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = this.getRevenueLabel(key);
                revenueSelect.appendChild(option);
            });
        }
    }

    getRevenueLabel(key) {
        const labels = {
            'ate-10mi': 'Até R$ 10 milhões',
            '10mi-50mi': 'R$ 10 - 50 milhões',
            '50mi-200mi': 'R$ 50 - 200 milhões',
            '200mi-1bi': 'R$ 200 milhões - 1 bilhão',
            '1bi-5bi': 'R$ 1 - 5 bilhões',
            'acima-5bi': 'Acima de R$ 5 bilhões'
        };
        return labels[key] || key;
    }

    setupEventListeners() {
        // Input de faturamento com formatação
        const revenueInput = document.getElementById('revenue-input');
        if (revenueInput) {
            revenueInput.addEventListener('input', (e) => {
                this.formatCurrency(e.target);
                this.calculateROI();
            });
        }

        // Seletor de setor
        const sectorSelect = document.getElementById('setor');
        if (sectorSelect) {
            sectorSelect.addEventListener('change', () => {
                this.calculateROI();
                this.updateSectorInfo();
            });
        }

        // Seletor de faturamento
        const revenueSelect = document.getElementById('faturamento');
        if (revenueSelect) {
            revenueSelect.addEventListener('change', () => {
                this.calculateROI();
            });
        }

        // Botão de simulação completa
        const simulateBtn = document.getElementById('simulate-btn');
        if (simulateBtn) {
            simulateBtn.addEventListener('click', () => {
                this.showDetailedSimulation();
            });
        }
    }

    formatCurrency(input) {
        let value = input.value.replace(/\D/g, '');
        if (value) {
            value = parseInt(value).toLocaleString('pt-BR');
            input.value = value;
        }
    }

    updateSectorInfo() {
        const sectorSelect = document.getElementById('setor');
        const sectorInfo = document.getElementById('sector-info');
        
        if (!sectorSelect || !sectorInfo) return;

        const selectedSector = this.sectorBenchmarks[sectorSelect.value];
        if (selectedSector) {
            sectorInfo.innerHTML = `
                <div class="sector-info-card">
                    <h4>${selectedSector.name}</h4>
                    <p>${selectedSector.description}</p>
                    <div class="sector-metrics">
                        <span class="sector-metric">ROI Médio: ${selectedSector.baseROI}%</span>
                        <span class="sector-metric">Lift de Conversão: +${Math.round(selectedSector.conversionLift * 100)}%</span>
                    </div>
                </div>
            `;
            sectorInfo.style.display = 'block';
        } else {
            sectorInfo.style.display = 'none';
        }
    }

    calculateROI() {
        const revenueInput = document.getElementById('revenue-input');
        const sectorSelect = document.getElementById('setor');
        const revenueSelect = document.getElementById('faturamento');

        if (!revenueInput || !sectorSelect || !revenueSelect) return;

        const revenue = this.parseRevenue(revenueInput.value);
        const sector = this.sectorBenchmarks[sectorSelect.value];
        const revenueBracket = this.revenueBrackets[revenueSelect.value];

        if (!revenue || !sector || !revenueBracket) {
            this.clearResults();
            return;
        }

        // Cálculos baseados em benchmarks reais
        const annualRevenue = revenue;
        const sectorMultiplier = revenueBracket.multiplier;
        
        // Ganho anual estimado
        const baseGain = annualRevenue * (sector.conversionLift * sectorMultiplier);
        const costSavings = annualRevenue * (sector.costReduction * sectorMultiplier * 0.5);
        const totalAnnualGain = baseGain + costSavings;

        // Custo da PlugIA
        const annualCost = revenueBracket.baseCost * 12;
        
        // ROI e métricas
        const netGain = totalAnnualGain - annualCost;
        const roiPercentage = Math.round((netGain / annualCost) * 100);
        const paybackMonths = Math.ceil(annualCost / (totalAnnualGain / 12));

        // Atualizar interface
        this.updateResults({
            annualGain: totalAnnualGain,
            roi: roiPercentage,
            payback: paybackMonths,
            monthlyCost: revenueBracket.baseCost,
            sector: sector.name
        });
    }

    parseRevenue(value) {
        if (!value) return 0;
        return parseInt(value.replace(/\D/g, '')) || 0;
    }

    updateResults(results) {
        // Ganho anual
        const gainElement = document.getElementById('estimated-gain');
        if (gainElement) {
            gainElement.textContent = `R$ ${results.annualGain.toLocaleString('pt-BR')}`;
        }

        // ROI
        const roiElement = document.getElementById('roi-value');
        if (roiElement) {
            roiElement.textContent = `${results.roi}%`;
            
            // Cor baseada no ROI
            if (results.roi >= 300) {
                roiElement.style.color = '#10b981'; // Verde
            } else if (results.roi >= 200) {
                roiElement.style.color = '#f59e0b'; // Amarelo
            } else {
                roiElement.style.color = '#ef4444'; // Vermelho
            }
        }

        // Payback
        const paybackElement = document.getElementById('payback-value');
        if (paybackElement) {
            paybackElement.textContent = `${results.payback} meses`;
        }

        // Mostrar resultados
        const resultsContainer = document.getElementById('roi-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
        }

        // Atualizar botão de simulação
        const simulateBtn = document.getElementById('simulate-btn');
        if (simulateBtn) {
            simulateBtn.style.display = 'block';
            simulateBtn.textContent = `Ver Simulação Completa - ${results.sector}`;
        }
    }

    clearResults() {
        const resultsContainer = document.getElementById('roi-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }

        const simulateBtn = document.getElementById('simulate-btn');
        if (simulateBtn) {
            simulateBtn.style.display = 'none';
        }
    }

    showDetailedSimulation() {
        const sectorSelect = document.getElementById('setor');
        const revenueSelect = document.getElementById('faturamento');
        const revenueInput = document.getElementById('revenue-input');

        if (!sectorSelect.value || !revenueSelect.value || !revenueInput.value) {
            alert('Por favor, preencha todos os campos para ver a simulação completa.');
            return;
        }

        // Abrir popup com simulação detalhada
        if (window.plugiaPopup) {
            window.plugiaPopup.open();
        } else {
            // Fallback para formulário de contato
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Tracking
        this.trackSimulation({
            sector: sectorSelect.value,
            revenue_bracket: revenueSelect.value,
            revenue_input: this.parseRevenue(revenueInput.value)
        });
    }

    trackSimulation(data) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'roi_simulation', {
                event_category: 'calculator',
                sector: data.sector,
                revenue_bracket: data.revenue_bracket,
                revenue_value: data.revenue_input
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_category: 'roi_calculator',
                value: data.revenue_input,
                currency: 'BRL'
            });
        }

        console.log('ROI Simulation tracked:', data);
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.plugiaROISimulator = new PlugIAROISimulator();
});

// Função global para acesso externo
window.calculatePlugIAROI = function(revenue, sector, revenueBracket) {
    if (window.plugiaROISimulator) {
        return window.plugiaROISimulator.calculateROI();
    }
    return null;
};
