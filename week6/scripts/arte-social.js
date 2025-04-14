// arte-social.js
const ArteSocialManager = {
    // Initialize all components
    init: function() {
        this.initTestimonials();
        this.initPrograms();
        this.initEvents();
        this.initVolunteerForm();
        this.initDonationForm();
    },

    // Testimonials functionality
    initTestimonials: function() {
        // Load testimonials from JSON
        fetch('./data/testimonials.json')
            .then(response => response.json())
            .then(data => {
                this.displayTestimonials(data);
            });
    },

    displayTestimonials: function(testimonials) {
        const container = document.getElementById('testimonials-container');
        if (!container) return;

        container.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">${testimonial.content}</div>
                <div class="testimonial-author">— ${testimonial.name}, ${testimonial.role}</div>
                <div class="testimonial-location">${testimonial.location}</div>
            </div>
        `).join('');
    },

    // Programs functionality
    initPrograms: function() {
        fetch('./data/programs.json')
            .then(response => response.json())
            .then(data => {
                this.displayPrograms(data);
            });
    },

    displayPrograms: function(programs) {
        const container = document.getElementById('programs-container');
        if (!container) return;

        container.innerHTML = programs.map(program => `
            <div class="program-card">
                <img src="${program.image}" alt="${program.title}" class="program-image">
                <h3 class="program-title">${program.title}</h3>
                <p class="program-description">${program.shortDescription}</p>
                <button class="program-details-btn" data-program-id="${program.id}">Ver detalles</button>
            </div>
        `).join('');
    },

    // Events functionality
    initEvents: function() {
        fetch('./data/events.json')
            .then(response => response.json())
            .then(data => {
                this.displayUpcomingEvents(data);
            });
    },

    displayUpcomingEvents: function(events) {
        const container = document.getElementById('events-container');
        if (!container) return;

        const upcoming = events.filter(event => new Date(event.date) > new Date())
                             .sort((a, b) => new Date(a.date) - new Date(b.date))
                             .slice(0, 3);

        container.innerHTML = upcoming.map(event => `
            <div class="event-card">
                <div class="event-date">${new Date(event.date).toLocaleDateString('es-MX')}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-location">${event.location}</p>
                <button class="event-register-btn" data-event-id="${event.id}">Registrarse</button>
            </div>
        `).join('');
    },

    // Volunteer form functionality
    initVolunteerForm: function() {
        const form = document.getElementById('volunteer-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitVolunteerForm(new FormData(form));
        });
    },

    submitVolunteerForm: function(formData) {
        // Here you would typically send to a server
        console.log('Volunteer form submitted:', Object.fromEntries(formData));
        alert('¡Gracias por tu interés en ser voluntario! Nos pondremos en contacto contigo pronto.');
    },

    // Donation form functionality (similar to affiliate form but for donations)
    initDonationForm: function() {
        const form = document.getElementById('donation-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processDonation(new FormData(form));
        });
    },

    processDonation: function(formData) {
        // Here you would typically process the payment
        console.log('Donation processed:', Object.fromEntries(formData));
        alert('¡Gracias por tu donación! Tu apoyo hace posible nuestro trabajo.');
    }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    ArteSocialManager.init();
});