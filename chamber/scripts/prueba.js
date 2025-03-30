formContainer.innerHTML = `
<div class="af-form-container">
    <div class="af-form-header">
        <h2 class="af-form-title">Formulario de Afiliación</h2>
        <button class="af-close-button" id="close-form">×</button>
    </div>

    <div class="af-memberships">
        <h3 class="af-section-title">Membresías</h3>
        <p class="af-intro-text">¡En CANACO Ciudad de México, queremos que tu empresa crezca!</p>

        <!-- Membresía MIPYME -->
        <div class="af-card">
            <h4 class="af-card-title">MIPYME</h4>
            <p class="af-card-subtitle">¡Ideal para pequeñas y medianas empresas!</p>
            <p class="af-card-price">$2,400.00</p>
            <ul class="af-benefits-list">
                <li class="af-benefit-item">✓ Engomado del SIEM</li>
                <li class="af-benefit-item">✓ Obtén 10% de descuento en eventos</li>
                <li class="af-benefit-item">✓ Asesoría jurídica</li>
                <li class="af-benefit-item">✓ Acceso a la Oficina Virtual</li>
                <li class="af-benefit-item">✓ Networking Empresarial</li>
                <li class="af-benefit-item">✓ Reuniones empresariales</li>
                <li class="af-benefit-item">✓ 3 meses de publicidad en la cuponera de descuentos CANACO</li>
                <li class="af-benefit-item">✓ Trámites para uso de suelo</li>
                <li class="af-benefit-item">✓ Acceso a conferencias gratuitas</li>
            </ul>
            <div class="af-buttons-container">
                <a href="#" class="af-secondary-btn">Conocer más</a>
                <a href="/WDD231/week04/forms.html" class="af-primary-btn af-buy-btn">Comprar</a>
            </div>
        </div>

        <!-- Membresía COMERCIAL -->
        <div class="af-card">
            <h4 class="af-card-title">COMERCIAL</h4>
            <p class="af-card-subtitle">¡Expande tus relaciones a nivel mundial!</p>
            <p class="af-card-price">$4,500.00</p>
            <ul class="af-benefits-list">
                <li class="af-benefit-item"><strong>Todos los beneficios de la membresía MIPyme más:</strong></li>
                <li class="af-benefit-item">✓ Obtén 20% de descuento en eventos</li>
                <li class="af-benefit-item">✓ Uso de salas empresariales</li>
                <li class="af-benefit-item">✓ Asesorías en Comercio Exterior</li>
                <li class="af-benefit-item">✓ Reuniones empresariales</li>
                <li class="af-benefit-item">✓ 3 Cortesías para el Seminario de Reformas Fiscales</li>
                <li class="af-benefit-item">✓ 4 post en redes sociales</li>
                <li class="af-benefit-item">✓ Revisión de contratos</li>
                <li class="af-benefit-item">✓ Networking empresarial</li>
            </ul>
            <div class="af-buttons-container">
                <a href="#" class="af-secondary-btn">Conocer más</a>
                <a href="/WDD231/week04/forms.html" class="af-primary-btn af-buy-btn">Comprar</a>
            </div>
        </div>

        <!-- Membresía NEGOCIOS -->
        <div class="af-card">
            <h4 class="af-card-title">NEGOCIOS</h4>
            <p class="af-card-subtitle">¡Crece sin límites!</p>
            <p class="af-card-price">$10,500.00</p>
            <ul class="af-benefits-list">
                <li class="af-benefit-item"><strong>Todos los beneficios de la membresía Comercial más:</strong></li>
                <li class="af-benefit-item">✓ Logo institucional de Cámara de Comercio para alojar en su portal web</li>
                <li class="af-benefit-item">✓ Costo preferencial en cursos de capacitación IN COMPANY</li>
                <li class="af-benefit-item">✓ Precio preferencial en CUADERNO ATA a la exportación</li>
                <li class="af-benefit-item">✓ Obtén 25% de descuento en Certificados de Origen no preferenciales</li>
                <li class="af-benefit-item">✓ Revisión y elaboración de contratos</li>
                <li class="af-benefit-item">✓ Asesoría en Aviso de Privacidad</li>
            </ul>
            <div class="af-buttons-container">
                <a href="#" class="af-secondary-btn">Conocer más</a>
                <a href="/WDD231/week04/forms.html" class="af-primary-btn af-buy-btn">Comprar</a>
            </div>
        </div>

        <!-- Membresía SELECTA -->
        <div class="af-card">
            <h4 class="af-card-title">SELECTA</h4>
            <p class="af-card-subtitle">¡Únete a los grandes!</p>
            <p class="af-card-price">$21,000.00</p>
            <ul class="af-benefits-list">
                <li class="af-benefit-item"><strong>Todos los beneficios de la membresía de Negocios más:</strong></li>
                <li class="af-benefit-item">✓ 1 stand (2x2) en uno de nuestros eventos institucionales</li>
                <li class="af-benefit-item">✓ Revisión y elaboración de contratos mercantil y laboral</li>
                <li class="af-benefit-item">✓ Atención de quejas ante PROFECO, visitas de verificación y audiencias</li>
                <li class="af-benefit-item">✓ 50% de descuentos en servicios jurídicos</li>
                <li class="af-benefit-item">✓ 6 artículos en el blog Canaco</li>
                <li class="af-benefit-item">✓ Asesoría en arbitraje comercial</li>
            </ul>
            <div class="af-buttons-container">
                <a href="#" class="af-secondary-btn">Conocer más</a>
                <a href="/WDD231/week04/forms.html" class="af-primary-btn af-buy-btn">Comprar</a>
            </div>
        </div>
    </div>
</div>
`;    

    // Funciones para mostrar/ocultar
    function showForm() {
        formContainer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function hideForm() {
        formContainer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Event listeners
    affiliateButton.addEventListener("click", function(e) {
        e.preventDefault();
        showForm();
    });

    document.getElementById("af-close-form").addEventListener("click", hideForm);
    overlay.addEventListener("click", hideForm);

    // Cerrar con la tecla ESC
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && formContainer.classList.contains("active")) {
            hideForm();
        }
    });
