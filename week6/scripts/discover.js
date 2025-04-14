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

    // Funcionalidad de carga perezosa y almacenamiento de última visita
    mostrarMensajeVisita();
    cargarGaleria();
    cargarCarrusel();
    ajustarDisenoPantalla();
    window.addEventListener('resize', ajustarDisenoPantalla);
});

let currentIndex = 0; // Índice actual del carrusel

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

// Cargar galería de imágenes con texto
function cargarGaleria() {
    const gallery = document.getElementById("gallery");
    const itemsGaleria = [
        { 
            texto: "Directory", 
            tipo: "directory",
            evento: 'openDirectory',
            destacado: true
        },
        { 
            texto: "Donaciones", 
            tipo: "donacion",
            evento: 'openDonationForm',
            destacado: true
        },
        { 
            texto: "Voluntariado", 
            tipo: "voluntariado",
            evento: 'openVolunteerForm',
            destacado: true
        },
        { 
            texto: "Capacitación", 
            tipo: "capacitacion" 
        },
        { 
            texto: "Sistema de Información", 
            tipo: "sistema" 
        },
        { 
            texto: "Servicio Legal", 
            tipo: "legal" 
        },
        { 
            texto: "Agenda Empresarial", 
            tipo: "agenda" 
        },
        { 
            texto: "Servicios Turísticos", 
            tipo: "turismo" 
        },
        { 
            texto: "Clima", 
            tipo: "clima" 
        }
    ];

    // Generar IDs únicos para imágenes
  // Generar IDs únicos para imágenes
let imageIds = [];
for (let i = 0; i < itemsGaleria.length; i++) {
    let randomId;
    do {
        randomId = Math.floor(Math.random() * 1000);
    } while (imageIds.includes(randomId));
    imageIds.push(randomId);
    
    const item = itemsGaleria[i];
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    // Crear elemento de imagen
    const img = document.createElement("img");
    img.src = `https://picsum.photos/800/550?random=${randomId}`;
    img.alt = `Imagen ${item.texto}`;
    img.loading = "lazy";

    // Crear texto
    const text = document.createElement("p");
    text.textContent = item.texto;
    text.classList.add("gallery-text");

    imgContainer.appendChild(img);
    imgContainer.appendChild(text);

    // Configurar eventos para items destacados
    if (item.destacado) {
        imgContainer.classList.add("highlighted-button", `${item.tipo}-trigger`);
        imgContainer.addEventListener("click", (e) => {
            e.preventDefault();
            const event = new Event(item.evento);
            document.dispatchEvent(event);
        });
    }

    gallery.appendChild(imgContainer);
}

}

// Cargar carrusel de imágenes aleatorias
function cargarCarrusel() {
    const carouselImages = document.getElementById("carousel-images");
    const totalImages = 10;

    let carouselImageIds = [];
    for (let i = 1; i <= totalImages; i++) {
        let randomImageId;
        do {
            randomImageId = Math.floor(Math.random() * 1000);
        } while (carouselImageIds.includes(randomImageId));
        carouselImageIds.push(randomImageId);

        const img = document.createElement("img");
        const uniqueParam = new Date().getTime();
        img.setAttribute("data-src", `https://picsum.photos/800/550?random=${randomImageId}&t=${uniqueParam}`);
        img.classList.add("carousel-image", "lazy");
        img.alt = `Carrusel Imagen Aleatoria ${i}`;
        carouselImages.appendChild(img);
    }

    lazyLoad();

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            actualizarCarrusel();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
            actualizarCarrusel();
        }
    });

    actualizarCarrusel();
}

// Actualizar la posición del carrusel
function actualizarCarrusel() {
    const carouselImages = document.getElementById("carousel-images");
    const images = carouselImages.querySelectorAll(".carousel-image");
    const width = images[0].clientWidth;
    const offset = currentIndex * width;

    carouselImages.style.transform = `translateX(-${offset}px)`;
    carouselImages.style.transition = "transform 0.5s ease-in-out";
}

// Implementar carga perezosa de imágenes
function lazyLoad() {
    const lazyImages = document.querySelectorAll(".lazy");

    if (lazyImages.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: "100px 0px",
        threshold: 0.1,
    });

    lazyImages.forEach(img => observer.observe(img));
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