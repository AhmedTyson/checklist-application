import { Config } from './Config.js';
import { Utils } from './Utils.js';

export class UIManager {
    constructor() {
        this.elements = {
            tableBody: document.getElementById('table-body'),
            searchInput: document.getElementById('search-input'),
            resultCount: document.getElementById('result-count'),
            noResults: document.getElementById('no-results'),
            paginationNumbers: document.getElementById('page-numbers'),
            prevBtn: document.getElementById('prev-page'),
            nextBtn: document.getElementById('next-page'),
            loader: document.getElementById('loader'),
            subjectListContainer: document.getElementById('subject-list-container'),
            subjectTags: document.getElementById('subject-tags'),
            clearBtn: document.getElementById('clear-filters'),
            memeContainer: document.getElementById('meme-container'),
            noResultsText: document.getElementById('no-results-text'),
            pagination: document.getElementById('pagination')
        };
        this.currentMode = 'search'; 
    }

    setMode(mode) {
        this.currentMode = mode;
    }

    renderTable(data, currentPage, searchTerm) {
        const start = (currentPage - 1) * Config.ROWS_PER_PAGE;
        const end = start + Config.ROWS_PER_PAGE;
        const pageData = data.slice(start, end);

        this.elements.tableBody.innerHTML = '';
        
        if (pageData.length === 0) {
            // Check Friday filter from state passed? 
            // Better to pass isFriday boolean or filter object.
            // For now, let's assume we handle it in renderNoResults argument.
            // But we need to know the 'day' filter.
            // Let's rely on the caller to pass 'day' filter or isFriday.
            return; // renderNoResults called by caller or we need to handle it here.
        }
        
        // We need to signal that we have results
        this.elements.noResults.classList.add('hidden');
        this.elements.memeContainer.innerHTML = '';
        this.elements.resultCount.textContent = data.length;

        const fragment = document.createDocumentFragment();
        pageData.forEach(item => {
            const tr = document.createElement('tr');
            const subjectDisplay = Utils.getSubjectDisplay(item.subject);
            tr.innerHTML = `
                <td class="subject-cell" data-label="Subject">${Utils.highlightText(subjectDisplay, searchTerm)}</td>
                <td class="group-cell" data-label="Group">${Utils.highlightText(item.group, searchTerm)}</td>
                <td class="doctor-cell" data-label="Doctor">
                    <div class="doctor-stack">
                        <span class="doctor-ar">${Utils.highlightText(item.doctorAr, searchTerm)}</span>
                        <span class="doctor-en">${Utils.highlightText(item.doctorEn, searchTerm)}</span>
                    </div>
                </td>
                <td data-label="Day">${Utils.highlightText(item.day, searchTerm)}</td>
                <td data-label="Time">${Utils.highlightText(item.time, searchTerm)}</td>
                <td data-label="Room">${Utils.highlightText(item.room, searchTerm)}</td>
                <td data-label="Code">
                    <div class="code-wrapper">
                        <span class="code-cell">${Utils.highlightText(item.code, searchTerm)}</span>
                        <button class="copy-btn" title="Copy Code" data-code="${item.code}">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </td>
            `;
            fragment.appendChild(tr);
        });
        this.elements.tableBody.appendChild(fragment);

        this.initCopyButtons();
        this.renderPagination(data.length, currentPage);
    }

    renderNoResults(isFriday, suggestions = [], onSelect = null) {
        this.elements.noResults.classList.remove('hidden');
        this.elements.resultCount.textContent = '0';
        this.elements.paginationNumbers.innerHTML = '';
        this.elements.prevBtn.disabled = true;
        this.elements.nextBtn.disabled = true;

        const ghostIcon = this.elements.noResults.querySelector('.fa-ghost');

        if (isFriday) {
            const randomMeme = Math.floor(Math.random() * Config.FRIDAY_MEME_COUNT) + 1;
            this.elements.memeContainer.innerHTML = `<img src="assets/meme-friday-${randomMeme}.webp" alt="Friday Meme" class="meme-img">`;
            this.elements.noResultsText.textContent = "Enjoy your Friday! No schedules, just vibes. 😎";
            if (ghostIcon) ghostIcon.classList.add('hidden');
        } else {
            this.elements.memeContainer.innerHTML = '';
            if (ghostIcon) ghostIcon.classList.add('hidden');
            
            this.elements.noResultsText.innerHTML = `
                <div class="empty-state-container">
                    <i class="fa-solid fa-ghost empty-state-icon"></i>
                    <h3>No matching schedules found</h3>
                    <p>We couldn't find any sessions for your current filters.<br>Try adjusting your search or clearing filters.</p>
                    <div class="suggestion" onclick="document.querySelector('.clear-btn-styled').click()">Clear all filters</div>
                </div>
            `;

            // Render "Did you mean?" if suggestions exist
            if (suggestions && suggestions.length > 0 && onSelect) {
                const suggestionContainer = document.createElement('div');
                suggestionContainer.className = 'did-you-mean-container';
                suggestionContainer.innerHTML = 'Did you mean: ';
                
                // Show top 3 suggestions max
                const topSuggestions = suggestions.slice(0, 3);
                
                topSuggestions.forEach((item, index) => {
                    const link = document.createElement('span');
                    link.className = 'did-you-mean-link';
                    link.textContent = item.display;
                    link.onclick = () => onSelect(item.text);
                    
                    suggestionContainer.appendChild(link);
                    
                    if (index < topSuggestions.length - 1) {
                        suggestionContainer.appendChild(document.createTextNode(', '));
                    }
                });
                
                this.elements.memeContainer.appendChild(suggestionContainer);
            }
        }
    }

    renderPagination(totalItems, currentPage, onPageChange) {
        // Note: onPageChange callback needs to be passed or handled by event listeners
        // Here we render buttons and assume they trigger something.
        // In the modular design, we should pass a callback or set onclick.
        // Let's update method signature to accept onPageChange.
        
        const maxPage = Math.ceil(totalItems / Config.ROWS_PER_PAGE);
        this.elements.paginationNumbers.innerHTML = '';

        if (maxPage <= 1) {
            this.elements.pagination.classList.add('hidden');
            return;
        }
        this.elements.pagination.classList.remove('hidden');

        this.elements.prevBtn.disabled = currentPage === 1;
        this.elements.nextBtn.disabled = currentPage === maxPage;

        for (let i = 1; i <= maxPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            // We need to attach the event listener
            // We can't attach it here easily if onPageChange is not passed.
            // So we will assume onPageChange IS passed.
             if (onPageChange) {
                btn.onclick = () => onPageChange(i);
             }
            this.elements.paginationNumbers.appendChild(btn);
        }
    }

    initCopyButtons() {
        this.elements.tableBody.querySelectorAll('.copy-btn').forEach(btn => {
            btn.onclick = async () => {
                const code = btn.dataset.code;
                try {
                    await navigator.clipboard.writeText(code);
                    const icon = btn.querySelector('i');
                    icon.className = 'fa-solid fa-check';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        icon.className = 'fa-regular fa-copy';
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            };
        });
    }
    
    setLoading(isLoading) {
        if (!this.elements.loader) return;
        
        if (isLoading) {
            this.elements.loader.classList.remove('fade-out');
            
            // Show Skeleton Rows if we are in Search Mode
            if (this.currentMode === 'search') {
                if (this.elements.tableBody) {
                    this.elements.tableBody.innerHTML = Array(5).fill(0).map(() => `
                        <tr class="skeleton-row">
                            <td><div class="skeleton-box subject"></div></td>
                            <td><div class="skeleton-box time"></div></td>
                            <td><div class="skeleton-box doctor"></div></td>
                            <td><div class="skeleton-box group"></div></td>
                            <td><div class="skeleton-box"></div></td>
                        </tr>
                    `).join('');
                }
            }
        } else {
            this.elements.loader.classList.add('fade-out');
        }
    }



    renderRoomFinderResults(rooms, day, time) {
        const resultsContainer = document.getElementById('room-results-container');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = '';
        
        // 1. Context Header
        const header = document.createElement('div');
        header.className = 'room-results-header';
        
        if (rooms.length === 0) {
            header.innerHTML = `
                <div class="no-rooms-state">
                    <i class="fa-solid fa-ghost"></i>
                    <h3>No Rooms Available</h3>
                    <p>Every room is booked for <span>${day}</span> at <span>${time}</span>.</p>
                </div>
            `;
            resultsContainer.appendChild(header);
            return;
        }

        header.innerHTML = `
            <h3><i class="fa-solid fa-door-open"></i> Available Rooms <span class="count-badge">${rooms.length}</span></h3>
            <p class="results-meta">for <span class="highlight">${day}</span> at <span class="highlight">${time}</span></p>
        `;
        resultsContainer.appendChild(header);

        // 2. Grid of Rich Cards
        const grid = document.createElement('div');
        grid.className = 'room-grid-rich'; // New class for premium grid
        
        rooms.forEach((room, index) => {
            const isLab = room.toLowerCase().includes('lab');
            const iconClass = isLab ? 'fa-solid fa-computer' : 'fa-solid fa-chalkboard-user';
            const roomType = isLab ? 'Lab' : 'Hall';
            
            const card = document.createElement('div');
            card.className = 'room-card';
            card.style.animationDelay = `${index * 50}ms`; // Staggered animation
            
            card.innerHTML = `
                <div class="room-card-icon ${isLab ? 'is-lab' : ''}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="room-card-content">
                    <span class="room-type">${roomType}</span>
                    <span class="room-number">${room.replace(/(Hall|Lab)\s*/i, '')}</span>
                </div>
                <div class="room-status" title="Available"></div>
            `;
            

            
            grid.appendChild(card);
        });

        resultsContainer.appendChild(grid);
    }
}
