document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    updateFooterDates();
    trackLastVisit();
    loadPointsOfInterest();
});

function updateFooterDates() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    
    const yearElement = document.getElementById('currentYear');
    const lastModifiedElement = document.getElementById('lastModified');
    
    if (yearElement) yearElement.textContent = currentYear;
    if (lastModifiedElement) lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
}

function trackLastVisit() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    const messageElement = document.getElementById('visit-message');

    if (!messageElement) {
        console.error('Visit message element not found');
        return;
    }

    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.borderColor = '#c3e6cb';
        messageElement.style.color = '#155724';
    } else {
        const daysBetween = Math.floor((currentVisit - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysBetween < 1) {
            // Less than a day
            messageElement.textContent = "Back so soon! Awesome!";
            messageElement.style.backgroundColor = '#d1ecf1';
            messageElement.style.borderColor = '#bee5eb';
            messageElement.style.color = '#0c5460';
        } else {
            // Multiple days
            const dayText = daysBetween === 1 ? "day" : "days";
            messageElement.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
            messageElement.style.backgroundColor = '#fff3cd';
            messageElement.style.borderColor = '#ffeaa7';
            messageElement.style.color = '#856404';
        }
    }

    // Store current visit
    localStorage.setItem('lastVisit', currentVisit.toString());
}

async function loadPointsOfInterest() {
    const grid = document.getElementById('discover-grid');
    
    if (!grid) {
        console.error('Discover grid element not found');
        return;
    }

    // Show loading state
    grid.innerHTML = '<div class="loading">Loading points of interest...</div>';

    try {
        const response = await fetch('./data/points-of-interest.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.pointsOfInterest || !Array.isArray(data.pointsOfInterest)) {
            throw new Error('Invalid data format');
        }
        
        renderPointsOfInterest(data.pointsOfInterest);
        
    } catch (error) {
        console.error('Error loading points of interest:', error);
        displayErrorMessage('Unable to load points of interest. Please check your internet connection and try again.');
    }
}

function renderPointsOfInterest(points) {
    const grid = document.getElementById('discover-grid');
    
    // Clear loading state
    grid.innerHTML = '<h2 class="visually-hidden">Points of Interest in Mexico City</h2>';
    
    points.forEach((poi, index) => {
        const card = createPOICard(poi, index + 1);
        grid.appendChild(card);
    });
}

function createPOICard(poi, cardNumber) {
    const card = document.createElement('article');
    card.className = 'poi-card';
    card.id = `card${cardNumber}`;
    
    // Create image with error handling
    const img = new Image();
    img.src = poi.image;
    img.alt = poi.name;
    img.loading = 'lazy';
    img.width = 300;
    img.height = 200;
    
    img.onerror = function() {
        // If image fails to load, use a placeholder
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        this.alt = `Placeholder for ${poi.name}`;
    };
    
    card.innerHTML = `
        <h2>${escapeHTML(poi.name)}</h2>
        <figure>
            ${img.outerHTML}
        </figure>
        <address>${escapeHTML(poi.address)}</address>
        <p>${escapeHTML(poi.description)}</p>
        <button class="learn-more" aria-label="Learn more about ${escapeHTML(poi.name)}">
            Learn More
        </button>
    `;
    
    // Add click handler for learn more button
    const learnMoreBtn = card.querySelector('.learn-more');
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPOIDetails(poi);
    });
    
    return card;
}

function showPOIDetails(poi) {
    // Create a modal or alert with more information
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 500px; margin: 20px;">
            <h2 style="color: #002a5c; margin-bottom: 15px;">${escapeHTML(poi.name)}</h2>
            <p><strong>Address:</strong> ${escapeHTML(poi.address)}</p>
            <p><strong>Description:</strong> ${escapeHTML(poi.description)}</p>
            <button onclick="this.closest('div[style]').remove()" 
                    style="margin-top: 20px; padding: 10px 20px; background: #002a5c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function displayErrorMessage(message) {
    const grid = document.getElementById('discover-grid');
    if (grid) {
        grid.innerHTML = `<div class="error">${escapeHTML(message)}</div>`;
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Make functions available globally for modal functionality
window.showPOIDetails = showPOIDetails;