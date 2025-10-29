// chamber/scripts/weather.js
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '23c5b55d5da420cffada3e9319b79193'; // Consider moving to environment variable
    const city = 'Mexico City';
    const countryCode = 'MX';
    
    // Get current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${apiKey}`;
    
    // Get 5-day forecast (3-hour intervals)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=metric&appid=${apiKey}`;

    // Fetch both current weather and forecast
    Promise.all([
        fetch(currentWeatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json())
    ])
    .then(([currentData, forecastData]) => {
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        displayWeatherError();
    });
});

function displayCurrentWeather(data) {
    const temperatureElement = document.querySelector('#temperature');
    const descriptionElement = document.querySelector('#weather-description');

    if (temperatureElement && data.main) {
        temperatureElement.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
    }
    
    if (descriptionElement && data.weather && data.weather[0]) {
        const description = data.weather[0].description;
        descriptionElement.textContent = `☁️ ${description.charAt(0).toUpperCase() + description.slice(1)}`;
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-container');
    if (!forecastContainer || !data.list) return;

    // Get unique days for 3-day forecast
    const dailyForecasts = [];
    const processedDays = new Set();
    
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toDateString();
        
        // Only take one forecast per day and limit to 3 days
        if (!processedDays.has(day) && processedDays.size < 3) {
            processedDays.add(day);
            dailyForecasts.push({
                date: date,
                temp: Math.round(forecast.main.temp),
                description: forecast.weather[0].description
            });
        }
    });

    forecastContainer.innerHTML = dailyForecasts.map(day => {
        const dayName = day.date.toLocaleDateString('es-ES', { weekday: 'long' });
        const formattedDate = day.date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short' 
        });
        
        return `
            <div class="forecast-day">
                <div class="forecast-date">
                    <strong>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</strong>
                    <span>${formattedDate}</span>
                </div>
                <div class="forecast-temp">${day.temp}°C</div>
                <div class="forecast-desc">${day.description}</div>
            </div>
        `;
    }).join('');
}

function displayWeatherError() {
    const temperatureElement = document.querySelector('#temperature');
    const descriptionElement = document.querySelector('#weather-description');
    const forecastContainer = document.querySelector('#forecast-container');

    if (temperatureElement) {
        temperatureElement.textContent = '🌡️ --°C';
    }
    if (descriptionElement) {
        descriptionElement.textContent = '☁️ Datos no disponibles';
    }
    if (forecastContainer) {
        forecastContainer.innerHTML = `
            <div class="forecast-day">Pronóstico no disponible</div>
        `;
    }
}