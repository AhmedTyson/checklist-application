import { Config } from './modules/Config.js';
import { Utils } from './modules/Utils.js';
import { CustomSelect } from './modules/CustomSelect.js';
import { DataService } from './modules/DataService.js';
import { UIManager } from './modules/UIManager.js';

class App {
    #state = {
        filters: { search: '', subject: 'all', group: 'all', day: 'all' },
        currentPage: 1,
        filteredData: []
    };
    #dataService = new DataService();
    #ui = new UIManager();
    #dropdowns = {};

    constructor() {
        this.#detectWidgetMode();
    }

    async init() {
        this.#initGlobalListeners();
        this.#initViewSwitcher();
        this.#injectCriticalStyles();
        
        // Debug Helper
        window.debugDropdowns = () => {
            const s = document.getElementById('subject-dropdown');
            const opts = document.getElementById('subject-options');
            console.log('--- Dropdown Debug ---');
            console.log('Subject Dropdown Element:', s);
            console.log('Options Container:', opts);
            console.log('Options Count:', opts?.children.length);
            console.log('Is Active:', s?.classList.contains('active'));
            console.log('Computed Visibility:', window.getComputedStyle(opts).visibility);
            console.log('Computed Z-Index:', window.getComputedStyle(opts).zIndex);
            console.log('----------------------');
        };

        try {
            this.#ui.setLoading(true);
            const data = await this.#dataService.fetchData();
            this.#state.filteredData = data;
            
            this.#initFilters(data);
            this.#initRoomFinder(); // Room finder depends on data
            this.handleFilterChange();

            // Self-Healing: Check if dropdowns are empty after a short delay and retry
            setTimeout(() => {
                const subjectOptions = document.getElementById('subject-options');
                if (subjectOptions && subjectOptions.children.length <= 1) {
                    console.warn('Dropdowns appear empty, retrying population...');
                    this.#initFilters(data);
                }
            }, 500);
            
        } catch (error) {
            this.#ui.elements.noResults.innerHTML = `<div style="color: var(--danger); padding: 20px;">Error loading data: ${error.message}</div>`;
            this.#ui.elements.noResults.classList.remove('hidden');
        } finally {
            this.#ui.setLoading(false);
        }
    }

    #detectWidgetMode() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('view') === 'widget') {
            document.body.classList.add('widget-mode');
        }
    }

    #initGlobalListeners() {
        window.addEventListener('click', () => CustomSelect.closeAll());

        // Search Input
        this.#ui.elements.searchInput.addEventListener('input', (e) => {
            this.#state.filters.search = e.target.value;
            this.handleFilterChange();
        });

        // Clear Button
        this.#ui.elements.clearFilters.onclick = () => {
            this.#ui.elements.searchInput.value = '';
            this.#state.filters = { search: '', subject: 'all', group: 'all', day: 'all' };
            Object.values(this.#dropdowns).forEach(d => d.reset());
            this.handleFilterChange();
        };
    }

    #initFilters(data) {
        // Initialize Dropdowns
        ['subject-dropdown', 'group-dropdown', 'day-dropdown'].forEach(id => {
            this.#dropdowns[id] = new CustomSelect(id, (dropdownId, value) => {
                const key = dropdownId.split('-')[0];
                this.#state.filters[key] = value;
                
                // If subject changes, re-populate groups for that subject
                if (key === 'subject') {
                    this.#populateGroupFilters(this.#dataService.getAllData().filter(item => 
                        value === 'all' || item.subject === value
                    ));
                    this.#state.filters.group = 'all';
                    this.#dropdowns['group-dropdown'].reset();
                }

                this.handleFilterChange();
            });
        });

        this.#populateSubjectFilters(data);
        this.#populateGroupFilters(data);
    }

    #populateSubjectFilters(data) {
        console.log('App: Populating Subjects, count:', data.length); // Debug
        const subjects = [...new Set(data.map(item => item.subject).filter(Boolean))].sort();
        console.log('App: Unique Subjects:', subjects); // Debug
        if (!subjects.length) {
            console.warn('App: No subjects found!');
            return;
        }

        this.#ui.elements.subjectListContainer?.classList.remove('hidden');
        const options = document.getElementById('subject-options');
        const hiddenSelect = document.getElementById('subject-filter');

        if (options) {
            options.innerHTML = '';
            
            const allOpt = document.createElement('div');
            allOpt.className = 'option selected';
            allOpt.dataset.value = 'all';
            allOpt.textContent = 'All Subjects';
            options.appendChild(allOpt);

            subjects.forEach(subject => {
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = subject;
                opt.textContent = subject;
                options.appendChild(opt);
            });
        }

        if (hiddenSelect) {
            hiddenSelect.innerHTML = '<option value="all">All Subjects</option>';
            subjects.forEach(subject => {
                hiddenSelect.add(new Option(subject, subject));
            });
        }
        
        if (this.#ui.elements.subjectTags) this.#ui.elements.subjectTags.innerHTML = '';
        subjects.forEach(subject => {
            const tag = document.createElement('span');
            tag.className = 'subject-tag';
            tag.textContent = subject;
            tag.onclick = () => this.#dropdowns['subject-dropdown'].select(subject, subject);
            this.#ui.elements.subjectTags?.appendChild(tag);
        });
    }

    #populateGroupFilters(data) {
        // Use natural sort for groups (Group 2 < Group 10)
        const groups = [...new Set(data.map(item => item.group).filter(Boolean))].sort((a, b) => {
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });

        const options = document.getElementById('group-options');
        const hiddenSelect = document.getElementById('group-filter');
        
        if (options) {
            options.innerHTML = '';
            
            const allOpt = document.createElement('div');
            allOpt.className = 'option selected';
            allOpt.dataset.value = 'all';
            allOpt.textContent = 'All Groups';
            options.appendChild(allOpt);

            groups.forEach(group => {
                const opt = document.createElement('div');
                opt.className = 'option';
                opt.dataset.value = group;
                opt.textContent = group;
                options.appendChild(opt);
            });
        }

        if (hiddenSelect) {
            hiddenSelect.innerHTML = '<option value="all">All Groups</option>';
            groups.forEach(group => {
                hiddenSelect.add(new Option(group, group));
            });
        }
    }

    #initViewSwitcher() {
        const tabs = document.querySelectorAll('.view-tab');
        const views = {
            'schedule': { ctrls: 'schedule-controls', view: 'schedule-view' },
            'rooms': { ctrls: 'room-controls', view: 'room-view' }
        };

        const switchView = (mode) => {
            this.#ui.switchView(mode, views);
            this.#updateUrl(mode);
        };

        tabs.forEach(tab => tab.onclick = () => switchView(tab.dataset.view));
        
        // Initial View
        const initialMode = new URLSearchParams(window.location.search).get('view') === 'rooms' ? 'rooms' : 'schedule';
        setTimeout(() => switchView(initialMode), 100);
    }

    #updateUrl(mode) {
        if (!window.history.pushState) return;
        const url = new URL(window.location);
        url.searchParams.set('view', mode);
        window.history.pushState({ view: mode }, '', url);
    }

    #initRoomFinder() {
        const populate = (key, optId, inputId, dropId) => {
            const values = this.#dataService.getUniqueValues(key);
            const container = document.getElementById(optId);
            const input = document.getElementById(inputId);
            
            if (container) {
                container.innerHTML = '';
                values.forEach(val => {
                    const opt = document.createElement('div');
                    opt.className = 'option';
                    opt.dataset.value = val;
                    opt.textContent = val;
                    container.appendChild(opt);
                });
            }

            this.#dropdowns[dropId] = new CustomSelect(dropId, (_, val) => {
                if (input) input.value = val;
            });
        };

        populate('day', 'room-day-options', 'room-day-input', 'room-day-dropdown');
        populate('time', 'room-time-options', 'room-time-input', 'room-time-dropdown');

        document.getElementById('find-rooms-btn').onclick = () => this.#performRoomSearch();
    }

    #injectCriticalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-select, .filters-grid, .controls, .view-controls { overflow: visible !important; }
            .select-options { z-index: 9999 !important; }
            .custom-select.active .select-options { visibility: visible !important; opacity: 1 !important; pointer-events: auto !important; }
        `;
        document.head.appendChild(style);
        console.log('App: Critical styles injected.');
    }

    #performRoomSearch() {
        // ... (existing code)
        const day = document.getElementById('room-day-input')?.value;
        const time = document.getElementById('room-time-input')?.value;
        const container = document.getElementById('room-results-container');

        if (!day || !time || day === 'Select Day' || time === 'Select Time') {
            if (container) container.innerHTML = '<div class="no-rooms-hint">Please select both a valid Day and Time.</div>';
            return;
        }

        this.#ui.setLoading(true);
        setTimeout(() => {
            const emptyRooms = this.#dataService.findEmptyRooms(day, time);
            this.#ui.renderRoomFinderResults(emptyRooms, day, time);
            this.#ui.setLoading(false);
        }, 300);
    }
    
    // ...

    handleFilterChange() {
        this.#state.filteredData = this.#dataService.filterData(this.#state.filters);
        this.#state.currentPage = 1;
        this.#updateTagHighlights();
        this.render();
        this.#ui.scrollToResults();
    }

    #updateTagHighlights() {
        const currentSubject = this.#state.filters.subject;
        this.#ui.elements.subjectTags.querySelectorAll('.subject-tag').forEach(tag => {
            tag.classList.toggle('active', tag.textContent === currentSubject);
        });
    }



    render() {
        const { filteredData, currentPage, filters } = this.#state;

        if (filteredData.length === 0) {
            this.#ui.renderTable([], currentPage, filters.search);
            
            const suggestions = (filters.search?.length >= 2) ? this.#dataService.getSuggestions(filters.search) : [];
            this.#ui.renderNoResults(
                filters.day === 'Friday',
                suggestions,
                (selected) => {
                    this.#ui.elements.searchInput.value = selected;
                    this.#state.filters.search = selected;
                    this.handleFilterChange();
                }
            );
        } else {
            this.#ui.renderTable(filteredData, currentPage, filters.search);
            this.#ui.renderPagination(filteredData.length, currentPage, (page) => {
                this.#state.currentPage = page;
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
}

// Start App
document.addEventListener('DOMContentLoaded', () => {
    new App().init();
});
