document.addEventListener('DOMContentLoaded', () => {
    const memberGrid = document.getElementById('member-grid');
    const loader = document.getElementById('loader');

    // Fetch the list of members
    fetch('members/members.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load member list. Make sure members/members.json exists.');
            }
            return response.json();
        })
        .then(members => {
            if (!Array.isArray(members)) {
                throw new Error('members.json should contain an array of member IDs.');
            }

            if (members.length === 0) {
                loader.innerHTML = '<p>No members found yet. Be the first to join!</p>';
                return;
            }

            // Hide loader when we start fetching individual data
            loader.style.display = 'none';

            // Fetch each member's data concurrently
            const fetchPromises = members.map(memberId => {
                return fetch(`members/${memberId}.json`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(err => {
                        console.error(`Failed to load data for ${memberId}`, err);
                        return null; // Return null if fetch fails to keep the Promise.all from failing completely
                    });
            });

            Promise.all(fetchPromises)
                .then(memberDataList => {
                    // Filter out any failed loads
                    const validMembers = memberDataList.filter(data => data !== null);
                    
                    if (validMembers.length === 0) {
                        memberGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Could not load individual member data.</p>';
                        return;
                    }

                    // Render cards with a staggered animation delay
                    validMembers.forEach((data, index) => {
                        const delay = index * 0.1; // 0.1s stagger between cards
                        const card = createMemberCard(data, delay);
                        memberGrid.appendChild(card);
                    });
                });
        })
        .catch(error => {
            console.error(error);
            loader.innerHTML = `<p style="color: #ef4444;">Error loading members: ${error.message}</p>`;
        });
});

/**
 * Creates a DOM element for a member card
 * @param {Object} member - The member data object
 * @param {number} delay - Animation delay in seconds
 * @returns {HTMLElement}
 */
function createMemberCard(member, delay) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.style.animationDelay = `${delay}s`;

    // Extract first letter for avatar, fallback to '?'
    const initial = member.name ? member.name.charAt(0).toUpperCase() : '?';
    
    // Parse link to determine domain and suitable icon
    const linkInfo = getLinkInfo(member.link || '#');

    card.innerHTML = `
        <div class="avatar">${initial}</div>
        <h2 class="member-name">${escapeHTML(member.name)}</h2>
        ${member.title ? `<div class="member-title">${escapeHTML(member.title)}</div>` : ''}
        <p class="member-bio">${escapeHTML(member.bio || '')}</p>
        <a href="${escapeHTML(member.link || '#')}" target="_blank" rel="noopener noreferrer" class="social-btn">
            ${linkInfo.svg}
            ${escapeHTML(linkInfo.label)}
        </a>
    `;

    return card;
}

/**
 * Analyzes a URL and returns appropriate icon and label
 */
function getLinkInfo(urlStr) {
    const info = {
        label: 'Visit Link',
        // Default Link Icon
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
    };

    if (!urlStr || urlStr === '#') return info;

    try {
        const url = new URL(urlStr);
        const domain = url.hostname.toLowerCase();
        
        // Use domain name as default label, stripping out www. for a cleaner look
        info.label = domain.replace(/^www\./, '');

        if (domain.includes('github.com')) {
            info.label = 'GitHub';
            info.svg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
        } else if (domain.includes('linkedin.com')) {
            info.label = 'LinkedIn';
            info.svg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;
        } else if (domain.includes('instagram.com')) {
            info.label = 'Instagram';
            info.svg = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
        }
    } catch (e) {
        // Ignore invalid URLs, return default info
    }

    return info;
}

/**
 * Basic HTML escaping to prevent XSS from user-submitted JSON
 */
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
