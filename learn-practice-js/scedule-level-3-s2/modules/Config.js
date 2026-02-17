export const Config = {
    DATA_URL: 'scedule-data.json',
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
    get ROWS_PER_PAGE() {
        const { innerWidth: width, innerHeight: height } = window;
        if (width >= this.DESKTOP_WIDTH) return 24;

        // Effective height calculation for the scaled-out mobile viewport
        const effectiveHeight = (height / width) * this.DESKTOP_WIDTH;
        
        // Layout constants
        const UI_CHROME_HEIGHT = 450; 
        const ROW_HEIGHT = 73;
        
        const availableHeight = effectiveHeight - UI_CHROME_HEIGHT;
        const calculatedRows = Math.floor(availableHeight / ROW_HEIGHT);
        
        // Clamp between 24 and 100, adding a 5-row buffer for overflow
        return Math.min(Math.max(calculatedRows + 5, 24), 100);
    }
};
