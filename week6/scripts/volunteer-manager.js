// volunteer-manager.js
const VolunteerManager = {
    formContainer: null,
    overlay: null,

    init: function() {
        this.formContainer = document.getElementById('volunteer-form-container');
        this.overlay = document.querySelector('.volunteer-overlay');
        
        if (!this.formContainer) {
            this.createFormContainer();
        }
        
        this.setupEvents();
    },

    createFormContainer: function() {
        this.formContainer = document.createElement('div');
        this.formContainer.id = 'volunteer-form-container';
        document.body.appendChild(this.formContainer);
        
        this.overlay = document.createElement('div');
        this.overlay.className = 'volunteer-overlay';
        document.body.appendChild(this.overlay);
        
        this.renderFormContent();
    },

    renderFormContent: function() {
        this.formContainer.innerHTML = `
            <div class="volunteer-form-wrapper">
                <div class="volunteer-header">
                    <h2>Únete como Voluntario</h2>
                    <button class="volunteer-close-button">×</button>
                </div>
                <form id="volunteer-form" class="volunteer-form">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Nombre completo" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Correo electrónico" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Teléfono" required>
                    </div>
                    
                    <div class="form-group">
                        <select name="interest" required>
                            <option value="">Área de interés</option>
                            <option value="teaching">Enseñanza</option>
                            <option value="art">Arte</option>
                            <option value="music">Música</option>
                            <option value="logistics">Logística</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <textarea name="experience" placeholder="Cuéntanos sobre tus habilidades y experiencia"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="availability" required>
                            Estoy disponible los fines de semana
                        </label>
                    </div>
                    
                    <button type="submit" class="volunteer-submit-btn">Enviar Solicitud</button>
                </form>
            </div>
        `;
    },

    setupEvents: function() {
        // Close button
        document.querySelector('.volunteer-close-button').addEventListener('click', () => {
            this.hideForm();
        });

        // Overlay click
        this.overlay.addEventListener('click', () => {
            this.hideForm();
        });

        // Form submission
        document.getElementById('volunteer-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitVolunteerForm(new FormData(e.target));
        });
    },

    showForm: function() {
        this.formContainer.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hideForm: function() {
        this.formContainer.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    },

    submitVolunteerForm: function(formData) {
        // In a real implementation, this would send to a server
        console.log('Volunteer data:', Object.fromEntries(formData));
        alert('¡Gracias por tu interés en ser voluntario! Nos pondremos en contacto contigo pronto.');
        this.hideForm();
    }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    VolunteerManager.init();
    
    // Event to open volunteer form from buttons
    document.addEventListener('openVolunteerForm', function() {
        VolunteerManager.showForm();
    });
});