/**
 * BIS Schedule Search - Modular Refactor
 * Based on GitHub "feature/git-roadmap" branch logic
 */

import { Config } from './modules/Config.js';
import { Utils } from './modules/Utils.js';
import { CustomSelect } from './modules/CustomSelect.js';
import { DataService } from './modules/DataService.js';
import { UIManager } from './modules/UIManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // 0. WIDGET MODE DETECTION
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'widget') {
        document.body.classList.add('widget-mode');
    }

    class App {
        constructor() {
            this.state = {
                filters: { search: '', subject: 'all', group: 'all', day: 'all' },
                currentPage: 1,
                filteredData: []
            };
            this.dataService = new DataService();
            this.ui = new UIManager();
            this.dropdowns = {};
        }

        async init() {
            window.addEventListener('click', (e) => {
                 CustomSelect.closeAll();
            });

            this.initEventListeners();
            this.initViewSwitcher();
            
            try {
                this.ui.toggleLoader(true);
                const data = await this.dataService.fetchData();
                this.state.filteredData = data; // Initial state
                
                this.initFilters(data);
                this.handleFilterChange();
                
            } catch (error) {
                 this.ui.elements.noResults.innerHTML = `<div style="color: var(--danger);">Error loading data: ${error.message}</div>`;
                 this.ui.elements.noResults.classList.remove('hidden');
            } finally {
                this.ui.toggleLoader(false);
            }
        }

        initFilters(data) {
            // Dropdowns
            ['subject-dropdown', 'group-dropdown', 'day-dropdown'].forEach(id => {
                this.dropdowns[id] = new CustomSelect(id, (dropdownId, value) => {
                    const key = dropdownId.split('-')[0];
                    this.state.filters[key] = value;
                    this.handleFilterChange();
                });
            });

            // Subjects Tags and Highlight Box
            const subjects = [...new Set(data.map(item => item.subject).filter(Boolean))].sort();
            if (subjects.length > 0) this.ui.elements.subjectListContainer.classList.remove('hidden');

            const subjectOptions = document.getElementById('subject-options');
            const subjectFilter = document.getElementById('subject-filter'); // hidden select

            subjects.forEach(subject => {
                // To Options
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = subject;
                opt.textContent = subject;
                subjectOptions.appendChild(opt);

                // To hidden select
                if (subjectFilter) {
                    const nativeOpt = document.createElement('option');
                    nativeOpt.value = subject;
                    nativeOpt.textContent = subject;
                    subjectFilter.appendChild(nativeOpt);
                }

                // To Tags
                const tag = document.createElement('span');
                tag.className = 'subject-tag';
                tag.textContent = subject;
                tag.onclick = () => this.dropdowns['subject-dropdown'].select(subject, subject);
                this.ui.elements.subjectTags.appendChild(tag);
            });

            // Groups
            // Note: DataService.getUniqueValues uses simple sort, but GitHub app.js has specific sort logic for groups
            // We'll implement that specific sort here or reuse DataService if we updated it.
            // I'll stick to the logic seen in app.js.github
            const groups = [...new Set(data.map(item => item.group).filter(Boolean))].sort((a, b) => {
                const numA = parseInt(a.replace(/\D/g, '')) || 0;
                const numB = parseInt(b.replace(/\D/g, '')) || 0;
                return numA - numB || a.localeCompare(b);
            });
            
            const groupOptions = document.getElementById('group-options');
            const groupFilter = document.getElementById('group-filter'); // hidden select

            groups.forEach(group => {
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = group;
                opt.textContent = group;
                groupOptions.appendChild(opt);

                if (groupFilter) {
                    const nativeOpt = document.createElement('option');
                    nativeOpt.value = group;
                    nativeOpt.textContent = group;
                    groupFilter.appendChild(nativeOpt);
                }
            });

            this.initRoomFinder();
        }

        initViewSwitcher() {
            const tabs = document.querySelectorAll('.view-tab');
            const tabPill = document.querySelector('.view-tab-pill');
            const views = {
                'schedule': {
                    controls: document.getElementById('schedule-controls'),
                    content: document.getElementById('schedule-view')
                },
                'rooms': {
                    controls: document.getElementById('room-controls'),
                    content: document.getElementById('room-view')
                }
            };
            
            const updatePill = (mode) => {
                const activeTab = Array.from(tabs).find(t => t.dataset.view === mode);
                if (activeTab && tabPill) {
                    tabPill.style.left = `${activeTab.offsetLeft}px`;
                    tabPill.style.width = `${activeTab.offsetWidth}px`;
                }
            };

            // Check URL param for initial view
            const urlParams = new URLSearchParams(window.location.search);
            const viewParam = urlParams.get('view');
            const initialView = (viewParam === 'rooms') ? 'rooms' : 'schedule';
            
            const switchView = (mode) => {
                // Update tabs
                tabs.forEach(tab => {
                    if (tab.dataset.view === mode) tab.classList.add('active');
                    else tab.classList.remove('active');
                });
                
                updatePill(mode);

                // Toggle Views
                Object.keys(views).forEach(key => {
                    if (key === mode) {
                        if (views[key].controls) views[key].controls.classList.remove('hidden');
                        if (views[key].content) views[key].content.classList.remove('hidden');
                    } else {
                        if (views[key].controls) views[key].controls.classList.add('hidden');
                        if (views[key].content) views[key].content.classList.add('hidden');
                    }
                });
                
                // Update URL (pushState) only if not in widget mode or distinct
                if (window.history.pushState) {
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set('view', mode);
                    window.history.pushState({ view: mode }, '', newUrl);
                }
            };

            tabs.forEach(tab => {
                tab.onclick = () => switchView(tab.dataset.view);
            });
            
            // Set initial state without pushing state (replaceState or just run)
            // Need a slight delay to ensure offsetLeft/width are calculated after CSS loads
            setTimeout(() => {
                switchView(initialView);
            }, 100);
        }

        initRoomFinder() {
            // Populate Days
            const days = this.dataService.getUniqueValues('day');
            const roomDayOptions = document.getElementById('room-day-options');
            const roomDayInput = document.getElementById('room-day-input');
            
            if (roomDayOptions) {
                roomDayOptions.innerHTML = '';
                days.forEach(day => {
                    const opt = document.createElement('div');
                    opt.className = 'option';
                    opt.dataset.value = day;
                    opt.textContent = day;
                    roomDayOptions.appendChild(opt);
                });
            }
            
            // Populate Times
            const times = this.dataService.getUniqueValues('time');
            const roomTimeOptions = document.getElementById('room-time-options');
            const roomTimeInput = document.getElementById('room-time-input');

            if (roomTimeOptions) {
                roomTimeOptions.innerHTML = '';
                 times.forEach(time => {
                    const opt = document.createElement('div');
                    opt.className = 'option';
                    opt.dataset.value = time;
                    opt.textContent = time;
                    roomTimeOptions.appendChild(opt);
                });
            }

            // Initialize Room Finder Dropdowns (if not already done)
             if (!this.dropdowns['room-day-dropdown']) {
                 this.dropdowns['room-day-dropdown'] = new CustomSelect('room-day-dropdown', (id, val) => {
                     if (roomDayInput) roomDayInput.value = val;
                 });
             }
             if (!this.dropdowns['room-time-dropdown']) {
                 this.dropdowns['room-time-dropdown'] = new CustomSelect('room-time-dropdown', (id, val) => {
                     if (roomTimeInput) roomTimeInput.value = val;
                 });
             }

            // Init Find Button
            const findBtn = document.getElementById('find-rooms-btn');
            if (findBtn) {
                findBtn.onclick = () => {
                    const day = roomDayInput ? roomDayInput.value : '';
                    const time = roomTimeInput ? roomTimeInput.value : '';
                    
                    const resultsContainer = document.getElementById('room-results-container');
                    
                    if (!day || !time || day === 'Select Day' || time === 'Select Time') {
                         if (resultsContainer) {
                              resultsContainer.innerHTML = '<div class="no-rooms" style="color: var(--danger); text-align: center; padding: 2rem;">Please select both a valid Day and Time.</div>';
                         }
                        return;
                    }
                    
                    this.ui.toggleLoader(true);
                    setTimeout(() => {
                        const emptyRooms = this.dataService.findEmptyRooms(day, time);
                        this.ui.renderRoomFinderResults(emptyRooms, day, time);
                        this.ui.toggleLoader(false);
                    }, 300);
                };
            }
        }

        initEventListeners() {
            // Search Input with Debounce? The GitHub version does NOT use debounce in initEventListeners!
            // It uses `input` event directly: `State.filters.search = e.target.value; this.handleFilterChange();`
            // Wait, filtering every keystroke without debounce might be heavy but that's what the "better" version does?
            // "better search" might refer to the sorting/ranking, not performance.
            // I will Add debounce anyway because it IS better practice, but keep it small.
            // actually, app.js.github does NOT have debounce. 
            // I'll stick to the GitHub version's logic unless it's noticeably slow. 
            // Or I can add a small debounce (50ms).
            // I'll use Utils.debounce but with a small delay or just stick to direct.
            // Let's use direct to be faithful to the "better" version requested, 
            // assuming the user might prefer immediate feedback.
            
            const handleInput = (e) => {
                this.state.filters.search = e.target.value;
                this.handleFilterChange();
            };

            this.ui.elements.searchInput.addEventListener('input', handleInput);
            
            this.ui.elements.clearBtn.onclick = () => {
                this.ui.elements.searchInput.value = '';
                this.state.filters = { search: '', subject: 'all', group: 'all', day: 'all' };
                Object.values(this.dropdowns).forEach(d => d.reset());
                this.handleFilterChange();
            };

            this.ui.elements.prevBtn.onclick = () => {
                if (this.state.currentPage > 1) {
                    this.state.currentPage--;
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };

            this.ui.elements.nextBtn.onclick = () => {
                const maxPage = Math.ceil(this.state.filteredData.length / Config.ROWS_PER_PAGE);
                if (this.state.currentPage < maxPage) {
                    this.state.currentPage++;
                    this.render();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        }

        handleFilterChange() {
            this.state.filteredData = this.dataService.filterData(this.state.filters);
            this.state.currentPage = 1;
            
            // Update Active State for Subject Tags
            const subjectTags = this.ui.elements.subjectTags.children;
            const currentSubject = this.state.filters.subject;
            
            Array.from(subjectTags).forEach(tag => {
                if (tag.textContent === currentSubject) {
                    tag.classList.add('active');
                } else {
                    tag.classList.remove('active');
                }
            });

            this.render();
            
            // Smooth scroll back to table header
            const tableRect = document.querySelector('thead').getBoundingClientRect();
            if (tableRect.top < 0) {
                window.scrollTo({ top: window.scrollY + tableRect.top - 100, behavior: 'smooth' });
            }
        }
        
        render() {
             if (this.state.filteredData.length === 0) {
                 this.ui.renderTable([], this.state.currentPage, this.state.filters.search); // Clears table
                 
                 // Fetch suggestions if search term exists
                 const searchTerm = this.state.filters.search;
                 let suggestions = [];
                 if (searchTerm && searchTerm.length >= 2) {
                     suggestions = this.dataService.getSuggestions(searchTerm);
                 }

                 this.ui.renderNoResults(
                     this.state.filters.day === 'Friday',
                     suggestions,
                     (selectedText) => {
                         this.ui.elements.searchInput.value = selectedText;
                         this.state.filters.search = selectedText;
                         this.handleFilterChange();
                     }
                 );
             } else {
                 this.ui.renderTable(this.state.filteredData, this.state.currentPage, this.state.filters.search);
                 // We need to re-attach pagination listeners or handle them in UIManager
                 // In my UIManager implementation I added onPageChange callback to renderPagination.
                 // So I need to call it here.
                 this.ui.renderPagination(this.state.filteredData.length, this.state.currentPage, (page) => {
                     this.state.currentPage = page;
                     this.render();
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                 });
             }
        }
    }

    new App().init();
});
