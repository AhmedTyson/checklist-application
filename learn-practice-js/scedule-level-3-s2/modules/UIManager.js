import { Config } from './Config.js';
import { Utils } from './Utils.js';

export class UIManager {
    #elements = {};
    #currentMode = 'search';

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

        window.addEventListener('scroll', () => {
            if (this.#elements.fabScrollTop) {
                this.#elements.fabScrollTop.classList.toggle('visible', window.scrollY > 400);
            }
        });
    }

    #handleCopySuccess(btn) {
        const icon = btn.querySelector('i');
        const originalClass = icon.className;
        
        icon.className = 'fa-solid fa-check';
        btn.classList.add('copied');
        
        setTimeout(() => {
            icon.className = originalClass;
            btn.classList.remove('copied');
        }, 2000);
    }

    get elements() { return this.#elements; }
    
    setMode(mode) { this.#currentMode = mode; }

    async switchView(mode, views) {
        const tabs = document.querySelectorAll('.view-tab');
        const tabPill = document.querySelector('.view-tab-pill');

        const updatePill = (mode) => {
            const activeTab = Array.from(tabs).find(t => t.dataset.view === mode);
            if (activeTab && tabPill) {
                tabPill.style.left = `${activeTab.offsetLeft}px`;
                tabPill.style.width = `${activeTab.offsetWidth}px`;
            }
        };

        // 1. Identify current active view to animate it out
        const activeIds = Object.values(views).find(v => {
            const el = document.getElementById(v.view);
            return el && !el.classList.contains('hidden');
        });
        
        if (activeIds && activeIds.view !== views[mode].view) {
             const oldView = document.getElementById(activeIds.view);
             const oldCtrls = document.getElementById(activeIds.ctrls);
             
             if (oldView) oldView.classList.add('view-exit');
             if (oldCtrls) oldCtrls.classList.add('view-exit');
             
             await new Promise(r => setTimeout(r, 250)); // Wait for half of animation
             
             if (oldView) oldView.classList.remove('view-exit');
             if (oldCtrls) oldCtrls.classList.remove('view-exit');
        }

        // 2. Perform the actual swap
        tabs.forEach(t => t.classList.toggle('active', t.dataset.view === mode));
        updatePill(mode);

        Object.entries(views).forEach(([key, ids]) => {
            const isMatch = (key === mode);
            document.getElementById(ids.ctrls)?.classList.toggle('hidden', !isMatch);
            document.getElementById(ids.view)?.classList.toggle('hidden', !isMatch);
        });
        
        this.#currentMode = mode;
    }

    scrollToResults() {
        const thead = document.querySelector('thead');
        if (thead && thead.getBoundingClientRect().top < 0) {
            window.scrollTo({ top: window.scrollY + thead.getBoundingClientRect().top - 100, behavior: 'smooth' });
        }
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
                    <button class="copy-btn" title="Copy Code" data-code="${item.code}">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                </div>
            </td>
        `;
    }

    renderNoResults(isFriday, suggestions = [], onSelect = null) {
        const el = this.#elements;
        el.noResults?.classList.remove('hidden');
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
        this.#elements.memeContainer.innerHTML = `<img src="assets/meme-friday-${randomMeme}.webp" alt="Friday Meme" class="meme-img">`;
        if (this.#elements.noResultsText) this.#elements.noResultsText.textContent = "Enjoy your Friday! No schedules, just vibes. 😎";
    }

    #renderEmptyState(suggestions, onSelect) {
        if (!this.#elements.noResultsText) return;
        this.#elements.noResultsText.innerHTML = `
            <div class="empty-state-container">
                <i class="fa-solid fa-ghost empty-state-icon"></i>
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
        const maxPage = Math.ceil(totalItems / Config.ROWS_PER_PAGE);
        const el = this.#elements;
        
        if (el.paginationNumbers) el.paginationNumbers.innerHTML = '';
        el.pagination?.classList.toggle('hidden', maxPage <= 1);
        
        if (maxPage <= 1) return;

        if (el.prevBtn) el.prevBtn.disabled = currentPage === 1;
        if (el.nextBtn) el.nextBtn.disabled = currentPage === maxPage;

        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= maxPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.onclick = () => onPageChange?.(i);
            fragment.appendChild(btn);
        }
        el.paginationNumbers?.appendChild(fragment);
    }
    
    setLoading(isLoading) {
        const loader = this.#elements.loader;
        if (!loader) return;
        
        if (isLoading) {
            loader.classList.remove('fade-out');
            if (this.#currentMode === 'search') this.#renderSkeletons();
        } else {
            loader.classList.add('fade-out');
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
                        <i class="fa-solid fa-ghost"></i>
                        <h3>No Rooms Available</h3>
                        <p>Every room is booked for <span>\${day}</span> at <span>\${time}</span>.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="room-results-header">
                <h3><i class="fa-solid fa-door-open"></i> Available Rooms <span class="count-badge">\${rooms.length}</span></h3>
                <p class="results-meta">for <span class="highlight">\${day}</span> at <span class="highlight">\${time}</span></p>
            </div>
            <div class="room-grid-rich">
                \${rooms.map((room, i) => this.#getRoomCardTemplate(room, i)).join('')}
            </div>
        `;
    }

    #getRoomCardTemplate(room, index) {
        const isLab = room.toLowerCase().includes('lab');
        const icon = isLab ? 'fa-solid fa-computer' : 'fa-solid fa-chalkboard-user';
        const type = isLab ? 'Lab' : 'Hall';
        const num = room.replace(/(Hall|Lab)\s*/i, '');

        return `
            <div class="room-card" style="animation-delay: \${index * 50}ms">
                <div class="room-card-icon \${isLab ? 'is-lab' : ''}">
                    <i class="\${icon}"></i>
                </div>
                <div class="room-card-content">
                    <span class="room-type">\${type}</span>
                    <span class="room-number">\${num}</span>
                </div>
                <div class="room-status" title="Available"></div>
            </div>
        `;
    }
}
