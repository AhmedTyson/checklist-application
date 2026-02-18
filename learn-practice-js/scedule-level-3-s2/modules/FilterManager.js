import { Utils } from './Utils.js?v=7';

export class FilterManager {
    #filters = { search: '', subject: 'all', group: 'all', day: 'all', time: 'all' }; // Added time for completeness logic
    
    constructor() {}

    get filters() { return { ...this.#filters }; }

    update(key, value) {
        if (Object.hasOwn(this.#filters, key)) {
            this.#filters[key] = value;
            return true;
        }
        return false;
    }

    reset() {
        this.#filters = { search: '', subject: 'all', group: 'all', day: 'all', time: 'all' };
    }

    /**
     * Applies current filters to the dataset using the Logic extracted from DataService
     */
    applyFilters(data) {
        const { subject, group, day } = this.#filters;
        
        // Structure Match (Dropdowns)
        return data.filter(item => {
            return (subject === 'all' || item.subject === subject) &&
                   (group === 'all' || item.group === group) &&
                   (day === 'all' || item.day === day);
        });
    }
}
