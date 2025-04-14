// donation-manager.js
const DonationManager = {
    formContainer: null,
    overlay: null,

    init: function() {
        this.formContainer = document.getElementById('donation-form-container');
        this.overlay = document.querySelector('.donation-overlay');
        
        if (!this.formContainer) {
            this.createFormContainer();
        }
        
        this.setupEvents();
    },

    createFormContainer: function() {
        this.formContainer = document.createElement('div');
        this.formContainer.id = 'donation-form-container';
        document.body.appendChild(this.formContainer);
        
        this.overlay = document.createElement('div');
        this.overlay.className = 'donation-overlay';
        document.body.appendChild(this.overlay);
        
        this.renderFormContent();
    },

    renderFormContent: function() {
        this.formContainer.innerHTML = `
            <div class="donation-form-wrapper">
                <div class="donation-header">
                    <h2>Apoya Nuestra Causa</h2>
                    <button class="donation-close-button">×</button>
                </div>
                <form id="donation-form" class="donation-form">
                    <div class="donation-options">
                        <h3>Selecciona tu aportación</h3>
                        ${this.generateDonationOptions()}
                    </div>
                    
                    <div class="donor-info">
                        <h3>Tus datos</h3>
                        ${this.generateDonorForm()}
                    </div>
                    
                    <button type="submit" class="donation-submit-btn">Realizar Donación</button>
                </form>
            </div>
        `;
    },

    generateDonationOptions: function() {
        return `
            <div class="donation-amounts">
                <label><input type="radio" name="amount" value="200" checked> $200</label>
                <label><input type="radio" name="amount" value="500"> $500</label>
                <label><input type="radio" name="amount" value="1000"> $1,000</label>
                <label><input type="radio" name="amount" value="custom"> Otro monto: 
                    <input type="number" name="customAmount" disabled>
                </label>
            </div>
            
            <div class="donation-frequency">
                <h4>Frecuencia</h4>
                <label><input type="radio" name="frequency" value="one-time" checked> Única</label>
                <label><input type="radio" name="frequency" value="monthly"> Mensual</label>
            </div>
        `;
    },

    generateDonorForm: function() {
        return `
            <div class="form-group">
                <input type="text" name="name" placeholder="Nombre completo" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Correo electrónico" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Teléfono">
            </div>
            <div class="form-group">
                <textarea name="message" placeholder="Mensaje (opcional)"></textarea>
            </div>
        `;
    },

    setupEvents: function() {
        // Toggle custom amount input
        document.querySelectorAll('input[name="amount"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const customInput = document.querySelector('input[name="customAmount"]');
                customInput.disabled = e.target.value !== 'custom';
            });
        });

        // Close button
        document.querySelector('.donation-close-button').addEventListener('click', () => {
            this.hideForm();
        });

        // Overlay click
        this.overlay.addEventListener('click', () => {
            this.hideForm();
        });

        // Form submission
        document.getElementById('donation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processDonation(new FormData(e.target));
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

    processDonation: function(formData) {
        // In a real implementation, this would process the payment
        console.log('Donation data:', Object.fromEntries(formData));
        alert('¡Gracias por tu donación! Tu apoyo hace posible nuestro trabajo.');
        this.hideForm();
    }
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    DonationManager.init();
    
    // Event to open donation form from buttons
    document.addEventListener('openDonationForm', function() {
        DonationManager.showForm();
    });
});