import { Config } from './Config.js';

export class Utils {
    // Cache regex patterns for performance
    static #RE_ARABIC_TITLES = /\b(dr|dr\.|d\.|د|د\.|د\/|دكتور|دكتوره)\b/g;
    static #RE_SPECIAL_CHARS = /[()\-–—.,/]/g;
    static #RE_WHITESPACE = /\s+/g;
    
    // Arabic normalization maps for performant replacement
    static #ARABIC_NORM_MAPS = [
        { pattern: /[أإآء]/g, replacement: 'ا' },
        { pattern: /ة/g, replacement: 'ه' },
        { pattern: /[ىئ]/g, replacement: 'ي' },
        { pattern: /ؤ/g, replacement: 'ا' }
    ];

    /**
     * Normalizes text for searching by cleaning titles, Arabic characters, and spacing.
     */
    static normalizeText(text) {
        if (!text) return '';
        
        let normalized = String(text).toLowerCase().trim();
        
        // 1. External Arabic Services (Tashkeel/Tatweel)
        if (window.ArabicServices) {
            normalized = window.ArabicServices.removeTashkeel(normalized);
            normalized = window.ArabicServices.removeTatweel(normalized);
        }
        
        // 2. Remove Titles
        normalized = normalized.replace(this.#RE_ARABIC_TITLES, '');
        
        // 3. Sequential Arabic Normalization
        this.#ARABIC_NORM_MAPS.forEach(({ pattern, replacement }) => {
            normalized = normalized.replace(pattern, replacement);
        });
        
        // 4. Cleanup special chars and whitespace
        return normalized
            .replace(this.#RE_SPECIAL_CHARS, ' ')
            .replace(this.#RE_WHITESPACE, ' ')
            .trim();
    }

    /**
     * Highlights matching search terms using regex while preserving HTML structure.
     */
    static highlightText(text, term) {
        if (!term) return text;
        
        const normalizedTerm = this.normalizeText(term);
        const tokens = normalizedTerm.split(/\s+/).filter(t => t.length > 0);
        if (!tokens.length) return text;

        const START_MARKER = '{{HL_S}}';
        const END_MARKER = '{{HL_E}}';

        // Sort by length descending to match longest phrases first
        const sortedTokens = [...tokens].sort((a, b) => b.length - a.length);

        let result = text;
        sortedTokens.forEach(token => {
            const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let pattern = escaped;
            
            // Expand Arabic characters to match all visual variants
            if (/[\u0600-\u06FF]/.test(token)) {
                pattern = pattern
                    .replace(/ا/g, '[اأإآءؤ]')
                    .replace(/ه/g, '[ههة]')
                    .replace(/ي/g, '[يىئ]');
            }

            try {
                const regex = new RegExp(`(${pattern})`, 'gi');
                result = result.replace(regex, `${START_MARKER}$1${END_MARKER}`);
            } catch (e) {
                console.error("Highlight regex error:", e);
            }
        });
        
        // Final swap to real HTML tags
        return result
            .split(START_MARKER).join('<span class="highlight">')
            .split(END_MARKER).join('</span>');
    }

    /**
     * Helper for display-friendly subject names (MIS vs Management Information Systems)
     */
    static getSubjectDisplay(subject) {
        return Config.SUBJECT_ACRONYMS[subject] || subject;
    }

    /**
     * Standard debounce utility for performance-heavy inputs
     */
    static debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
}
