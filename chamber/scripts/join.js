document.addEventListener("DOMContentLoaded", () => {
    // Set timestamp when form loads
    const now = new Date();
    document.getElementById("timestamp").value = now.toISOString();

    // Modal functionality
    const modals = document.querySelectorAll(".modal");
    const openModalButtons = document.querySelectorAll(".open-modal");
    const closeModalButtons = document.querySelectorAll(".close-modal");

    // Open modal
    openModalButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = button.getAttribute("href");
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
            }
        });
    });

    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modals.forEach(modal => {
                if (modal.style.display === "flex") {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }
    });

    // Form validation for organization title pattern
    const titleInput = document.getElementById("organizationTitle");
    if (titleInput) {
        titleInput.addEventListener("input", function() {
            const pattern = /^[A-Za-záéíóúñÑ\s\-]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity("El cargo debe contener solo letras, espacios y guiones, con mínimo 7 caracteres.");
            } else {
                this.setCustomValidity("");
            }
        });
    }

    // Add focus styles for accessibility
    const form = document.getElementById("membershipForm");
    if (form) {
        const focusableElements = form.querySelectorAll('input, select, textarea, button, a');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--accent-purple)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
            });
        });
    }
});