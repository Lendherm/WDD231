document.addEventListener("DOMContentLoaded", () => {
    // Select HTML elements in the document
    const locationElement = document.querySelector('#location');
    const temperatureElement = document.querySelector('#temperature');
    const weatherDescriptionElement = document.querySelector('#weather-description');
    const weatherIconElement = document.querySelector('#weather-icon');
    const weatherCaptionElement = document.querySelector('#weather-caption');

    if (!locationElement || !temperatureElement || !weatherDescriptionElement || !weatherIconElement || !weatherCaptionElement) {
        console.error("Uno o más elementos no existen en el DOM.");
        return;
    }

    // API URL with query parameters (replace YOUR_API_KEY with your actual API key)
    const apiKey = '23c5b55d5da420cffada3e9319b79193'; // Replace with your OpenWeatherMap API key
    const city = 'Mexico City'; // Replace with your desired city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    // Fetch weather data from the API
    async function fetchWeather() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const data = await response.json();
            console.log(data); // For testing
            displayWeather(data); // Display weather data in the HTML
        } catch (error) {
            console.error("Error al obtener los datos del clima:", error);
            displayError('Failed to fetch weather data. Please try again later.');
        }
    }

    function displayWeather(data) {
        if (!data || !data.main || !data.weather) {
            console.error("Datos del clima inválidos");
            return;
        }

        // Update location
        locationElement.textContent = `${data.name}, ${data.sys.country}`;

        // Update temperature
        temperatureElement.textContent = `🌡️ ${Math.round(data.main.temp)}°F`;

        // Update weather description
        const description = data.weather[0].description;
        weatherDescriptionElement.textContent = `☁️ ${description.charAt(0).toUpperCase() + description.slice(1)}`;

        // Update weather icon
        const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIconElement.setAttribute('src', iconUrl);
        weatherIconElement.setAttribute('alt', description);
        weatherCaptionElement.textContent = description;
    }

    // Display an error message
    function displayError(message) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        document.body.appendChild(errorElement);
    }

    // Call the fetchWeather function to start the process
    fetchWeather();
});
