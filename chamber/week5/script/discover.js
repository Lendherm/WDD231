document.addEventListener('DOMContentLoaded', function() {
    // Load menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Track last visit
    trackLastVisit();
    
    // Load points of interest
    loadPointsOfInterest();
});

function trackLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    const messageElement = document.querySelector('.visit-message');
    const daysElement = document.getElementById('days-since-visit');

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        daysElement.textContent = "0";
    } else {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));
        daysElement.textContent = daysBetween;

        if (daysBetween < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysBetween === 1 ? "day" : "days";
            messageElement.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
}

async function loadPointsOfInterest() {
    try {
        const response = await fetch('./data/points-of-interest.json');
        if (!response.ok) {
            throw new Error('Failed to load points of interest');
        }
        
        const data = await response.json();
        const grid = document.getElementById('discover-grid');
        
        data.pointsOfInterest.forEach((poi, index) => {
            const card = document.createElement('article');
            card.className = 'poi-card';
            card.id = `card${index + 1}`;
            
            card.innerHTML = `
                <h2>${poi.name}</h2>
                <figure>
                    <img src="${poi.image}" alt="${poi.name}" loading="lazy">
                </figure>
                <address>${poi.address}</address>
                <p>${poi.description}</p>
                <a href="#" class="learn-more">Learn More</a>
            `;
            
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading points of interest:', error);
        const grid = document.getElementById('discover-grid');
        grid.innerHTML = '<p class="error">Unable to load points of interest. Please try again later.</p>';
    }
}