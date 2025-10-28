// chamber/scripts/directory.js - VERSIÓN OPTIMIZADA CON DOM REDUCIDO
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const directoryContent = document.getElementById('directory-content');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const retryBtn = document.getElementById('retry-btn');
    const memberCount = document.getElementById('member-count');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNavigation = document.getElementById('main-navigation');
    
    let members = [];
    let currentView = 'grid';

    // Initialize the directory
    async function initDirectory() {
        try {
            console.log('Starting directory initialization...');
            showLoadingState();
            
            members = await loadMembers();
            console.log('Members loaded successfully:', members.length);
            
            hideLoadingState();
            updateMemberCount();
            displayMembers();
            setupEventListeners();
        } catch (error) {
            console.error('Error initializing directory:', error);
            showErrorState();
        }
    }

    // Load members from JSON
    async function loadMembers() {
        try {
            const response = await fetch('./data/members.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('JSON data loaded:', data);
            
            return data.members || data;
        } catch (error) {
            console.error('Error loading members:', error);
            throw error;
        }
    }

    // Display members based on current view
    function displayMembers() {
        if (!directoryContent) {
            console.error('Directory content element not found');
            return;
        }
        
        directoryContent.innerHTML = '';
        
        if (members.length === 0) {
            displayEmptyState();
            return;
        }
        
        if (currentView === 'grid') {
            displayGridView();
        } else {
            displayListView();
        }
    }

    // Display grid view
    function displayGridView() {
        directoryContent.className = 'directory-grid';
        
        members.forEach(member => {
            const memberCard = createMemberCard(member);
            directoryContent.appendChild(memberCard);
        });
    }

    // Display list view
    function displayListView() {
        directoryContent.className = 'directory-list';
        
        members.forEach(member => {
            const listItem = createMemberListItem(member);
            directoryContent.appendChild(listItem);
        });
    }

    // Display empty state
    function displayEmptyState() {
        directoryContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏢</div>
                <h3>No hay miembros para mostrar</h3>
                <p>Actualmente no hay empresas miembros en el directorio.</p>
            </div>
        `;
    }

    // Create member card for grid view - VERSIÓN SIMPLIFICADA
    function createMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        const membershipClass = getMembershipClass(member.membership_level);
        const membershipText = getMembershipText(member.membership_level);
        
        // VERSIÓN SIMPLIFICADA - Solo 5 elementos por tarjeta (antes: 8+)
        card.innerHTML = `
            <div class="logo-placeholder">
                <span>${getInitials(member.name)}</span>
            </div>
            <h3>${member.name}</h3>
            <div class="member-details">
                <p class="member-address">${member.address}</p>
                <p class="member-phone">${member.phone}</p>
                <a href="${ensureHttpProtocol(member.website)}" target="_blank" rel="noopener noreferrer" class="member-website">Visitar sitio web</a>
            </div>
            <span class="membership-level ${membershipClass}">${membershipText}</span>
        `;
        
        return card;
    }

    // Helper function to get initials
    function getInitials(companyName) {
        return companyName
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }

    // Create member list item for list view - VERSIÓN SIMPLIFICADA
    function createMemberListItem(member) {
        const listItem = document.createElement('div');
        listItem.className = 'member-list-item';
        
        const membershipClass = getMembershipClass(member.membership_level);
        const membershipText = getMembershipText(member.membership_level);
        
        // VERSIÓN SIMPLIFICADA - Solo 1 contenedor principal
        listItem.innerHTML = `
            <div class="list-content">
                <h3>${member.name}</h3>
                <span class="member-phone">${member.phone}</span>
                <a href="${ensureHttpProtocol(member.website)}" target="_blank" rel="noopener noreferrer" class="member-website">Sitio Web</a>
                <span class="membership-level ${membershipClass}">${membershipText}</span>
            </div>
        `;
        
        return listItem;
    }

    // Ensure website URLs have proper protocol
    function ensureHttpProtocol(url) {
        if (!url || url === '#') return '#';
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    }

    // Get membership level CSS class
    function getMembershipClass(level) {
        const levelMap = {
            1: 'membership-bronze',
            2: 'membership-silver', 
            3: 'membership-gold'
        };
        return levelMap[level] || 'membership-bronze';
    }

    // Get membership level text
    function getMembershipText(level) {
        const textMap = {
            1: 'Bronce',
            2: 'Plata',
            3: 'Oro'
        };
        return textMap[level] || 'Miembro';
    }

    // Update member count display
    function updateMemberCount() {
        if (memberCount) {
            memberCount.textContent = members.length;
        }
    }

    // Show loading state
    function showLoadingState() {
        if (loadingState) loadingState.classList.remove('hidden');
        if (directoryContent) directoryContent.classList.add('hidden');
        if (errorState) errorState.classList.add('hidden');
    }

    // Hide loading state
    function hideLoadingState() {
        if (loadingState) loadingState.classList.add('hidden');
        if (directoryContent) directoryContent.classList.remove('hidden');
    }

    // Show error state
    function showErrorState() {
        if (errorState) errorState.classList.remove('hidden');
        if (loadingState) loadingState.classList.add('hidden');
        if (directoryContent) directoryContent.classList.add('hidden');
    }

    // Setup event listeners
    function setupEventListeners() {
        // View toggle buttons
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', function() {
                currentView = 'grid';
                updateViewButtons();
                displayMembers();
            });
        }

        if (listViewBtn) {
            listViewBtn.addEventListener('click', function() {
                currentView = 'list';
                updateViewButtons();
                displayMembers();
            });
        }

        // Retry button
        if (retryBtn) {
            retryBtn.addEventListener('click', function() {
                initDirectory();
            });
        }

        // Mobile menu toggle
        if (menuToggle && mainNavigation) {
            menuToggle.addEventListener('click', function() {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
                mainNavigation.classList.toggle('nav-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!mainNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainNavigation.classList.remove('nav-open');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainNavigation.classList.remove('nav-open');
                }
            });
        }

        // Keyboard navigation for view toggle
        const viewButtons = [gridViewBtn, listViewBtn].filter(btn => btn !== null);
        viewButtons.forEach(btn => {
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            // Close mobile menu on resize to larger screen
            if (window.innerWidth > 768) {
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
                if (mainNavigation) {
                    mainNavigation.classList.remove('nav-open');
                }
            }
        });
    }

    // Update view buttons active state
    function updateViewButtons() {
        const isGrid = currentView === 'grid';
        
        if (gridViewBtn) {
            gridViewBtn.classList.toggle('active', isGrid);
            gridViewBtn.setAttribute('aria-pressed', isGrid.toString());
        }
        
        if (listViewBtn) {
            listViewBtn.classList.toggle('active', !isGrid);
            listViewBtn.setAttribute('aria-pressed', (!isGrid).toString());
        }
    }

    // Initialize the directory
    initDirectory();
});