import { Config } from './Config.js';

export class Utils {
    /**
     * Normalizes text for searching:
     * - Lowercases
     * - Removes common titles
     * - Normalizes Arabic characters (Alif variants)
     */
    static normalizeText(text) {
        if (!text) return '';
        let normalized = String(text).toLowerCase().trim();
        
        // 1. Professional Arabic Normalization
        if (typeof window.ArabicServices !== 'undefined') {
            normalized = window.ArabicServices.removeTashkeel(normalized);
            normalized = window.ArabicServices.removeTatweel(normalized);
        }
        
        // 2. Remove common titles (English & Arabic)
        normalized = normalized.replace(/\b(dr|dr\.|d\.|د|د\.|د\/|دكتور|دكتوره)\b/g, '');
        
        // 3. Manual Arabic Normalization for robust matching
        normalized = normalized.replace(/[أإآء]/g, 'ا'); // Normalize Alif & Hamza on line
        normalized = normalized.replace(/ة/g, 'ه');      // Ta Marbuta -> Ha
        normalized = normalized.replace(/ى/g, 'ي');      // Alif Maqsura -> Ya
        normalized = normalized.replace(/ئ/g, 'ي');      // Hamza on Ya -> Ya
        normalized = normalized.replace(/ؤ/g, 'ا');      // Hamza on Waw -> Waw (often typed as Alif in search)
        
        // 4. Remove extra characters that might confuse matching
        normalized = normalized.replace(/[()\-–—.,/]/g, ' '); 
        
        // 5. Final cleanup of whitespace
        return normalized.replace(/\s+/g, ' ').trim();
    }

    /**
     * Highlights matching search terms using regex.
     * Handles multiple tokens and avoids breaking HTML tags.
     */
    static highlightText(text, term) {
        if (!term) return text;
        
        const normalizedTerm = this.normalizeText(term);
        const tokens = normalizedTerm.split(/\s+/).filter(t => t.length > 0);
        if (tokens.length === 0) return text;

        let highlighted = text;
        tokens.sort((a, b) => b.length - a.length);

        const START_TAG = '{{HL_START}}';
        const END_TAG = '{{HL_END}}';

        tokens.forEach(token => {
            const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let pattern = escaped;
            
            if (/[\u0600-\u06FF]/.test(token)) {
                pattern = pattern.replace(/ا/g, '[اأإآءؤ]')
                                 .replace(/ه/g, '[ههة]')
                                 .replace(/ي/g, '[يىئ]');
            }

            try {
                const regex = new RegExp(`(${pattern})`, 'gi');
                highlighted = highlighted.replace(regex, (match) => {
                    return `${START_TAG}${match}${END_TAG}`;
                });
            } catch (e) {
                console.error("Regex highlight error:", e);
            }
        });
        
        return highlighted
            .split(START_TAG).join('<span class="highlight">')
            .split(END_TAG).join('</span>');
    }

    /**
     * Returns the short form (acronym) of a subject if it exists.
     */
    static getSubjectDisplay(subject) {
        return Config.SUBJECT_ACRONYMS[subject] || subject;
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}
