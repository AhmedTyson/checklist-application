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
    }
};
