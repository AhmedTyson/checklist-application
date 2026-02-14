document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const searchInput = document.getElementById('search-input');
    const subjectFilter = document.getElementById('subject-filter');
    const groupFilter = document.getElementById('group-filter');
    const dayFilter = document.getElementById('day-filter');
    const resultCount = document.getElementById('result-count');
    const noResults = document.getElementById('no-results');
    const paginationNumbers = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const loader = document.getElementById('loader');
    const subjectListContainer = document.getElementById('subject-list-container');
    const subjectTags = document.getElementById('subject-tags');
    const clearBtn = document.getElementById('clear-filters');

    let allData = [];
    let filteredData = [];
    let currentPage = 1;
    const rowsPerPage = 20;

    // 1. Fetch and Initialize Data
    async function loadData() {
        try {
            const response = await fetch('scedule-data.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            allData = await response.json();
            initializeUI();
            initApp();
        } catch (error) {
            console.error('Error loading schedule data:', error);
            noResults.innerHTML = `
                <div style="color: var(--danger); font-weight: 600;">Error loading data: ${error.message}</div>
                <div style="margin-top: 10px; font-size: 0.9em; color: var(--text-muted);">
                    Check if <strong>scedule-data.json</strong> exists and is accessible. 
                    If you are opening this file directly, you may need to use a local server.
                </div>
            `;
            noResults.classList.remove('hidden');
        } finally {
            loader.classList.add('fade-out');
        }
    }

    /**
     * Initializes the UI components (filters, tags) based on the loaded data.
     */
    function initializeUI() {
        // Populate Subject Filter and Subject Highlight Box
        const subjects = [...new Set(allData.map(item => item.subject))].sort();
        if (subjects.length > 0) {
            subjectListContainer.classList.remove('hidden');
            // Update Subject Sizer with longest text (if element exists)
            const longestSubject = subjects.reduce((a, b) => a.length > b.length ? a : b, "All Subjects");
            const sizer = document.querySelector('#subject-dropdown .select-sizer');
            if (sizer) sizer.textContent = longestSubject;
        }

        subjects.forEach(subject => {
            // Dropdown option
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            subjectFilter.appendChild(option);

            // Custom dropdown populate
            const customOption = document.createElement('div');
            customOption.className = 'option';
            customOption.dataset.value = subject;
            customOption.textContent = subject;
            document.getElementById('subject-options').appendChild(customOption);

            // Tag for highlight box
            const tag = document.createElement('span');
            tag.className = 'subject-tag';
            tag.textContent = subject;
            tag.addEventListener('click', () => {
                selectCustomOption('subject-dropdown', subject);
            });
            subjectTags.appendChild(tag);
        });

        // Populate Group Filter
        const groups = [...new Set(allData.map(item => item.group))].sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, '')) || 0;
            const numB = parseInt(b.replace(/\D/g, '')) || 0;
            return numA - numB || a.localeCompare(b);
        });

        groups.forEach(group => {
            // Native select sync
            const option = document.createElement('option');
            option.value = group;
            option.textContent = group;
            groupFilter.appendChild(option);

            // Custom dropdown populate
            const customOption = document.createElement('div');
            customOption.className = 'option';
            customOption.dataset.value = group;
            customOption.textContent = group;
            document.getElementById('group-options').appendChild(customOption);
        });

        initCustomDropdowns();
    }

    /**
     * Initializes custom dropdown behavior (opening/closing/selecting).
     */
    function initCustomDropdowns() {
        const dropdowns = document.querySelectorAll('.custom-select');

        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.select-trigger');
            const optionsContainer = dropdown.querySelector('.select-options');
            const options = dropdown.querySelectorAll('.option');
            const hiddenSelect = dropdown.parentElement.querySelector('select');

            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other dropdowns
                dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
                dropdown.classList.toggle('active');
            });

            dropdown.addEventListener('click', (e) => {
                if (e.target.classList.contains('option')) {
                    const value = e.target.dataset.value;
                    const text = e.target.textContent;

                    // Update UI
                    trigger.querySelector('span').textContent = text;
                    options.forEach(opt => opt.classList.remove('selected'));
                    e.target.classList.add('selected');

                    // Sync native select
                    hiddenSelect.value = value;
                    dropdown.classList.remove('active');
                    
                    // Trigger filter
                    handleFilterChange();
                }
            });
        });

        // Close when clicking elsewhere
        window.addEventListener('click', () => {
            dropdowns.forEach(d => d.classList.remove('active'));
        });
    }

    /**
     * Programmatically selects an option in a custom dropdown.
     */
    function selectCustomOption(dropdownId, value) {
        const dropdown = document.getElementById(dropdownId);
        const options = dropdown.querySelectorAll('.option');
        const trigger = dropdown.querySelector('.select-trigger');
        const hiddenSelect = dropdown.parentElement.querySelector('select');

        options.forEach(opt => {
            if (opt.dataset.value === value) {
                opt.classList.add('selected');
                trigger.querySelector('span').textContent = opt.textContent;
                hiddenSelect.value = value;
            } else {
                opt.classList.remove('selected');
            }
        });
        handleFilterChange();
    }

    /**
     * Initializes event listeners and performs the first render.
     */
    function initApp() {
        filteredData = [...allData];
        renderTable();
        
        // Listen for input, select changes to trigger filtering
        searchInput.addEventListener('input', handleFilterChange);
        
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            // Reset custom dropdowns
            ['subject-dropdown', 'group-dropdown', 'day-dropdown'].forEach(id => {
                const dropdown = document.getElementById(id);
                const trigger = dropdown.querySelector('.select-trigger');
                const defaultOption = dropdown.querySelector('.option[data-value="all"]');
                trigger.querySelector('span').textContent = defaultOption.textContent;
                dropdown.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                defaultOption.classList.add('selected');
                dropdown.parentElement.querySelector('select').value = 'all';
            });
            handleFilterChange();
        });

        // Pagination button listeners
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxPage = Math.ceil(filteredData.length / rowsPerPage);
            if (currentPage < maxPage) {
                currentPage++;
                renderTable();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    /**
     * Handles search input and filter changes to update filteredData.
     */
    function handleFilterChange() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedSubject = subjectFilter.value;
        const selectedGroup = groupFilter.value;
        const selectedDay = dayFilter.value;

        filteredData = allData.filter(item => {
            // Search logic mapping for subject, doctor, group, day, time, and code
            const matchesSearch = searchTerm === '' || 
                item.subject.toLowerCase().includes(searchTerm) ||
                item.doctor.toLowerCase().includes(searchTerm) ||
                item.group.toLowerCase().includes(searchTerm) ||
                item.day.toLowerCase().includes(searchTerm) ||
                item.time.toLowerCase().includes(searchTerm) ||
                item.code.toLowerCase().includes(searchTerm);
            
            // Filter dropdown matches
            const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
            const matchesGroup = selectedGroup === 'all' || item.group === selectedGroup;
            const matchesDay = selectedDay === 'all' || item.day === selectedDay;

            return matchesSearch && matchesSubject && matchesGroup && matchesDay;
        });

        // Reset to first page on filter change
        currentPage = 1;
        renderTable();
        
        // Optional: Smooth scroll back to table header if user is deep in results
        const tableHeader = document.querySelector('thead');
        if (window.scrollY > tableHeader.offsetTop + 100) {
            window.scrollTo({ top: tableHeader.offsetTop - 100, behavior: 'smooth' });
        }
    }

    /**
     * Renders the table body based on the current page of filteredData.
     */
    function renderTable() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = filteredData.slice(start, end);

        tableBody.innerHTML = '';
        
        if (pageData.length === 0) {
            noResults.classList.remove('hidden');
            resultCount.textContent = '0';
            paginationNumbers.innerHTML = '';
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        noResults.classList.add('hidden');
        resultCount.textContent = filteredData.length;

        // Create table rows dynamically
        pageData.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="subject-cell">${highlightText(item.subject)}</td>
                <td class="group-cell">${highlightText(item.group)}</td>
                <td>${highlightText(item.doctor)}</td>
                <td>${highlightText(item.day)}</td>
                <td>${highlightText(item.time)}</td>
                <td><span class="code-cell">${highlightText(item.code)}</span></td>
            `;
            tableBody.appendChild(tr);
        });

        renderPagination();
    }

    /**
     * Highlights matching search terms within a given string using regex.
     */
    function highlightText(text) {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return text;
        // Escape special characters in search and create a global case-insensitive regex
        const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedSearch})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    function renderPagination() {
        const maxPage = Math.ceil(filteredData.length / rowsPerPage);
        paginationNumbers.innerHTML = '';

        if (maxPage <= 1) {
            document.getElementById('pagination').classList.add('hidden');
            return;
        }
        document.getElementById('pagination').classList.remove('hidden');

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === maxPage;

        for (let i = 1; i <= maxPage; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderTable();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationNumbers.appendChild(btn);
        }
    }

    loadData();
});
