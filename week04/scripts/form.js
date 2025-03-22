document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const email = document.getElementById("email");
    const errorMessage = document.getElementById("password-error");
    const rangeInput = document.getElementById("rating");
    const rangeValue = document.getElementById("rangeValue");

    function validatePasswords() {
        if (password.value !== confirmPassword.value) {
            errorMessage.textContent = "Passwords do not match!";
            password.value = "";
            confirmPassword.value = "";
            password.focus();
            return false;
        }
        return true;
    }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@byui\.edu$/;
        if (!emailPattern.test(email.value)) {
            email.setCustomValidity("Please enter a valid @byui.edu email address");
        } else {
            email.setCustomValidity("");
        }
    }

    function clearError() {
        errorMessage.textContent = "";
    }

    password.addEventListener("input", clearError);
    confirmPassword.addEventListener("input", clearError);
    email.addEventListener("input", validateEmail);
    
    rangeInput.addEventListener("input", function () {
        rangeValue.textContent = rangeInput.value;
    });

    form.addEventListener("submit", function (event) {
        if (!validatePasswords()) {
            event.preventDefault();
        }
        validateEmail();
    });
});