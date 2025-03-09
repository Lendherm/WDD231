// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", function () {
    // Mostrar/Ocultar el menú de hamburguesa
    document.getElementById("menu-toggle").addEventListener("click", function () {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle("show");
    });

    // Mostrar/Ocultar submenús al hacer clic en el enlace
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault(); // Evitar que el enlace recargue la página
            const submenu = this.nextElementSibling; // Submenú relacionado
            if (submenu) {
                submenu.classList.toggle('show-submenu'); // Alternar la clase para mostrarlo
            }
        });
    });

    // Insertar el año actual en el footer
    const currentYearElement = document.getElementById("currentYear");
    currentYearElement.textContent = new Date().getFullYear();

    // Mostrar la fecha de la última modificación
    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // Obtener el botón de modo oscuro y el elemento body
    const modeButton = document.querySelector("#mode");
    const body = document.querySelector("body");

    // Event listener para cambiar entre modo claro y oscuro
    modeButton.addEventListener("click", () => {
        // Alternar la clase dark-mode en el body
        body.classList.toggle("dark-mode");

        // Cambiar el ícono del botón dependiendo del modo
        if (body.classList.contains("dark-mode")) {
            modeButton.textContent = "🔆"; // Modo claro
        } else {
            modeButton.textContent = "🌙"; // Modo oscuro
        }
    });

    // Contador de visitas de la página
    const visitsElement = document.getElementById("visits");
    if (visitsElement) {
        // Obtener el número de visitas desde localStorage
        let visits = localStorage.getItem("pageVisits");
        if (!visits) {
            visits = 0; // Inicializar si no existe
        }

        // Incrementar el contador y almacenarlo en localStorage
        visits++;
        localStorage.setItem("pageVisits", visits);

        // Actualizar el contenido del contador en la página
        visitsElement.textContent = `Page Visits: ${visits}`;
    }
});
