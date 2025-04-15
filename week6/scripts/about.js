// about.js - Maneja la sección "¿Quiénes Somos?" en index.html

document.addEventListener('DOMContentLoaded', function() {
    // Configurar el evento para el enlace "¿Quiénes Somos?"
    const aboutLink = document.querySelector('.side-menu a[href="#about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarSeccionAbout();
            
            // Cerrar el menú
            const sideMenu = document.getElementById('side-menu');
            const overlay = document.getElementById('overlay');
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Configurar el botón de volver
    const backButton = document.getElementById('back-to-home-btn');
    if (backButton) {
        backButton.addEventListener('click', volverAlInicio);
    }
});

function mostrarSeccionAbout() {
    const aboutSection = document.getElementById('about-section');
    const mainContent = document.querySelector('main');
    
    // Ocultar todo el contenido principal
    document.querySelectorAll('main > section').forEach(section => {
        if (!section.classList.contains('about-section')) {
            section.style.display = 'none';
        }
    });
    
    // Mostrar la sección About
    aboutSection.style.display = 'block';
    
    // Cargar contenido si no está cargado aún
    if (document.getElementById('history-timeline').children.length === 0) {
        loadHistoryTimeline();
        loadTeamMembers();
        loadPartners();
    }
    
    // Desplazarse suavemente a la sección
    aboutSection.scrollIntoView({ behavior: 'smooth' });
}

function volverAlInicio() {
    // Ocultar sección About
    document.getElementById('about-section').style.display = 'none';
    
    // Mostrar todas las secciones principales
    document.querySelectorAll('main > section').forEach(section => {
        if (!section.classList.contains('about-section')) {
            section.style.display = 'block';
        }
    });
    
    // Desplazarse al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadHistoryTimeline() {
    const timeline = document.getElementById('history-timeline');
    const events = [
        { year: "1975", title: "Fundación", description: "Nuestra organización fue fundada con el objetivo de..." },
        { year: "1985", title: "Primer gran proyecto", description: "Lanzamos nuestro primer proyecto comunitario..." },
        { year: "2000", title: "Expansión nacional", description: "Comenzamos a operar en todo el país..." },
        { year: "2020", title: "Reconocimiento internacional", description: "Recibimos el premio XYZ por nuestro trabajo..." }
    ];

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.innerHTML = `
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timeline.appendChild(eventElement);
    });
}

function loadTeamMembers() {
    const teamContainer = document.getElementById('team-container');
    const members = [
        { name: "Juan Pérez", role: "Director Ejecutivo", image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "María García", role: "Coordinadora de Proyectos", image: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Carlos López", role: "Especialista en Desarrollo", image: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Ana Martínez", role: "Directora de Comunicaciones", image: "https://randomuser.me/api/portraits/women/2.jpg" }
    ];

    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.role}</p>
        `;
        teamContainer.appendChild(memberElement);
    });
}

function loadPartners() {
    const partnersContainer = document.getElementById('partners-container');
    const partners = [
        { name: "Empresa A", logo: "https://via.placeholder.com/150?text=Empresa+A" },
        { name: "Empresa B", logo: "https://via.placeholder.com/150?text=Empresa+B" },
        { name: "Empresa C", logo: "https://via.placeholder.com/150?text=Empresa+C" },
        { name: "Empresa D", logo: "https://via.placeholder.com/150?text=Empresa+D" }
    ];

    partners.forEach(partner => {
        const partnerElement = document.createElement('div');
        partnerElement.className = 'partner';
        partnerElement.innerHTML = `
            <img src="${partner.logo}" alt="${partner.name}" loading="lazy">
        `;
        partnersContainer.appendChild(partnerElement);
    });
}