document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const directoryContent = document.getElementById('directory-content');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    
    let members = [];
    let currentView = 'grid';

    // Initialize the directory
    async function initDirectory() {
        try {
            members = await loadMembers();
            displayMembers();
            setupEventListeners();
        } catch (error) {
            console.error('Error initializing directory:', error);
            directoryContent.innerHTML = '<p>Error loading member directory. Please try again later.</p>';
        }
    }

    // Load members from JSON
    async function loadMembers() {
        try {
            const response = await fetch('./data/members.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading members:', error);
            throw error;
        }
    }

    // Display members based on current view
    function displayMembers() {
        directoryContent.innerHTML = '';
        
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

    // Create member card for grid view
    function createMemberCard(member) {
        const card = document.createElement('div');
        card.className = 'member-card';
        
        const membershipClass = getMembershipClass(member.membership_level);
        
        card.innerHTML = `
            <img src="${getMemberLogo(member)}" alt="${member.name}" class="member-logo" loading="lazy">
            <h3>${member.name}</h3>
            <div class="member-info">
                <strong>Dirección:</strong> ${member.address}
            </div>
            <div class="member-info">
                <strong>Teléfono:</strong> ${member.phone}
            </div>
            <div class="member-info">
                <strong>Sitio Web:</strong> 
                <a href="${member.website}" target="_blank" class="member-website">Visitar sitio</a>
            </div>
            <div class="member-info">
                <strong>Información:</strong> ${member.extra_info}
            </div>
            <span class="membership-level ${membershipClass}">${member.membership_level}</span>
        `;
        
        return card;
    }

    // Create member list item for list view
    function createMemberListItem(member) {
        const listItem = document.createElement('div');
        listItem.className = 'member-list-item';
        
        const membershipClass = getMembershipClass(member.membership_level);
        
        listItem.innerHTML = `
            <h3>${member.name}</h3>
            <div class="member-info">
                <strong>Teléfono:</strong> ${member.phone}
            </div>
            <div class="member-info">
                <strong>Dirección:</strong> ${member.address}
            </div>
            <div class="member-info">
                <a href="${member.website}" target="_blank" class="member-website">Sitio Web</a>
            </div>
            <span class="membership-level ${membershipClass}">${member.membership_level}</span>
        `;
        
        return listItem;
    }

    // Get membership level CSS class
    function getMembershipClass(level) {
        const levelMap = {
            'Bronze': 'membership-bronze',
            'Silver': 'membership-silver',
            'Gold': 'membership-gold',
            'Platinum': 'membership-platinum'
        };
        return levelMap[level] || 'membership-bronze';
    }

    // Get member logo (using placeholder for now)
    function getMemberLogo(member) {
        // You can replace this with actual logo paths from your members.json
        const logos = [
            "https://dummyimage.com/150x150/002a5c/ffffff.png&text=Business",
            "https://dummyimage.com/150x150/7027e0/ffffff.png&text=Company",
            "https://dummyimage.com/150x150/ec2f4b/ffffff.png&text=Enterprise"
        ];
        return logos[Math.floor(Math.random() * logos.length)];
    }

    // Setup event listeners
    function setupEventListeners() {
        gridViewBtn.addEventListener('click', function() {
            currentView = 'grid';
            updateViewButtons();
            displayMembers();
        });

        listViewBtn.addEventListener('click', function() {
            currentView = 'list';
            updateViewButtons();
            displayMembers();
        });
    }

    // Update view buttons active state
    function updateViewButtons() {
        gridViewBtn.classList.toggle('active', currentView === 'grid');
        listViewBtn.classList.toggle('active', currentView === 'list');
    }

    // Initialize the directory
    initDirectory();
});