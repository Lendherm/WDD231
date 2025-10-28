document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    // Mostrar el menú y el overlay
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open'); 
        overlay.classList.toggle('active'); 
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('open'); 
        overlay.classList.remove('active'); 
    });

    // Cerrar el menú al hacer clic en un enlace dentro del menú
    document.querySelectorAll('.side-menu a').forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('open'); 
            overlay.classList.remove('active'); 
        });
    });

    // Funcionalidad básica
    mostrarMensajeVisita(); // Mostrar mensaje de última visita
    ajustarDisenoPantalla();
    window.addEventListener('resize', ajustarDisenoPantalla);
});

// Mostrar mensaje sobre la última visita
function mostrarMensajeVisita() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    const messageElement = document.querySelector('.visit-message');

    if (!messageElement) {
        console.error("Elemento '.visit-message' no encontrado en el DOM.");
        return;
    }

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            messageElement.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
}

// Ajustar el diseño para pantallas grandes
function ajustarDisenoPantalla() {
    const sideMenu = document.getElementById('side-menu');
    if (window.innerWidth > 768) {
        sideMenu.classList.remove('open'); 
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active'); 
    }
}