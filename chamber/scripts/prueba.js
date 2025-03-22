document.addEventListener("DOMContentLoaded", function () {
    // Crear el CSS dinámicamente y agregarlo al head del documento
    const style = document.createElement('style');
    style.innerHTML = `
        /* Estilo base para el contenedor */
        #affiliate-form-container {
            width: 0; /* Inicialmente cerrado */
            height: 100vh; /* Altura de la pantalla completa */
            position: fixed; /* Fijo en la pantalla */
            top: 0;
            right: 0; /* O end: 0 si usas Grid */
            z-index: 999; /* Asegúrate de que esté por encima de otros elementos */
            background-color: #f8f9fa; /* Fondo claro */
            overflow: hidden; /* Ocultar contenido fuera de la caja */
            transition: width 0.5s ease-in-out; /* Animación suave para el ancho */
        }

        /* Cuando el contenedor tenga la clase "open", se expandirá */
        #affiliate-form-container.open {
            width: 300px; /* Ajusta el tamaño cuando esté abierto */
        }

        /* Estilo para el botón de cerrar */
        #close-form {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        /* Estilo para el contenido dentro del formulario */
        #affiliate-form-container .content {
            padding: 20px;
        }

        /* Si necesitas más ajustes específicos */
        #affiliate-form-container .card {
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(style);

    // Obtener el botón de Afiliación
    const affiliateButton = document.querySelector(".affiliate-button");

    if (affiliateButton) {
        console.log("Botón de afiliación detectado.");
    } else {
        console.log("No se detectó el botón de afiliación.");
    }

    // Crear el contenedor del formulario
    const formContainer = document.createElement("div");
    formContainer.id = "affiliate-form-container";
    formContainer.classList.add("side-menu", "p-4", "bg-light", "position-fixed", "top-0", "end-0", "shadow-lg", "overflow-auto");
    formContainer.style.width = "0"; // Inicialmente el formulario está colapsado
    formContainer.style.height = "100vh"; // Asegura que ocupe toda la pantalla
    document.body.appendChild(formContainer);

    // Contenido del formulario
    formContainer.innerHTML = `
        <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <h2 class="fs-5">Formulario de Afiliación</h2>
            <button class="btn-close" id="close-form">&times;</button>
        </div>

        <!-- Contenido de Membresías -->
        <div class="mt-4">
            <h3 class="mb-4">Membresías</h3>
            <p class="lead">¡En CANACO Ciudad de México, queremos que tu empresa crezca!</p>

            <!-- Membresía MIPYME -->
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title" id="membership-title">hola</h4>
                
                    <div class="d-flex gap-2">
                        <a href="#" class="btn btn-outline-primary">Conocer más</a>
                        <a href="#" class="btn btn-primary comprarBtn">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Agregar evento para mostrar el formulario
    if (affiliateButton) {
        affiliateButton.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Formulario de afiliación mostrado.");
            formContainer.classList.add('open');  // Abre el formulario con la clase 'open'
        });
    }

    // Evento para cerrar el formulario
    const closeButton = document.getElementById("close-form");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            console.log("Formulario de afiliación cerrado.");
            formContainer.classList.remove('open'); // Cierra el formulario
        });
    }

    // Cambiar el texto "hola" por "adiós" al hacer clic en "Comprar"
    const comprarBtns = document.querySelectorAll(".comprarBtn");
    comprarBtns.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const title = this.closest(".card-body").querySelector("#membership-title");
            if (title) {
                title.textContent = "adiós";  // Cambia el texto del título
            }
        });
    });
});
