document.addEventListener("DOMContentLoaded", function() {
    // Variables de estado
    let isInDetailsForm = false;
    let currentMembershipType = '';
    let currentMembershipPrice = '';
    
    // Elementos del DOM
    const affiliateButton = document.querySelector(".affiliate-button");
    const formContainer = document.getElementById('af-form-container') || createFormContainer();
    const overlay = document.querySelector('.af-overlay') || createOverlay();

    function createFormContainer() {
        const container = document.createElement("div");
        container.id = "af-form-container";
        document.body.appendChild(container);
        return container;
    }

    function createOverlay() {
        const overlay = document.createElement("div");
        overlay.className = "af-overlay";
        document.body.appendChild(overlay);
        return overlay;
    }

    // Manejador principal
    if (affiliateButton) {
        affiliateButton.addEventListener("click", function(e) {
            e.preventDefault();
            showMainForm();
        });
    }
    
    // Mostrar formulario principal con animación
    function showMainForm() {
        formContainer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        formContainer.scrollTop = 0;
        
        isInDetailsForm = false;
        currentMembershipType = '';
        currentMembershipPrice = '';
        
        renderFormContent();
        setupSmoothScroll();
        animateMembershipCards();
    }

    // Animación de tarjetas
    function animateMembershipCards() {
        const cards = document.querySelectorAll('.af-card');
        cards.forEach((card, index) => {
            card.style.animation = `cardEntrance 700ms ease-out ${index * 100}ms forwards`;
            card.style.opacity = '0';
        });
    }
    
    // Configurar scroll suave
    function setupSmoothScroll() {
        const titleSection = formContainer.querySelector('.af-title-section');
        if (!titleSection) return;

        let lastScrollPos = 0;
        let ticking = false;
        
        formContainer.addEventListener('scroll', () => {
            lastScrollPos = formContainer.scrollTop;
            
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll(lastScrollPos, titleSection);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    function handleScroll(scrollPos, titleSection) {
        const SCROLL_THRESHOLD = 30;
        titleSection.style.transform = scrollPos > SCROLL_THRESHOLD 
            ? 'translateY(-100%)' 
            : 'translateY(0)';
        titleSection.style.opacity = scrollPos > SCROLL_THRESHOLD ? '0' : '1';
    }

    // Renderizar contenido
    function renderFormContent() {
        formContainer.innerHTML = isInDetailsForm 
            ? renderBankForm() 
            : renderMembershipsList();
        
        setupEventListeners();
    }

    // Renderizar lista de membresías
    function renderMembershipsList() {
        return `
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
                    ${generateMembershipCards()}
                </div>
            </div>
        `;
    }

    // Generar tarjetas de membresía
    function generateMembershipCards() {
        const memberships = [
            {
                type: "MIPYME",
                price: "$2,400.00",
                benefits: [
                    "Engomado del SIEM",
                    "10% de descuento en eventos",
                    "Asesoría jurídica",
                    "Acceso a la Oficina Virtual",
                    "Networking Empresarial"
                ]
            },
            {
                type: "COMERCIAL",
                price: "$4,500.00",
                benefits: [
                    "Todos los beneficios MIPYME",
                    "20% de descuento en eventos",
                    "Uso de salas empresariales",
                    "Asesorías en Comercio Exterior"
                ]
            },
            {
                type: "NEGOCIOS",
                price: "$10,500.00",
                benefits: [
                    "Todos los beneficios COMERCIAL",
                    "Logo institucional",
                    "Descuentos en cursos IN COMPANY",
                    "Precio preferencial en CUADERNO ATA"
                ]
            },
            {
                type: "SELECTA",
                price: "$21,000.00",
                benefits: [
                    "Todos los beneficios NEGOCIOS",
                    "Stand en eventos",
                    "Revisión de contratos",
                    "Atención de quejas PROFECO"
                ]
            }
        ];

        return memberships.map(m => `
            <div class="af-card">
                <h4 class="af-card-title">${m.type}</h4>
                <p class="af-card-subtitle">${m.type === 'MIPYME' ? '¡Ideal para pequeñas y medianas empresas!' : ''}</p>
                <p class="af-card-price">${m.price}</p>
                <ul class="af-benefits-list">
                    ${m.benefits.map(b => `<li class="af-benefit-item">✓ ${b}</li>`).join('')}
                </ul>
                <div class="af-buttons-container">
                    <button class="af-secondary-btn">Conocer más</button>
                    <button class="af-primary-btn af-buy-btn">Comprar</button>
                </div>
            </div>
        `).join('');
    }

    // Renderizar formulario bancario
    function renderBankForm() {
        return `
            <div class="af-form-wrapper">
                <div class="af-form-header">
                    <button class="af-back-button" id="af-back-to-memberships">←</button>
                    <h2 class="af-form-title">Formulario de Afiliación</h2>
                    <button class="af-close-button" id="af-close-form">×</button>
                </div>
                <div class="af-form-details-container">
                    <div class="af-form-section">
                        <form id="membershipForm" class="af-form">
                            <div class="af-selected-membership">
                                <h3 class="af-selected-title">${currentMembershipType}</h3>
                                <p class="af-selected-price">${currentMembershipPrice}</p>
                                <p>Por favor complete sus datos para continuar con el proceso de afiliación.</p>
                            </div>
                            
                            ${generateFormSections()}
                            
                            <input type="hidden" id="membershipType" name="membershipType" value="${currentMembershipType}">
                            <input type="hidden" id="timestamp" name="timestamp" value="${new Date().toISOString()}">
                            
                            <div class="af-form-group full-width">
                                <button type="submit" class="af-submit-btn">Completar Afiliación</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="af-membership-info">
                        <h3>Resumen de Membresía</h3>
                        <div class="af-selected-membership">
                            <h4 class="af-selected-title">${currentMembershipType}</h4>
                            <p class="af-selected-price">${currentMembershipPrice}</p>
                        </div>
                        <h4>Beneficios incluidos:</h4>
                        <ul class="af-benefits-list">
                            ${getBenefitsForMembership(currentMembershipType)}
                        </ul>
                        <div class="af-payment-security">
                            <h4>Seguridad en pagos</h4>
                            <p>Todos los pagos son procesados de forma segura mediante encriptación SSL.</p>
                            <p>No almacenamos los detalles de tu tarjeta de crédito.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Generar secciones del formulario
    function generateFormSections() {
        return `
            <!-- Sección de Información Personal -->
            ${createFormGroup('Información Personal', 'h3', true)}
            ${createFormInput('Nombre(s)*', 'firstName', 'text', {required: true})}
            ${createFormInput('Apellidos*', 'lastName', 'text', {required: true})}
            ${createFormInput('Correo electrónico*', 'email', 'email', {required: true})}
            ${createFormInput('Teléfono móvil*', 'phone', 'tel', {required: true})}

            <!-- Sección de Información Empresarial -->
            ${createFormGroup('Información de la Empresa', 'h3', true)}
            ${createFormInput('Nombre de la empresa/organización*', 'company', 'text', {required: true})}
            ${createFormTextarea('Descripción de la empresa', 'description')}

            <!-- Sección de Información de Pago -->
            ${createPaymentSection()}
        `;
    }

    // Funciones auxiliares para crear elementos del formulario
    function createFormGroup(label, tag = 'div', fullWidth = false) {
        return `
            <div class="af-form-group ${fullWidth ? 'full-width' : 'half-width'}">
                <${tag}>${label}</${tag}>
            </div>
        `;
    }

    function createFormInput(label, id, type, attributes = {}) {
        const attrs = Object.entries(attributes)
            .map(([key, val]) => val === true ? key : `${key}="${val}"`)
            .join(' ');
        
        return `
            <div class="af-form-group half-width">
                <label for="${id}" class="af-form-label">${label}</label>
                <input type="${type}" id="${id}" name="${id}" class="af-form-input" ${attrs}>
            </div>
        `;
    }

    function createFormTextarea(label, id) {
        return `
            <div class="af-form-group full-width">
                <label for="${id}" class="af-form-label">${label}</label>
                <textarea id="${id}" name="${id}" class="af-form-input af-form-textarea"></textarea>
            </div>
        `;
    }

    function createPaymentSection() {
        return `
            <div class="af-payment-section">
                ${createFormGroup('Información de Pago', 'h3', true)}
                ${createFormInput('Número de tarjeta*', 'cardNumber', 'text', {required: true})}
                ${createFormInput('Fecha de expiración (MM/AA)*', 'expiry', 'text', {required: true})}
                ${createFormInput('Código de seguridad*', 'cvv', 'text', {required: true})}
                ${createFormInput('Nombre del titular*', 'cardName', 'text', {required: true})}
            </div>
        `;
    }

    // Obtener beneficios según membresía
    function getBenefitsForMembership(type) {
        const benefits = {
            "MIPYME": ["✓ Engomado del SIEM", "✓ 10% descuento eventos", "✓ Asesoría jurídica"],
            "COMERCIAL": ["✓ 20% descuento eventos", "✓ Salas empresariales", "✓ Comercio exterior"],
            "NEGOCIOS": ["✓ Logo institucional", "✓ Cursos IN COMPANY", "✓ Cuaderno ATA"],
            "SELECTA": ["✓ Stand en eventos", "✓ Revisión contratos", "✓ Atención PROFECO"]
        };
        
        return benefits[type]?.map(b => `<li class="af-benefit-item">${b}</li>`).join('') 
            || '<li class="af-benefit-item">✓ Beneficios personalizados según tu membresía</li>';
    }

    // Configurar eventos
    function setupEventListeners() {
        const closeButton = document.getElementById('af-close-form');
        if (closeButton) closeButton.addEventListener('click', closeForm);

        if (isInDetailsForm) {
            setupFormValidation();
            document.getElementById('af-back-to-memberships').addEventListener('click', goBackToMemberships);
        } else {
            document.querySelectorAll('.af-buy-btn').forEach(btn => {
                btn.addEventListener('click', handleMembershipSelection);
            });
        }
    }

    function setupFormValidation() {
        const form = document.getElementById('membershipForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                const formData = new FormData(this);
                showConfirmation(formData);
            } else {
                alert('Por favor complete todos los campos requeridos correctamente.');
            }
        });
    }

    function showConfirmation(formData) {
        const confirmationHTML = `
            <div class="af-confirmation">
                <div class="af-form-header">
                    <h2 class="af-form-title">¡Gracias por su afiliación!</h2>
                    <button class="af-close-button" id="af-close-form">×</button>
                </div>
                <div class="af-confirmation-content">
                    <h3>Resumen de su solicitud</h3>
                    <div class="af-summary-grid">
                        ${createSummaryItem('Nombre', `${formData.get('firstName')} ${formData.get('lastName')}`)}
                        ${createSummaryItem('Email', formData.get('email'))}
                        ${createSummaryItem('Teléfono', formData.get('phone'))}
                        ${createSummaryItem('Empresa', formData.get('company'))}
                         ${formData.get('description') ? 
                        createSummaryItem('Descripción', formData.get('description')) : 
                        ''}
                        ${createSummaryItem('Membresía', `${currentMembershipType} - ${currentMembershipPrice}`)}
                        ${createSummaryItem('Fecha', new Date(formData.get('timestamp')).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }))}
                       
                    </div>
                    <div class="af-confirmation-message">
                        <p>Hemos recibido su información exitosamente</p>
                        <button class="af-primary-btn" id="af-close-confirmation">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        
        formContainer.querySelector('.af-form-section').innerHTML = confirmationHTML;
        document.getElementById('af-close-confirmation').addEventListener('click', closeForm);
    }

    function createSummaryItem(label, value) {
        const isMultiline = value && value.length > 30;
        return `
            <div class="af-summary-item">
                <span class="af-summary-label">${label}:</span>
                <span class="af-summary-value ${isMultiline ? 'multiline' : ''}">${
                    value || 'No proporcionada'
                }</span>
            </div>
        `;
    }

    function handleMembershipSelection(e) {
        e.preventDefault();
        const card = e.target.closest('.af-card');
        currentMembershipType = card.querySelector('.af-card-title').textContent;
        currentMembershipPrice = card.querySelector('.af-card-price').textContent;
        isInDetailsForm = true;
        renderFormContent();
    }

    function goBackToMemberships(e) {
        e.preventDefault();
        isInDetailsForm = false;
        renderFormContent();
    }

    function closeForm() {
        formContainer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Evento global para tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && formContainer.classList.contains("active")) {
            closeForm();
        }
    });
});