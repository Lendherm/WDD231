// Script to include header and footer in all pages
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            initializeHeader(); // Reinitialize header functionality
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            initializeFooter(); // Reinitialize footer functionality
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initializeHeader() {
    // Reinitialize menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    if (menuToggle && sideMenu && overlay) {
        menuToggle.addEventListener('click', function() {
            sideMenu.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('open') ? 'hidden' : 'auto';
        });

        overlay.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}

function initializeFooter() {
    // Update current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Update last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = 'Última modificación: ' + document.lastModified;
    }
}