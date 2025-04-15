// Objeto global para manejar el formulario de afiliación
const AffiliateFormManager = {
    formContainer: null,
    overlay: null,
    isInitialized: false,

    // Inicializar el formulario
    init: function() {
        if (this.isInitialized) return;

        // Crear contenedor principal
        this.formContainer = document.createElement("div");
        this.formContainer.id = "af-form-container";
        document.body.appendChild(this.formContainer);

        // Crear overlay
        this.overlay = document.createElement("div");
        this.overlay.className = "af-overlay";
        document.body.appendChild(this.overlay);

        // Contenido del formulario
        this.formContainer.innerHTML = `
            <div class="af-form-wrapper">
                <div class="af-form-header">
                    <h2 class="af-form-title">Formulario de Afiliación</h2>
                    <button class="af-close-button" id="af-close-form">×</button>
                </div>
                <div class="af-title-section">
                    <h3 class="af-section-title">Membresías</h3>
                    <p class="af-intro-text">¡En CANACO Ciudad de México, queremos que tu empresa crezca!</p>
                </div>
                <div class="af-memberships">
                    <!-- Membresía MIPYME -->
                    <div class="af-card">
                        <!-- ... (todo el contenido de las membresías) ... -->
                    </div>
                </div>
            </div>
        `;

        // Configurar eventos
        this.setupEvents();
        this.isInitialized = true;
    },

    // Configurar eventos del formulario
    setupEvents: function() {
        const closeButton = this.formContainer.querySelector('#af-close-form');
        const affiliateButton = document.querySelector(".affiliate-button");

        // Configurar botón de afiliación si existe
        if (affiliateButton) {
            affiliateButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.showForm();
            });
        }

        // Eventos para cerrar el formulario
        closeButton.addEventListener("click", () => this.hideForm());
        this.overlay.addEventListener("click", () => this.hideForm());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.formContainer.classList.contains("active")) {
                this.hideForm();
            }
        });

        // Configurar scroll suave
        this.setupSmoothScroll();
    },

    // Mostrar formulario
    showForm: function() {
        if (!this.isInitialized) this.init();
        
        this.formContainer.classList.add("active");
        this.overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        this.formContainer.scrollTop = 0;
    },

    // Ocultar formulario
    hideForm: function() {
        this.formContainer.classList.remove("active");
        this.overlay.classList.remove("active");
        document.body.style.overflow = "";
    },

    // Configurar scroll suave
    setupSmoothScroll: function() {
        const titleSection = this.formContainer.querySelector('.af-title-section');
        let lastScrollPos = 0;
        let ticking = false;
        
        this.formContainer.addEventListener('scroll', () => {
            lastScrollPos = this.formContainer.scrollTop;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll(lastScrollPos, titleSection);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    },

    // Manejar scroll
    handleScroll: function(scrollPos, titleSection) {
        const SCROLL_THRESHOLD = 30;
        
        if (scrollPos > SCROLL_THRESHOLD) {
            titleSection.style.transform = 'translateY(-100%)';
            titleSection.style.opacity = '0';
        } else {
            titleSection.style.transform = 'translateY(0)';
            titleSection.style.opacity = '1';
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    AffiliateFormManager.init();
    
    // Escuchar evento para abrir el formulario desde otros componentes
    document.addEventListener('openAffiliateForm', function() {
        AffiliateFormManager.showForm();
    });
});