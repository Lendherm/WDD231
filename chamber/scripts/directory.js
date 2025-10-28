// chamber/scripts/directory.js
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
            showLoadingState();
            members = await loadMembers();
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
            return data.members || data;
        } catch (error) {
            console.error('Error loading members:', error);
            throw error;
        }
    }

    // Display members based on current view
    function displayMembers() {
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

    // Create member card for grid view
    function createMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        const membershipClass = getMembershipClass(member.membership_level);
        const membershipText = getMembershipText(member.membership_level);
        
        // Use empty src to trigger CSS placeholder
        const imageSrc = member.image ? `./images/members/${member.image}` : '';
        
        card.innerHTML = `
            <img src="${imageSrc}" 
                 alt="Logo de ${member.name}" 
                 class="member-logo" 
                 loading="lazy">
            <h3>${member.name}</h3>
            <div class="member-info">
                <strong>Dirección:</strong>
                <span>${member.address}</span>
            </div>
            <div class="member-info">
                <strong>Teléfono:</strong>
                <span>${member.phone}</span>
            </div>
            <div class="member-info">
                <strong>Sitio Web:</strong>
                <a href="${ensureHttpProtocol(member.website)}" target="_blank" rel="noopener noreferrer" class="member-website">Visitar sitio web</a>
            </div>
            ${member.extra_info ? `
            <div class="member-info">
                <strong>Información:</strong>
                <span>${member.extra_info}</span>
            </div>
            ` : ''}
            <span class="membership-level ${membershipClass}">${membershipText}</span>
        `;
        
        return card;
    }

    // Create member list item for list view
    function createMemberListItem(member) {
        const listItem = document.createElement('div');
        listItem.className = 'member-list-item';
        
        const membershipClass = getMembershipClass(member.membership_level);
        const membershipText = getMembershipText(member.membership_level);
        
        listItem.innerHTML = `
            <h3>${member.name}</h3>
            <div class="member-info">
                <strong>Teléfono:</strong>
                <span>${member.phone}</span>
            </div>
            <div class="member-info">
                <strong>Dirección:</strong>
                <span>${member.address}</span>
            </div>
            <a href="${ensureHttpProtocol(member.website)}" target="_blank" rel="noopener noreferrer" class="member-website">Sitio Web</a>
            <span class="membership-level ${membershipClass}">${membershipText}</span>
        `;
        
        return listItem;
    }

    // Ensure website URLs have proper protocol
    function ensureHttpProtocol(url) {
        if (!url) return '#';
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
                const navList = mainNavigation.querySelector('.nav-list');
                if (navList) {
                    navList.classList.toggle('show');
                    menuToggle.setAttribute('aria-expanded', 
                        navList.classList.contains('show').toString()
                    );
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!mainNavigation.contains(event.target) && !menuToggle.contains(event.target)) {
                    const navList = mainNavigation.querySelector('.nav-list');
                    if (navList && navList.classList.contains('show')) {
                        navList.classList.remove('show');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    const navList = mainNavigation.querySelector('.nav-list');
                    if (navList && navList.classList.contains('show')) {
                        navList.classList.remove('show');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
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
                const navList = mainNavigation?.querySelector('.nav-list');
                if (navList && navList.classList.contains('show')) {
                    navList.classList.remove('show');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
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

// Add this to handle image loading errors globally
document.addEventListener('DOMContentLoaded', function() {
    // Global error handler for images
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('member-logo')) {
            // Let CSS handle the placeholder, but ensure no broken image icon
            e.target.style.display = 'block';
        }
    }, true);
});