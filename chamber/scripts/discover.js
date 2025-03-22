document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    // Mostrar el menú y el overlay
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open'); // Abre o cierra el menú
        overlay.classList.toggle('active'); // Muestra u oculta el overlay
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('open'); // Cierra el menú
        overlay.classList.remove('active'); // Oculta el overlay
    });

    // Cerrar el menú al hacer clic en un enlace dentro del menú
    document.querySelectorAll('.side-menu a').forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('open'); // Cierra el menú
            overlay.classList.remove('active'); // Oculta el overlay
        });
    });

    // Funcionalidad de carga perezosa y almacenamiento de última visita
    mostrarMensajeVisita(); // Mostrar mensaje de última visita
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
    const listaPalabras = [
        "Directory",
        "Capacitación",
        "Sistema de Información",
        "Servicio Legal",
        "Agenda Empresarial",
        "Servicios Turísticos",
        "Comercio Internacional",
        "Revista Digital",
        "Clima"
    ];

    listaPalabras.forEach((palabra, index) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const img = document.createElement("img");
        img.src = `https://picsum.photos/800/550?random=${index + 1}`;
        img.alt = `Imagen ${index + 1}`;

        const text = document.createElement("p");
        text.textContent = palabra;
        text.classList.add("gallery-text");

        imgContainer.appendChild(img);
        imgContainer.appendChild(text);
        gallery.appendChild(imgContainer);

        // Resaltar solo "Directory"
        if (palabra === "Directory") {
            imgContainer.classList.add("highlighted-button");
            imgContainer.addEventListener("click", () => {
                window.location.href = "../week2/directory.html";  // Ajusta la ruta si es necesario
            });
        }
    });
}

// Cargar carrusel de imágenes aleatorias
function cargarCarrusel() {
    const carouselImages = document.getElementById("carousel-images");
    const totalImages = 10; // Número de imágenes en el carrusel

    // Aseguramos que las imágenes del carrusel y la galería no se repitan
    let carouselImageIds = [];

    for (let i = 1; i <= totalImages; i++) {
        let randomImageId;
        // Evitar que el ID de la imagen se repita
        do {
            randomImageId = Math.floor(Math.random() * 1000); // Un ID aleatorio único
        } while (carouselImageIds.includes(randomImageId));
        carouselImageIds.push(randomImageId);

        const img = document.createElement("img");
        const uniqueParam = new Date().getTime(); // Añadir un parámetro único basado en el tiempo
        img.setAttribute("data-src", `https://picsum.photos/800/550?random=${randomImageId}&t=${uniqueParam}`); // Imagen aleatoria de picsum.photos
        img.classList.add("carousel-image", "lazy");
        img.alt = `Carrusel Imagen Aleatoria ${i}`;
        carouselImages.appendChild(img);
    }

    lazyLoad(); // Llamar la función de carga perezosa

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
    const width = images[0].clientWidth; // Obtiene el ancho de una imagen
    const offset = currentIndex * width; // Calcula el desplazamiento

    // Ajusta la posición del contenedor de imágenes
    carouselImages.style.transform = `translateX(-${offset}px)`;
    carouselImages.style.transition = "transform 0.5s ease-in-out";
}

// Implementar carga perezosa de imágenes con logging en la consola
function lazyLoad() {
    const lazyImages = document.querySelectorAll(".lazy");

    if (lazyImages.length === 0) {
        console.log("No se encontraron imágenes con la clase 'lazy'.");
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Añadir un identificador único para cada imagen
                const imgNumber = img.alt.match(/\d+/)[0];

                // Registrar el tiempo antes de cargar la imagen
                const startTime = performance.now();

                // Cargar la imagen
                img.src = img.dataset.src;
                img.classList.remove("lazy");

                // Mostrar información del network en la consola cuando la imagen comienza a cargarse
                console.log(`Imagen solicitada: ${img.src}`);

                // Cuando la imagen se haya cargado completamente, medir el tiempo
                img.onload = () => {
                    const endTime = performance.now();
                    const loadTime = (endTime - startTime).toFixed(2); // Tiempo en milisegundos
                    console.log(`Imagen ${imgNumber} cargada en ${loadTime} ms`);
                };

                observer.unobserve(img); // Deja de observar la imagen una vez cargada
            }
        });
    }, {
        rootMargin: "100px 0px",
        threshold: 0.1,
    });

    lazyImages.forEach(img => observer.observe(img)); // Observa las imágenes
}

// Ajustar el diseño para pantallas grandes
function ajustarDisenoPantalla() {
    const sideMenu = document.getElementById('side-menu');
    if (window.innerWidth > 768) {
        sideMenu.classList.remove('open'); // Cierra el menú en pantallas grandes
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active'); // Oculta el overlay
    }
}
