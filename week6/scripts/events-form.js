// Objeto global para manejar el formulario de eventos
const EventsFormManager = {
    formContainer: null,
    overlay: null,
    isInitialized: false,

    // Inicializar el formulario
    init: function() {
        if (this.isInitialized) return;

        // Crear contenedor principal
        this.formContainer = document.createElement("div");
        this.formContainer.id = "events-form-container";
        document.body.appendChild(this.formContainer);

        // Crear overlay
        this.overlay = document.createElement("div");
        this.overlay.className = "events-overlay";
        document.body.appendChild(this.overlay);

        // Contenido del formulario
        this.formContainer.innerHTML = `
            <div class="events-form-wrapper">
                <div class="events-form-header">
                    <h2 class="events-form-title">Formulario de Eventos</h2>
                    <button class="events-close-button" id="events-close-form">×</button>
                </div>
                <div class="events-title-section">
                    <h3 class="events-section-title">Registra tu Evento</h3>
                    <p class="events-intro-text">Comparte tus eventos con la comunidad y promueve la participación.</p>
                </div>
                <form id="event-submission-form" class="events-form">
                    <div class="form-group">
                        <label for="event-title">Título del Evento *</label>
                        <input type="text" id="event-title" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="event-description">Descripción *</label>
                        <textarea id="event-description" class="form-control" required></textarea>
                    </div>
                    <div class="date-time-container">
                        <div class="form-group">
                            <label for="event-date">Fecha *</label>
                            <input type="date" id="event-date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="event-time">Hora *</label>
                            <input type="time" id="event-time" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="event-location">Ubicación *</label>
                        <input type="text" id="event-location" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="event-image">Imagen del Evento (URL)</label>
                        <input type="url" id="event-image" class="form-control" placeholder="https://ejemplo.com/imagen.jpg">
                    </div>
                    <div class="events-buttons-container">
                        <button type="button" class="events-secondary-btn" id="events-cancel-btn">Cancelar</button>
                        <button type="submit" class="events-primary-btn">Enviar Evento</button>
                    </div>
                </form>
                <div class="events-list" id="upcoming-events">
                    <h3 class="events-section-title" style="text-align: center; margin: 30px 0 20px;">Próximos Eventos</h3>
                    <div id="events-list-container"></div>
                </div>
            </div>
        `;

        // Configurar eventos
        this.setupEvents();
        this.loadEvents();
        this.isInitialized = true;
    },

    // Configurar eventos del formulario
    setupEvents: function() {
        const closeButton = this.formContainer.querySelector('#events-close-form');
        const cancelButton = this.formContainer.querySelector('#events-cancel-btn');
        const form = this.formContainer.querySelector('#event-submission-form');

        // Eventos para cerrar el formulario
        closeButton.addEventListener("click", () => this.hideForm());
        cancelButton.addEventListener("click", () => this.hideForm());
        this.overlay.addEventListener("click", () => this.hideForm());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.formContainer.classList.contains("active")) {
                this.hideForm();
            }
        });

        // Manejar envío del formulario
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitEvent();
        });
    },

    // Mostrar formulario
    showForm: function() {
        if (!this.isInitialized) this.init();
        
        this.formContainer.classList.add("active");
        this.overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        this.formContainer.scrollTop = 0;
    },

    // Ocultar formulario
    hideForm: function() {
        this.formContainer.classList.remove("active");
        this.overlay.classList.remove("active");
        document.body.style.overflow = "";
    },

    // Cargar eventos desde el JSON
    loadEvents: function() {
        // Datos de ejemplo (reemplaza esto con tu fetch a events.json)
        const exampleEvents = [
            {
                "id": "festival-2023",
                "title": "Festival de Arte Comunitario 2023",
                "date": "2023-11-15",
                "location": "Plaza de Santo Domingo, CDMX",
                "description": "Exhibición anual de los trabajos realizados en nuestros talleres comunitarios."
            },
            {
                "id": "taller-pintura",
                "title": "Taller de Pintura para Niños",
                "date": "2023-12-05",
                "location": "Centro Cultural del Arte, CDMX",
                "description": "Taller gratuito para niños de 6 a 12 años. Materiales incluidos."
            }
        ];
        
        this.displayEvents(exampleEvents);
    },

    // Mostrar eventos en el formulario
    displayEvents: function(events) {
        const eventsContainer = this.formContainer.querySelector('#events-list-container');
        eventsContainer.innerHTML = events.map(event => `
            <div class="event-card">
                <h4 class="event-title">${event.title}</h4>
                <p class="event-date">Fecha: ${this.formatDate(event.date)}</p>
                <p class="event-location">Lugar: ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <div class="event-actions">
                    <button class="events-secondary-btn">Más información</button>
                </div>
            </div>
        `).join('');
    },

    // Formatear fecha
    formatDate: function(dateString) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'UTC'
        };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    },

    // Enviar nuevo evento
    submitEvent: function() {
        const title = document.getElementById('event-title').value;
        const description = document.getElementById('event-description').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        const location = document.getElementById('event-location').value;
        const image = document.getElementById('event-image').value;

        // Validación básica
        if (!title || !description || !date || !time || !location) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        // Crear objeto de evento
        const newEvent = {
            id: `event-${Date.now()}`,
            title,
            description,
            date: `${date}T${time}:00`,
            location,
            image: image || 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 1000)
        };

        // Aquí normalmente enviarías el evento a un servidor
        console.log('Evento enviado:', newEvent);
        
        // Simular éxito de envío
        alert('¡Evento enviado con éxito! Será revisado por nuestro equipo.');
        this.hideForm();
        
        // Limpiar formulario
        document.getElementById('event-submission-form').reset();
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    // Escuchar evento para abrir el formulario desde otros componentes
    document.addEventListener('openEventsForm', function() {
        EventsFormManager.showForm();
    });
    
    // También puedes abrirlo directamente desde un botón
    document.querySelectorAll('[data-open-events-form]').forEach(button => {
        button.addEventListener('click', () => {
            const event = new Event('openEventsForm');
            document.dispatchEvent(event);
        });
    });
});

// Función para cargar y mostrar eventos en la página principal
function loadAndDisplayEvents() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(events => {
            const eventsContainer = document.getElementById('events-container');
            
            if (!eventsContainer) {
                console.error('No se encontró el contenedor de eventos');
                return;
            }

            eventsContainer.innerHTML = events.map(event => `
                <div class="event-card-main">
                    <img src="${event.image}" alt="${event.title}" class="event-image">
                    <div class="event-content">
                        <h3 class="event-title-main">${event.title}</h3>
                        <p class="event-date-main">${formatEventDate(event.date)} a las ${event.time}</p>
                        <p class="event-location-main">Lugar: ${event.location}</p>
                        <p class="event-description-main">${event.description}</p>
                        <button class="events-secondary-btn">Más información</button>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error al cargar los eventos:', error);
            document.getElementById('events-container').innerHTML = `
                <p style="text-align: center; grid-column: 1 / -1;">No se pudieron cargar los eventos. Por favor intenta más tarde.</p>
            `;
        });
}

// Función para formatear la fecha del evento
function formatEventDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}



// Cargar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayEvents();
    
    // Configurar el botón de registro
    const registerBtn = document.querySelector('.register-event-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            const event = new Event('openEventsForm');
            document.dispatchEvent(event);
        });
    }
});

