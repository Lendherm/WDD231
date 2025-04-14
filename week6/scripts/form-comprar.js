document.addEventListener("DOMContentLoaded", function () {
    console.log("El DOM ha sido cargado");

    const comprarBtn = document.querySelectorAll(".comprarBtn");

    if (comprarBtn.length === 0) {
        console.warn("El botón comprarBtn no fue encontrado en el DOM");
    } else {
        console.log("El botón comprarBtn fue detectado correctamente");
    }

    // Función para crear el formulario de pago
    window.crearFormularioPago = function () {
        // Verificar si ya existe la barra lateral y está visible (tiene la clase 'active')
        const existingSidebar = document.getElementById("sidebar");
        if (existingSidebar && existingSidebar.classList.contains("active")) {
            console.log("La barra lateral ya está visible");
            return; // No hacer nada si la barra lateral ya está activa
        }

        console.log("Creando formulario de pago");

        // Crear la barra lateral
        const sidebar = document.createElement("div");
        sidebar.id = "sidebar";
        sidebar.classList.add("sidebar");

        // Crear el overlay
        const sidebarOverlay = document.createElement("div");
        sidebarOverlay.id = "sidebarOverlay";
        sidebarOverlay.classList.add("overlay");

        // Insertar el contenido del formulario
        sidebar.innerHTML = `
            <div class="p-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="card-title mb-0">Formulario de Pago</h3>
                    <button id="closeSidebar" class="btn-close"></button>
                </div>
                <form>
                    <div class="card-icons mb-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width="50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="American Express" width="50">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" placeholder="juan.perez@example.com" required>
                    </div>
                    <div class="mb-3">
                        <label for="country" class="form-label">País</label>
                        <select class="form-select" id="country" required>
                            <option value="" selected disabled>Selecciona tu país</option>
                            <option value="AR">Argentina</option>
                            <option value="MX">México</option>
                            <option value="ES">España</option>
                            <option value="CO">Colombia</option>
                            <option value="US">Estados Unidos</option>
                            <option value="CL">Chile</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="cardName" class="form-label">Nombre en la tarjeta</label>
                        <input type="text" class="form-control" id="cardName" placeholder="Juan Pérez" required>
                    </div>
                    <div class="mb-3">
                        <label for="cardNumber" class="form-label">Número de tarjeta</label>
                        <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="expirationDate" class="form-label">Fecha de expiración</label>
                            <input type="text" class="form-control" id="expirationDate" placeholder="MM/AA" required>
                        </div>
                        <div class="col-md-6">
                            <label for="cvv" class="form-label">CVV</label>
                            <input type="text" class="form-control" id="cvv" placeholder="123" required>
                        </div>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Pagar ahora</button>
                    </div>
                </form>
            </div>
        `;

        // Agregar la barra lateral y el overlay al body
        document.body.appendChild(sidebar);
        document.body.appendChild(sidebarOverlay);

        // Mostrar la barra lateral y el overlay
        sidebar.classList.add("active");
        sidebarOverlay.classList.add("active");

        // Cerrar la barra lateral
        sidebar.querySelector("#closeSidebar").addEventListener("click", function () {
            console.log("Cerrando la barra lateral");
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active");

            // Eliminar la barra lateral y overlay del DOM
            document.body.removeChild(sidebar);
            document.body.removeChild(sidebarOverlay);
        });

        // Cerrar la barra lateral al hacer clic en el overlay
        sidebarOverlay.addEventListener("click", function () {
            console.log("Cerrando la barra lateral desde el overlay");
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active");

            // Eliminar la barra lateral y overlay del DOM
            document.body.removeChild(sidebar);
            document.body.removeChild(sidebarOverlay);
        });
    };

    // Mostrar la barra lateral cuando se hace clic en el botón
    comprarBtn.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("El botón fue clickeado");
            crearFormularioPago();
        });
    });
});
