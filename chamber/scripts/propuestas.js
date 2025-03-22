document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón de Afiliación
    const affiliateButton = document.querySelector(".affiliate-button");

    // Verificar si el botón de afiliación se ha detectado
    if (affiliateButton) {
        console.log("Botón de afiliación detectado.");
    } else {
        console.log("No se detectó el botón de afiliación.");
    }

    // Crear el contenedor del formulario como un menú lateral
    const formContainer = document.createElement("div");
    formContainer.id = "affiliate-form-container";
    formContainer.classList.add("side-menu", "p-4", "bg-light", "position-fixed", "top-0", "end-0", "h-100", "shadow-lg", "overflow-auto");
    formContainer.style.width = "0"; // Inicialmente el formulario está colapsado
    formContainer.style.height = "100%";  // Ocupa toda la altura de la pantalla
    formContainer.style.transition = "width 0.3s ease-in-out";
    formContainer.style.zIndex = "1050"; // Asegúrate de que el formulario esté por encima de otros elementos
    document.body.appendChild(formContainer);

    // Contenido del formulario
    // Contenido del formulario
    formContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <h2 class="fs-5">Formulario de Afiliación</h2>
            <button class="btn-close" id="close-form"></button>
        </div>


        <!-- Contenido de Membresías -->
        <div class="mt-4">
            <h3 class="mb-4">Membresías</h3>
            <p class="lead">¡En CANACO Ciudad de México, queremos que tu empresa crezca!</p>

            <!-- Membresía MIPYME -->
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">MIPYME</h4>
                    <p class="card-subtitle mb-2 text-muted">¡Ideal para pequeñas y medianas empresas!</p>
                    <p class="h5"><strong>$2,400.00</strong></p>
                    <ul class="list-unstyled">
                        <li>✓ Engomado del SIEM</li>
                        <li>✓ Obtén 10% de descuento en eventos</li>
                        <li>✓ Asesoría jurídica</li>
                        <li>✓ Acceso a la Oficina Virtual</li>
                        <li>✓ Networking Empresarial</li>
                        <li>✓ Reuniones empresariales</li>
                        <li>✓ 3 meses de publicidad en la cuponera de descuentos CANACO</li>
                        <li>✓ Trámites para uso de suelo</li>
                        <li>✓ Acceso a conferencias gratuitas</li>
                    </ul>
                    <div class="d-flex gap-2">
                        <a href="#" class="btn btn-outline-primary">Conocer más</a>
                        <a href="/WDD231/week04/forms.html" class="btn btn-primary comprarBtn">Comprar</a>
                    </div>
                </div>
            </div>

            <!-- Membresía COMERCIAL -->
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">COMERCIAL</h4>
                    <p class="card-subtitle mb-2 text-muted">¡Expande tus relaciones a nivel mundial!</p>
                    <p class="h5"><strong>$4,500.00</strong></p>
                    <ul class="list-unstyled">
                        <li><strong>Todos los beneficios de la membresía MIPyme más:</strong></li>
                        <li>✓ Obtén 20% de descuento en eventos</li>
                        <li>✓ Uso de salas empresariales</li>
                        <li>✓ Asesorías en Comercio Exterior</li>
                        <li>✓ Reuniones empresariales</li>
                        <li>✓ 3 Cortesías para el Seminario de Reformas Fiscales</li>
                        <li>✓ 4 post en redes sociales</li>
                        <li>✓ Revisión de contratos</li>
                        <li>✓ Networking empresarial</li>
                    </ul>
                    <div class="d-flex gap-2">
                        <a href="#" class="btn btn-outline-primary">Conocer más</a>
                        <a href="/WDD231/week04/forms.html" class="btn btn-primary comprarBtn">Comprar</a>
                    </div>
                </div>
            </div>

            <!-- Membresía NEGOCIOS -->
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">NEGOCIOS</h4>
                    <p class="card-subtitle mb-2 text-muted">¡Crece sin límites!</p>
                    <p class="h5"><strong>$10,500.00</strong></p>
                    <ul class="list-unstyled">
                        <li><strong>Todos los beneficios de la membresía Comercial más:</strong></li>
                        <li>✓ Logo institucional de Cámara de Comercio para alojar en su portal web</li>
                        <li>✓ Costo preferencial en cursos de capacitación IN COMPANY</li>
                        <li>✓ Precio preferencial en CUADERNO ATA a la exportación</li>
                        <li>✓ Obtén 25% de descuento en Certificados de Origen no preferenciales</li>
                        <li>✓ Revisión y elaboración de contratos</li>
                        <li>✓ Asesoría en Aviso de Privacidad</li>
                    </ul>
                    <div class="d-flex gap-2">
                        <a href="#" class="btn btn-outline-primary">Conocer más</a>
                        <a href="/WDD231/week04/forms.html" class="btn btn-primary comprarBtn">Comprar</a>
                    </div>
                </div>
            </div>

            <!-- Membresía SELECTA -->
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">SELECTA</h4>
                    <p class="card-subtitle mb-2 text-muted">¡Únete a los grandes!</p>
                    <p class="h5"><strong>$21,000.00</strong></p>
                    <ul class="list-unstyled">
                        <li><strong>Todos los beneficios de la membresía de Negocios más:</strong></li>
                        <li>✓ 1 stand (2x2) en uno de nuestros eventos institucionales</li>
                        <li>✓ Revisión y elaboración de contratos mercantil y laboral</li>
                        <li>✓ Atención de quejas ante PROFECO, visitas de verificación y audiencias</li>
                        <li>✓ 50% de descuentos en servicios jurídicos</li>
                        <li>✓ 6 artículos en el blog Canaco</li>
                        <li>✓ Asesoría en arbitraje comercial</li>
                    </ul>
                    <div class="d-flex gap-2">
                        <a href="#" class="btn btn-outline-primary">Conocer más</a>
                        <a href="/WDD231/week04/forms.html" class="btn btn-primary comprarBtn">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Agregar evento para mostrar el formulario
    affiliateButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Formulario de afiliación mostrado.");
        formContainer.style.width = "100%";  // Asegúrate de que ocupe toda la pantalla
    });
    // Abrir el formulario
affiliateButton.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.classList.add('open'); // Agregar la clase 'open'
});

// Cerrar el formulario
document.getElementById("close-form").addEventListener("click", function () {
    formContainer.classList.remove('open'); // Quitar la clase 'open'
});
    // Evento para cerrar el formulario
    document.getElementById("close-form").addEventListener("click", function () {
        console.log("Formulario de afiliación cerrado.");
        formContainer.style.width = "0";
    });
    
  

    // Agregar evento para mostrar el formulario
affiliateButton.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Formulario de afiliación mostrado.");
    formContainer.classList.add('open');  // Abre el formulario con la clase 'open'
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el botón de Afiliación
    const affiliateButton = document.querySelector(".affiliate-button");

    // Verificar si el botón de afiliación se ha detectado
    if (affiliateButton) {
        console.log("Botón de afiliación detectado.");
    } else {
        console.log("No se detectó el botón de afiliación.");
    }


    // Abrir el formulario
    affiliateButton.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("Formulario de afiliación mostrado.");
        formContainer.style.width = "400px"; // Ancho del formulario
    });

    // Cerrar el formulario
    document.getElementById("close-form").addEventListener("click", function () {
        console.log("Formulario de afiliación cerrado.");
        formContainer.style.width = "0"; // Colapsar el formulario
    });

    // Capturar la fecha y hora actual en el campo hidden
    document.getElementById("timestamp").value = new Date().toISOString();
    console.log("Fecha y hora capturada: " + new Date().toISOString());
});

});
