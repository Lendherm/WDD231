// chamber/scripts/spotlights.js - VERSIÓN CON PLACEHOLDER DE INICIALES
document.addEventListener('DOMContentLoaded', function() {
    loadSpotlights();
});

async function loadSpotlights() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Handle different possible JSON structures
        let members = [];
        if (Array.isArray(data)) {
            members = data;
        } else if (data.members && Array.isArray(data.members)) {
            members = data.members;
        } else {
            throw new Error('Invalid JSON structure');
        }
        
        console.log('Total members loaded:', members.length);
        
        // Filter gold (level 3) and silver (level 2) members
        const qualifiedMembers = members.filter(member => {
            const level = member.membership_level || member.level;
            return level === 3 || level === 2;
        });
        
        console.log('Qualified members (gold/silver):', qualifiedMembers.length);
        
        if (qualifiedMembers.length === 0) {
            displayNoSpotlights();
            return;
        }
        
        // Select 2-3 random members
        const count = Math.min(qualifiedMembers.length, 3);
        const randomMembers = getRandomMembers(qualifiedMembers, count);
        
        console.log('Displaying spotlights:', randomMembers);
        displaySpotlights(randomMembers);
    } catch (error) {
        console.error('Error loading spotlights:', error);
        displaySpotlightsError();
    }
}

function getRandomMembers(members, count) {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...members];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    if (!container) {
        console.error('Spotlights container not found');
        return;
    }
    
    container.innerHTML = '';
    
    members.forEach((member) => {
        const level = member.membership_level || member.level;
        const membershipLevelText = level === 3 ? 'GOLD' : 'SILVER';
        const membershipLevelClass = level === 3 ? 'gold' : 'silver';
        const initials = getInitials(member.name);
        
        const card = document.createElement('div');
        card.className = `spotlight-card ${membershipLevelClass}`;
        
        card.innerHTML = `
            <div class="logo-placeholder">
                <span>${initials}</span>
            </div>
            <h3>${member.name || 'Empresa'}</h3>
            <div class="member-details">
                <p class="member-address">${member.address || 'Dirección no disponible'}</p>
                <p class="member-phone">${member.phone || 'Teléfono no disponible'}</p>
                ${member.website ? 
                    `<a href="${ensureHttpProtocol(member.website)}" target="_blank" rel="noopener" class="member-website">Visitar sitio web</a>` 
                    : '<p class="no-website">Sitio web no disponible</p>'
                }
            </div>
            ${member.extra_info ? `<p class="extra-info">${member.extra_info}</p>` : ''}
            <span class="membership-level ${membershipLevelClass}">${membershipLevelText}</span>
        `;
        
        container.appendChild(card);
    });
}

// Helper function to get initials (copiada de directory.js)
function getInitials(companyName) {
    if (!companyName) return '??';
    return companyName
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// Ensure website URLs have proper protocol (copiada de directory.js)
function ensureHttpProtocol(url) {
    if (!url || url === '#') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
}

function displayNoSpotlights() {
    const container = document.getElementById('spotlights-container');
    if (container) {
        container.innerHTML = '<p class="no-spotlights">No hay empresas destacadas disponibles en este momento.</p>';
    }
}

function displaySpotlightsError() {
    const container = document.getElementById('spotlights-container');
    if (container) {
        container.innerHTML = '<p class="error-message">Error al cargar las empresas destacadas. Por favor, intente más tarde.</p>';
    }
}