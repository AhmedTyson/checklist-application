import { Config } from './Config.js';
import { Utils } from './Utils.js';
import { Icons } from './Icons.js';

export class UIManager {
    #elements = {};
    #currentMode = 'search';
    #paginationCallback = null;
    #currentPage = 1;

    constructor() {
        this.#initElements();
        this.#initGlobalListeners();
    }

    #initElements() {
        const ids = [
            'table-body', 'search-input', 'result-count', 'no-results', 
            'page-numbers', 'prev-page', 'next-page', 'loader', 
            'subject-list-container', 'subject-tags', 'clear-filters', 
            'meme-container', 'no-results-text', 'pagination', 'fab-scroll-top'
        ];
        ids.forEach(id => {
            const camelKey = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            this.#elements[camelKey] = document.getElementById(id);
        });
        
        // Manual mapping for special cases/shorthand
        this.#elements.paginationNumbers = this.#elements.pageNumbers;
        this.#elements.prevBtn = this.#elements.prevPage; // Shorthand for usage elsewhere
        this.#elements.nextBtn = this.#elements.nextPage; // Shorthand for usage elsewhere
    }

    #initGlobalListeners() {
        // Event Delegation for Copy Buttons
        this.#elements.tableBody?.addEventListener('click', async (e) => {
            const btn = e.target.closest('.copy-btn');
            if (!btn) return;

            const { code } = btn.dataset;
            try {
                await navigator.clipboard.writeText(code);
                this.#handleCopySuccess(btn);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });

        // FAB Scroll Top
        this.#elements.fabScrollTop?.addEventListener('click', () => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Throttled Scroll Listener for FAB
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (this.#elements.fabScrollTop) {
                        this.#elements.fabScrollTop.classList.toggle('visible', window.scrollY > 400);
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

    }

    #handleCopySuccess(btn) {
        const iconContainer = btn.querySelector('.icon-wrapper');
        const originalIcon = iconContainer.innerHTML;
        
        iconContainer.innerHTML = Icons.check;
        btn.classList.add('copied');
        
        setTimeout(() => {
            iconContainer.innerHTML = originalIcon;
            btn.classList.remove('copied');
        }, 2000);
    }

    get elements() { return this.#elements; }
    
    setMode(mode) { this.#currentMode = mode; }

    async switchView(mode, views) {
        const tabs = document.querySelectorAll('.view-tab');
        const tabPill = document.querySelector('.view-tab-pill');

        // 1. Update State immediately
        this.#currentMode = mode;

        // 2. toggle active class on tabs (Visual only, cheap)
        tabs.forEach(t => t.classList.toggle('active', t.dataset.view === mode));

        // 3. Move Pill (Optimized: Read Layout BEFORE style changes)
        const nextActiveTab = Array.from(tabs).find(t => t.dataset.view === mode);
        const container = document.querySelector('.view-switcher');
        
        if (nextActiveTab && tabPill && container) {
             // READ layout (forced reflow if done after writes, but fine before)
             const containerRect = container.getBoundingClientRect();
             const tabRect = nextActiveTab.getBoundingClientRect();
             
             tabPill.style.width = `${tabRect.width}px`;
             tabPill.style.left = `${tabRect.left - containerRect.left}px`;
        }

        // 4. Swap Views (No Await/Delay - Instant Swap with CSS Animations)
        Object.entries(views).forEach(([key, ids]) => {
            const isMatch = (key === mode);
            const viewEl = document.getElementById(ids.view);
            const ctrlsEl = document.getElementById(ids.ctrls);

            if (isMatch) {
                viewEl?.classList.remove('hidden');
                ctrlsEl?.classList.remove('hidden');
            } else {
                viewEl?.classList.add('hidden');
                ctrlsEl?.classList.add('hidden');
            }
        });
    }

    scrollToResults(capturedScroll) {
        // Use the scroll value captured BEFORE DOM changes to avoid forced reflow
        if (capturedScroll < 300) return;

        requestAnimationFrame(() => {
            const thead = document.querySelector('thead');
            if (thead) {
                thead.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    renderTable(data, currentPage, searchTerm) {
        const start = (currentPage - 1) * Config.ROWS_PER_PAGE;
        const pageData = data.slice(start, start + Config.ROWS_PER_PAGE);

        if (!this.#elements.tableBody) return;
        this.#elements.tableBody.innerHTML = '';
        
        if (!pageData.length) return;
        
        this.#elements.noResults?.classList.add('hidden');
        if (this.#elements.memeContainer) this.#elements.memeContainer.innerHTML = '';
        if (this.#elements.resultCount) this.#elements.resultCount.textContent = data.length;

        const fragment = document.createDocumentFragment();
        pageData.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = this.#getRowTemplate(item, searchTerm);
            fragment.appendChild(tr);
        });
        this.#elements.tableBody.appendChild(fragment);
    }

    #getRowTemplate(item, searchTerm) {
        const subjectDisplay = Utils.getSubjectDisplay(item.subject);
        const highlight = (text) => Utils.highlightText(text, searchTerm);

        return `
            <td class="subject-cell" data-label="Subject">${highlight(subjectDisplay)}</td>
            <td class="group-cell" data-label="Group">${highlight(item.group)}</td>
            <td class="doctor-cell" data-label="Doctor">
                <div class="doctor-stack">
                    <span class="doctor-ar">${highlight(item.doctorAr)}</span>
                    <span class="doctor-en">${highlight(item.doctorEn)}</span>
                </div>
            </td>
            <td data-label="Day">${highlight(item.day)}</td>
            <td data-label="Time">${highlight(item.time)}</td>
            <td data-label="Room">${highlight(item.room)}</td>
            <td data-label="Code">
                <div class="code-wrapper">
                    <span class="code-cell">${highlight(item.code)}</span>
                    <button class="copy-btn" title="Copy Code" aria-label="Copy Code" data-code="${item.code}">
                        <span class="icon-wrapper">${Icons.copy}</span>
                    </button>
                </div>
            </td>
        `;
    }

    renderNoResults(isFriday, suggestions = [], onSelect = null) {
        const el = this.#elements;
        el.noResults?.classList.remove('hidden');
        el.pagination?.classList.add('hidden');
        if (el.resultCount) el.resultCount.textContent = '0';
        if (el.paginationNumbers) el.paginationNumbers.innerHTML = '';
        if (el.prevBtn) el.prevBtn.disabled = true;
        if (el.nextBtn) el.nextBtn.disabled = true;

        if (isFriday) {
            this.#renderFridayState();
        } else {
            this.#renderEmptyState(suggestions, onSelect);
        }
    }

    #renderFridayState() {
        if (!this.#elements.memeContainer) return;
        const randomMeme = Math.floor(Math.random() * Config.FRIDAY_MEME_COUNT) + 1;
        this.#elements.memeContainer.innerHTML = `<img src="assets/meme-friday-${randomMeme}.webp" alt="Friday Meme" class="meme-img" width="400" height="300">`;
        if (this.#elements.noResultsText) this.#elements.noResultsText.textContent = "Enjoy your Friday! No schedules, just vibes. 😎";
    }

    #renderEmptyState(suggestions, onSelect) {
        if (!this.#elements.noResultsText) return;
        this.#elements.noResultsText.innerHTML = `
            <div class="empty-state-container">
                <div class="empty-state-icon">${Icons.ghost}</div>
                <h3>No matching schedules found</h3>
                <p>We couldn't find any sessions for your current filters.<br>Try adjusting your search or clearing filters.</p>
                <div class="suggestion" onclick="document.querySelector('.clear-btn-styled').click()">Clear all filters</div>
            </div>
        `;

        if (suggestions?.length && onSelect) {
            this.#renderSuggestions(suggestions, onSelect);
        }
    }

    #renderSuggestions(suggestions, onSelect) {
        if (!this.#elements.memeContainer) return;
        const container = document.createElement('div');
        container.className = 'did-you-mean-container';
        container.innerHTML = 'Did you mean: ';
        
        suggestions.slice(0, 3).forEach((item, index, arr) => {
            const link = document.createElement('span');
            link.className = 'did-you-mean-link';
            link.textContent = item.display;
            link.onclick = () => onSelect(item.text);
            container.appendChild(link);
            if (index < arr.length - 1) container.appendChild(document.createTextNode(', '));
        });
        
        this.#elements.memeContainer.appendChild(container);
    }

    renderPagination(totalItems, currentPage, onPageChange) {
        // Store callback and state
        this.#paginationCallback = onPageChange;
        this.#currentPage = currentPage; // Sync internal state
        
        const el = this.#elements;
        if (el.pagination) {
            el.pagination.dataset.currentPage = currentPage;
        }

        const maxPage = Math.ceil(totalItems / Config.ROWS_PER_PAGE);
        
        if (el.paginationNumbers) el.paginationNumbers.innerHTML = '';
        el.pagination?.classList.toggle('hidden', maxPage <= 1);
        
        if (maxPage <= 1) return;

        if (el.prevBtn) {
            el.prevBtn.disabled = currentPage === 1;
            // Direct binding - Simple and robust
            el.prevBtn.onclick = () => {
                if (currentPage > 1) onPageChange(currentPage - 1);
            };
        }
        
        if (el.nextBtn) {
            // Ensure strict comparison and type safety
            el.nextBtn.disabled = currentPage >= maxPage;
            // Direct binding - Simple and robust
            el.nextBtn.onclick = () => {
                 if (currentPage < maxPage) onPageChange(currentPage + 1);
            };
        }

        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= maxPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            // Direct binding for numbers
            btn.onclick = () => {
                if (i !== currentPage) onPageChange(i);
            };
            fragment.appendChild(btn);
        }
        el.paginationNumbers?.appendChild(fragment);
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            if (this.#currentMode === 'search') this.#renderSkeletons();
        } else {
            // Hide full page loader if it exists
            if (this.#elements.loader && !this.#elements.loader.classList.contains('fade-out')) {
                this.#elements.loader.classList.add('fade-out');
                setTimeout(() => {
                    this.#elements.loader.classList.add('hidden');
                }, 500); // Match CSS transition duration
            }
        }
    }

    #renderSkeletons() {
        this.#elements.tableBody.innerHTML = Array(5).fill(`
            <tr class="skeleton-row">
                <td><div class="skeleton-box subject"></div></td>
                <td><div class="skeleton-box time"></div></td>
                <td><div class="skeleton-box doctor"></div></td>
                <td><div class="skeleton-box group"></div></td>
                <td><div class="skeleton-box"></div></td>
            </tr>
        `).join('');
    }

    renderRoomFinderResults(rooms, day, time) {
        const container = document.getElementById('room-results-container');
        if (!container) return;

        container.innerHTML = '';
        
        if (!rooms.length) {
            container.innerHTML = `
                <div class="room-results-header">
                    <div class="no-rooms-state">
                        ${Icons.ghost}
                        <h3>No Rooms Available</h3>
                        <p>Every room is booked for <span>${day}</span> at <span>${time}</span>.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="room-results-header">
                <h4>Available Rooms <span class="count-badge">${rooms.length}</span></h4>
                <p class="results-meta">for <span class="highlight">${day}</span> at <span class="highlight">${time}</span></p>
            </div>
            <div class="room-grid-rich">
                ${rooms.map((room, i) => this.#getRoomCardTemplate(room, i)).join('')}
            </div>
        `;
    }

    #getRoomCardTemplate(room, index) {
        const isLab = room.toLowerCase().includes('lab');
        const type = isLab ? 'Lab' : 'Hall';
        const num = room.replace(/(Hall|Lab)\s*/i, '');

        return `
            <div class="room-card ${isLab ? 'is-lab' : ''}" style="--delay: ${index * 50}ms">
                <div class="room-card-content">
                    <span class="room-type">${type}</span>
                    <span class="room-number">${num}</span>
                </div>
                <div class="room-status" title="Available"></div>
            </div>
        `;
    }
}
