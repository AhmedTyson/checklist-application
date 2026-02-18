export const Config = {
    DATA_URL: 'schedule-data.json',
    DESKTOP_WIDTH: 1200,
    FRIDAY_MEME_COUNT: 5,
    SUBJECT_ACRONYMS: {
        "Management Information Systems": "MIS",
        "Operations Research": "OR",
        "Advanced Database": "Adv. Database",
        "Economics of Information": "Econ. of Info",
        "Internet Applications": "Internet Apps"
    },
    
    /**
     * Dynamically calculates how many rows fit on the screen.
     * Logic optimized for the 1200px viewport scaling used on mobile.
     */
    // Cache for the calculated rows
    _rowsPerPage: 24,

    init() {
        this.updateRowsPerPage();
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateRowsPerPage();
            }, 200);
        });
    },

    updateRowsPerPage() {
        const { innerWidth: width, innerHeight: height } = window;
        
        if (width >= this.DESKTOP_WIDTH) {
            this._rowsPerPage = 24;
            return;
        }

        // Effective height calculation for the scaled-out mobile viewport
        const effectiveHeight = (height / width) * this.DESKTOP_WIDTH;
        
        // Layout constants
        const UI_CHROME_HEIGHT = 450; 
        const ROW_HEIGHT = 73;
        
        const availableHeight = effectiveHeight - UI_CHROME_HEIGHT;
        const calculatedRows = Math.floor(availableHeight / ROW_HEIGHT);
        
        // Clamp between 24 and 100, adding a 5-row buffer for overflow
        this._rowsPerPage = Math.min(Math.max(calculatedRows + 5, 24), 100);
    },
    
    /**
     * Returns the cached number of rows that fit on the screen.
     */
    get ROWS_PER_PAGE() {
        return this._rowsPerPage;
    }
};
