document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');

    languageToggle.addEventListener('click', () => {
        languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!languageToggle.contains(event.target)) {
            languageDropdown.style.display = 'none';
        }
    });
});



// ===== LGPD & COOKIE CONSENT =====
class LgpdManager {
    constructor() {
        this.banner = document.getElementById("lgpd-banner");
        this.acceptAllBtn = document.getElementById("lgpd-accept-all");
        this.acceptEssentialBtn = document.getElementById("lgpd-accept-essential");

        if (localStorage.getItem("cookie_consent")) {
            this.hideBanner();
        } else {
            this.showBanner();
        }

        this.acceptAllBtn.addEventListener("click", () => this.acceptCookies("all"));
        this.acceptEssentialBtn.addEventListener("click", () => this.acceptCookies("essential"));
    }

    showBanner() {
        this.banner.style.display = "block";
    }

    hideBanner() {
        this.banner.style.display = "none";
    }

    acceptCookies(level) {
        localStorage.setItem("cookie_consent", level);
        this.hideBanner();
    }
}

// ===== ROI SIMULATOR =====
class RoiSimulator {
    constructor() {
        this.form = document.getElementById("roi-simulator-form");
        this.results = document.getElementById("simulator-results");
        this.form.addEventListener("submit", (e) => this.calculate(e));
    }

    calculate(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        const volume = parseFloat(data.volume_mensal);
        const custo = parseFloat(data.custo_atual_mensal);
        const tempo = parseFloat(data.tempo_medio_min);

        // Lógica de cálculo simplificada
        const reducaoCustos = custo * 0.3;
        const horasEconomizadas = (volume * tempo * 0.5) / 60;
        const paybackSemanas = 12;

        document.getElementById("res-reducao-custos").innerText = `R$ ${reducaoCustos.toFixed(2)}`;
        document.getElementById("res-horas-economizadas").innerText = `${horasEconomizadas.toFixed(0)}h`;
        document.getElementById("res-payback").innerText = `${paybackSemanas} semanas`;

        this.results.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new LgpdManager();
    new RoiSimulator();
});

