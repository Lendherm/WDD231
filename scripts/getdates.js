// scripts/getDates.js - Optimized for Layout Stability and Performance
document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Marca el cuerpo como cargado (útil para CLS tracking)
    document.body.classList.add('loaded');

    // 🔹 Mostrar/Ocultar el menú de hamburguesa
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            const nav = document.querySelector('nav ul');
            if (nav) nav.classList.toggle("show");
        });
    }

    // 🔹 Mostrar/Ocultar submenús al hacer clic en el enlace
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show-submenu');
            }
        });
    });

    // 🔹 Insertar el año actual en el footer
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 🔹 Mostrar la fecha de la última modificación
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // 🔹 Modo oscuro / claro
    const modeButton = document.querySelector("#mode");
    const body = document.querySelector("body");

    if (modeButton) {
        modeButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            modeButton.textContent = body.classList.contains("dark-mode") ? "🔆" : "🌙";
        });
    }

    // 🔹 Contador de visitas (usando localStorage)
    const visitsElement = document.getElementById("visits");
    if (visitsElement) {
        let visits = localStorage.getItem("pageVisits");
        visits = visits ? parseInt(visits) : 0;
        visits++;
        localStorage.setItem("pageVisits", visits);
        visitsElement.textContent = `Page Visits: ${visits}`;
    }

    // 🔹 Optimizar carga de imágenes para prevenir saltos visuales (CLS)
    document.querySelectorAll('img').forEach(img => {
        // Oculta las imágenes hasta que estén cargadas completamente
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.4s ease';

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Si la imagen ya está cargada en caché
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// 🔹 Esperar a que toda la página cargue para marcarla como completamente lista
window.addEventListener('load', function() {
    document.body.classList.add('fully-loaded');
});
