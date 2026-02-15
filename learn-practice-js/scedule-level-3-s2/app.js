document.addEventListener('DOMContentLoaded', () => {
    /**
     * 1. CONFIGURATION
     * Centralized settings for the application.
     */
    const Config = {
        DATA_URL: 'scedule-data.json',
        get ROWS_PER_PAGE() {
            const isDesktop = window.innerWidth >= 1200;
            if (isDesktop) return 24;

            // Mobile Scaling Math:
            // Since we zoom out to 1200px, the 'effective height' for our content 
            // is (ScreenHeight / ScreenWidth) * 1200.
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const effectiveHeight = (screenHeight / screenWidth) * 1200;
            
            // Estimates: Header/Controls/Padding take ~450px of vertical space.
            // Each expanded row (24px padding) is ~73px tall.
            const availableHeight = effectiveHeight - 450;
            const calculatedRows = Math.floor(availableHeight / 73);
            
            // Return at least 24, but up to 100 for very tall devices.
            // We adding a buffer of +5 rows to ensure it always fills the screen 
            // and allows for a tiny bit of natural scrolling.
            return Math.min(Math.max(calculatedRows + 5, 24), 100);
        },
        DESKTOP_WIDTH: 1200,
        FRIDAY_MEME_COUNT: 5
    };

    /**
     * 2. STATE MANAGEMENT
     * Holds the data state and filter criteria.
     */
    const State = {
        allData: [],
        filteredData: [],
        currentPage: 1,
        filters: {
            search: '',
            subject: 'all',
            group: 'all',
            day: 'all'
        }
    };

    /**
     * 3. DOM ELEMENTS
     * Grouping references to DOM elements for easier access.
     */
    const Elements = {
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

    /**
     * 4. APP UTILITIES & COMPONENTS
     */
    const Utils = {
        /**
         * Highlights matching search terms using regex.
         */
        highlightText(text, term) {
            if (!term) return text;
            const escapedSearch = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedSearch})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        }
    };

    /**
     * CustomSelect Component Logic
     */
    class CustomSelect {
        constructor(id, onSelect) {
            this.container = document.getElementById(id);
            if (!this.container) return;
            
            this.trigger = this.container.querySelector('.select-trigger');
            this.optionsContainer = this.container.querySelector('.select-options');
            this.hiddenSelect = this.container.parentElement.querySelector('select');
            this.onSelect = onSelect;
            this.id = id;

            this.init();
        }

        init() {
            this.trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.custom-select').forEach(d => {
                    if (d !== this.container) d.classList.remove('active');
                });
                this.container.classList.toggle('active');
            });

            this.container.addEventListener('click', (e) => {
                const option = e.target.closest('.option');
                if (option) {
                    this.select(option.dataset.value, option.textContent);
                }
            });
        }

        select(value, text) {
            this.trigger.querySelector('span').textContent = text;
            this.container.querySelectorAll('.option').forEach(opt => {
                opt.classList.toggle('selected', opt.dataset.value === value);
            });
            this.hiddenSelect.value = value;
            this.container.classList.remove('active');
            if (this.onSelect) this.onSelect(this.id, value);
        }

        reset() {
            const defaultOption = this.container.querySelector('.option[data-value="all"]');
            if (defaultOption) {
                this.select('all', defaultOption.textContent);
            }
        }
    }

    /**
     * 5. VIEW ENGINE
     * Functions responsible for rendering data to the screen.
     */
    const View = {
        renderTable() {
            const start = (State.currentPage - 1) * Config.ROWS_PER_PAGE;
            const end = start + Config.ROWS_PER_PAGE;
            const pageData = State.filteredData.slice(start, end);

            Elements.tableBody.innerHTML = '';
            
            if (pageData.length === 0) {
                this.renderNoResults();
                return;
            }

            Elements.noResults.classList.add('hidden');
            Elements.memeContainer.innerHTML = '';
            Elements.resultCount.textContent = State.filteredData.length;

            pageData.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="subject-cell">${Utils.highlightText(item.subject, State.filters.search)}</td>
                    <td class="group-cell">${Utils.highlightText(item.group, State.filters.search)}</td>
                    <td>${Utils.highlightText(item.doctor, State.filters.search)}</td>
                    <td>${Utils.highlightText(item.day, State.filters.search)}</td>
                    <td>${Utils.highlightText(item.time, State.filters.search)}</td>
                    <td>
                        <div class="code-wrapper">
                            <span class="code-cell">${Utils.highlightText(item.code, State.filters.search)}</span>
                            <button class="copy-btn" title="Copy Code" data-code="${item.code}">
                                <i class="fa-regular fa-copy"></i>
                            </button>
                        </div>
                    </td>
                `;
                Elements.tableBody.appendChild(tr);
            });

            this.initCopyButtons();
            this.renderPagination();
        },

        renderNoResults() {
            Elements.noResults.classList.remove('hidden');
            Elements.resultCount.textContent = '0';
            Elements.paginationNumbers.innerHTML = '';
            Elements.prevBtn.disabled = true;
            Elements.nextBtn.disabled = true;

            const ghostIcon = Elements.noResults.querySelector('.fa-ghost');

            if (State.filters.day === 'Friday') {
                const randomMeme = Math.floor(Math.random() * Config.FRIDAY_MEME_COUNT) + 1;
                Elements.memeContainer.innerHTML = `<img src="assets/meme-friday-${randomMeme}.webp" alt="Friday Meme" class="meme-img">`;
                Elements.noResultsText.textContent = "Enjoy your Friday! No schedules, just vibes. 😎";
                if (ghostIcon) ghostIcon.classList.add('hidden');
            } else {
                Elements.memeContainer.innerHTML = '';
                Elements.noResultsText.textContent = "No matching schedules found.";
                if (ghostIcon) ghostIcon.classList.remove('hidden');
            }
        },

        renderPagination() {
            const maxPage = Math.ceil(State.filteredData.length / Config.ROWS_PER_PAGE);
            Elements.paginationNumbers.innerHTML = '';

            if (maxPage <= 1) {
                Elements.pagination.classList.add('hidden');
                return;
            }
            Elements.pagination.classList.remove('hidden');

            Elements.prevBtn.disabled = State.currentPage === 1;
            Elements.nextBtn.disabled = State.currentPage === maxPage;

            for (let i = 1; i <= maxPage; i++) {
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = `page-btn ${i === State.currentPage ? 'active' : ''}`;
                btn.onclick = () => {
                    State.currentPage = i;
                    this.renderTable();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                Elements.paginationNumbers.appendChild(btn);
            }
        },

        initCopyButtons() {
            Elements.tableBody.querySelectorAll('.copy-btn').forEach(btn => {
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
    };

    /**
     * 6. CORE LOGIC
     */
    const App = {
        dropdowns: {},

        async init() {
            window.addEventListener('click', () => {
                document.querySelectorAll('.custom-select').forEach(d => d.classList.remove('active'));
            });

            this.initEventListeners();
            await this.loadData();
        },

        async loadData() {
            try {
                const response = await fetch(Config.DATA_URL);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                State.allData = await response.json();
                this.initializeUI();
                this.handleFilterChange();
            } catch (error) {
                console.error('Error loading schedule:', error);
                Elements.noResults.innerHTML = `<div style="color: var(--danger);">Error loading data: ${error.message}</div>`;
                Elements.noResults.classList.remove('hidden');
            } finally {
                Elements.loader.classList.add('fade-out');
            }
        },

        initializeUI() {
            // Dropdowns
            ['subject-dropdown', 'group-dropdown', 'day-dropdown'].forEach(id => {
                this.dropdowns[id] = new CustomSelect(id, (dropdownId, value) => {
                    const key = dropdownId.split('-')[0];
                    State.filters[key] = value;
                    this.handleFilterChange();
                });
            });

            // Subjects Tags and Highlight Box
            const subjects = [...new Set(State.allData.map(item => item.subject).filter(Boolean))].sort();
            if (subjects.length > 0) Elements.subjectListContainer.classList.remove('hidden');

            const subjectOptions = document.getElementById('subject-options');
            const groupOptions = document.getElementById('group-options');
            const subjectFilter = document.getElementById('subject-filter');
            const groupFilter = document.getElementById('group-filter');

            subjects.forEach(subject => {
                // To Options
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = subject;
                opt.textContent = subject;
                subjectOptions.appendChild(opt);

                // To hidden select
                const nativeOpt = document.createElement('option');
                nativeOpt.value = subject;
                nativeOpt.textContent = subject;
                subjectFilter.appendChild(nativeOpt);

                // To Tags
                const tag = document.createElement('span');
                tag.className = 'subject-tag';
                tag.textContent = subject;
                tag.onclick = () => this.dropdowns['subject-dropdown'].select(subject, subject);
                Elements.subjectTags.appendChild(tag);
            });

            // Groups
            const groups = [...new Set(State.allData.map(item => item.group).filter(Boolean))].sort((a, b) => {
                const numA = parseInt(a.replace(/\D/g, '')) || 0;
                const numB = parseInt(b.replace(/\D/g, '')) || 0;
                return numA - numB || a.localeCompare(b);
            });

            groups.forEach(group => {
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = group;
                opt.textContent = group;
                groupOptions.appendChild(opt);

                const nativeOpt = document.createElement('option');
                nativeOpt.value = group;
                nativeOpt.textContent = group;
                groupFilter.appendChild(nativeOpt);
            });
        },

        initEventListeners() {
            Elements.searchInput.addEventListener('input', (e) => {
                State.filters.search = e.target.value.toLowerCase().trim();
                this.handleFilterChange();
            });

            Elements.clearBtn.onclick = () => {
                Elements.searchInput.value = '';
                State.filters.search = '';
                Object.values(this.dropdowns).forEach(d => d.reset());
                State.filters.subject = 'all';
                State.filters.group = 'all';
                State.filters.day = 'all';
                this.handleFilterChange();
            };

            Elements.prevBtn.onclick = () => {
                if (State.currentPage > 1) {
                    State.currentPage--;
                    View.renderTable();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            Elements.nextBtn.onclick = () => {
                const maxPage = Math.ceil(State.filteredData.length / Config.ROWS_PER_PAGE);
                if (State.currentPage < maxPage) {
                    State.currentPage++;
                    View.renderTable();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        },

        handleFilterChange() {
            const { search, subject, group, day } = State.filters;
            State.filteredData = State.allData.filter(item => {
                const matchesSearch = !search || Object.values(item).some(v => String(v).toLowerCase().includes(search));
                const matchesSubject = subject === 'all' || item.subject === subject;
                const matchesGroup = group === 'all' || item.group === group;
                const matchesDay = day === 'all' || item.day === day;
                return matchesSearch && matchesSubject && matchesGroup && matchesDay;
            });

            State.currentPage = 1;
            View.renderTable();

            // Smooth scroll back to table header
            const tableRect = document.querySelector('thead').getBoundingClientRect();
            if (tableRect.top < 0) {
                window.scrollTo({ top: window.scrollY + tableRect.top - 100, behavior: 'smooth' });
            }
        }
    };

    App.init();
});
