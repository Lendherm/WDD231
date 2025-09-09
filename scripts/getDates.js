// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", function () {
    // Mostrar/Ocultar el menú de hamburguesa - CORREGIDO
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle("show");
        });
    }

    // Resto de tu código sin cambios...
    // Mostrar/Ocultar submenús al hacer clic en el enlace
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show-submenu');
            }
        });
    });

    // Insertar el año actual en el footer
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Mostrar la fecha de la última modificación
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Obtener el botón de modo oscuro y el elemento body
    const modeButton = document.querySelector("#mode");
    const body = document.querySelector("body");

    if (modeButton) {
        // Event listener para cambiar entre modo claro y oscuro
        modeButton.addEventListener("click", () => {
            // Alternar la clase dark-mode en el body
            body.classList.toggle("dark-mode");

            // Cambiar el ícono del botón dependiendo del modo
            if (body.classList.contains("dark-mode")) {
                modeButton.textContent = "🔆";
            } else {
                modeButton.textContent = "🌙";
            }
        });
    }

    // Contador de visitas de la página
    const visitsElement = document.getElementById("visits");
    if (visitsElement) {
        let visits = localStorage.getItem("pageVisits");
        if (!visits) {
            visits = 0;
        }
        visits++;
        localStorage.setItem("pageVisits", visits);
        visitsElement.textContent = `Page Visits: ${visits}`;
    }
});