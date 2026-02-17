import { Config } from './Config.js';
import { Utils } from './Utils.js';

export class DataService {
    #data = [];
    #fuse = null;
    #suggestionsFuse = null;
    #suggestionItems = [];

    /**
     * Core data loading and index initialization
     */
    getAllData() {
        return this.#data;
    }

    async fetchData() {
        try {
            const response = await fetch(Config.DATA_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            this.#data = await response.json();
            this.#initSearchIndices();
            
            return this.#data;
        } catch (error) {
            console.error('DataService Error:', error);
            throw error;
        }
    }

    #initSearchIndices() {
        // 0. Pre-compute searchable text for rapid T1/T2 filtering
        this.#data.forEach(item => {
            item._searchIndex = Utils.normalizeText(`
                ${item.subject} ${Utils.getSubjectDisplay(item.subject)} 
                ${item.group} ${item.doctorAr} ${item.doctorEn} 
                ${item.day} ${item.time} ${item.code} ${item.room}
            `);
        });

        // 1. Primary Fuzzy Engine (Fuse.js)
        this.#fuse = new window.Fuse(this.#data, {
            keys: ['subject', 'subjectAcronym', 'group', 'doctorAr', 'doctorEn', 'day', 'time', 'room', 'code'],
            threshold: 0.2,
            ignoreLocation: true,
            minMatchCharLength: 3,
            findAllMatches: true,
            getFn: (obj, key) => {
                const val = (key === 'subjectAcronym') 
                    ? Utils.getSubjectDisplay(obj.subject) 
                    : obj[key];
                return Utils.normalizeText(val);
            }
        });

        // 2. Suggestion Engine
        const uniqueValues = (key) => [...new Set(this.#data.map(d => d[key]))].filter(v => v && v !== '-');
        
        this.#suggestionItems = [
            ...uniqueValues('subject').map(s => ({ type: 'subject', text: s, display: s })),
            ...uniqueValues('doctorEn').map(d => ({ type: 'doctor', text: d, display: d })),
            ...uniqueValues('doctorAr').map(d => ({ type: 'doctor', text: d, display: d }))
        ];

        this.#suggestionsFuse = new window.Fuse(this.#suggestionItems, {
            keys: ['text'],
            threshold: 0.4,
            minMatchCharLength: 2
        });
    }

    getSuggestions(query) {
        if (!this.#suggestionsFuse || !query || query.length < 2) return [];
        return this.#suggestionsFuse.search(query).map(r => r.item).slice(0, 5);
    }

    /**
     * Performs a three-tier smart filter:
     * Tier 1: Exact Substring match
     * Tier 2: Token match (all words present)
     * Tier 3: Fuzzy Typos (Fuse.js)
     */
    filterData(filters) {
        const { search, subject, group, day } = filters;
        
        // filter by exact dropdowns
        let results = this.#data.filter(item => {
            return (subject === 'all' || item.subject === subject) &&
                   (group === 'all' || item.group === group) &&
                   (day === 'all' || item.day === day);
        });

        if (!search?.trim()) return results;

        const query = Utils.normalizeText(search);
        const tokens = query.split(/\s+/).filter(t => t.length > 0);

        // Tier 1 & 2: Substring & Tokenized
        const exactMatches = results.filter(item => {
            // Check full query first
            if (item._searchIndex.includes(query)) return true;
            // Check tokens
            return tokens.every(token => item._searchIndex.includes(token));
        });

        // Tier 3: Fuzzy
        let fuzzyMatches = [];
        if (this.#fuse) {
            const fuzzy = this.#fuse.search(query).map(r => r.item);
            fuzzyMatches = fuzzy.filter(item => 
                results.includes(item) && !exactMatches.includes(item)
            );
        }

        return [...exactMatches, ...fuzzyMatches];
    }

    getUniqueValues(key) {
        return [...new Set(this.#data.map(item => item[key]).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    findEmptyRooms(day, time) {
        if (!day || !time) return [];

        const allRooms = this.getUniqueValues('room');
        const occupiedRooms = this.#data
            .filter(item => item.day === day && item.time === time)
            .map(item => item.room);

        return allRooms.filter(room => !occupiedRooms.includes(room));
    }
}
