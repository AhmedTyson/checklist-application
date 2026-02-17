import { Config } from './Config.js';
import { Utils } from './Utils.js';

export class DataService {
    constructor() {
        this.data = [];
        this.fuse = null;
    }

    async fetchData() {
        try {
            const response = await fetch(Config.DATA_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            this.data = await response.json();
            this.initFuse();
            this.initSuggestions();
            return this.data;
        } catch (error) {
            console.error('DataService Error:', error);
            throw error;
        }
    }

    initFuse() {
        // Initialize Fuse.js for fuzzy search
        this.fuse = new window.Fuse(this.data, {
            keys: ['subject', 'subjectAcronym', 'group', 'doctorAr', 'doctorEn', 'day', 'time', 'room', 'code'],
            threshold: 0.2, // Stricter threshold to avoid irrelevant matches
            ignoreLocation: true,
            minMatchCharLength: 3, // Increased to avoid matching short common sequences
            findAllMatches: true,
            getFn: (obj, key) => {
                // Handle subjectAcronym as a virtual field
                if (key === 'subjectAcronym') {
                    return Utils.normalizeText(Utils.getSubjectDisplay(obj.subject));
                }
                return Utils.normalizeText(obj[key]);
            }
        });
    }

    initSuggestions() {
        // Create a unique list of potential search terms for suggestions
        const subjects = [...new Set(this.data.map(d => d.subject))];
        const doctorsEn = [...new Set(this.data.map(d => d.doctorEn))];
        const doctorsAr = [...new Set(this.data.map(d => d.doctorAr))];

        this.suggestionItems = [
            ...subjects.map(s => ({ type: 'subject', text: s, display: s })),
            ...doctorsEn.map(d => ({ type: 'doctor', text: d, display: d })),
            ...doctorsAr.map(d => ({ type: 'doctor', text: d, display: d }))
        ].filter(item => item.text && item.text !== '-');

        this.suggestionsFuse = new window.Fuse(this.suggestionItems, {
            keys: ['text'],
            threshold: 0.4, // Slightly looser for suggestions to catch typos
            minMatchCharLength: 2
        });
    }

    getSuggestions(query) {
        if (!this.suggestionsFuse) return [];
        if (!query || query.length < 2) return [];
        return this.suggestionsFuse.search(query).map(r => r.item).slice(0, 5); // Limit to 5 suggestions
    }

    filterData(filters) {
        const { search, subject, group, day } = filters;
        
        // 1. Initial filter by exact dropdowns
        let pool = this.data.filter(item => {
            const matchesSubject = subject === 'all' || item.subject === subject;
            const matchesGroup = group === 'all' || item.group === group;
            const matchesDay = day === 'all' || item.day === day;
            return matchesSubject && matchesGroup && matchesDay;
        });

        // 2. Tiered Search Logic
        if (search && search.trim().length >= 1) {
            const query = Utils.normalizeText(search);
            const queryTokens = query.split(/\s+/);

            // Tier 1: Exact Substring Match (High Priority)
            const tier1 = pool.filter(item => {
                const subjectShort = Utils.getSubjectDisplay(item.subject);
                const searchable = Utils.normalizeText(`${item.subject} ${subjectShort} ${item.group} ${item.doctorAr} ${item.doctorEn} ${item.day} ${item.time} ${item.code}`);
                return searchable.includes(query);
            });

            // Tier 2: Token Matching (AND logic)
            const tier2 = pool.filter(item => {
                if (tier1.includes(item)) return false; // Already in Tier 1
                const subjectShort = Utils.getSubjectDisplay(item.subject);
                const searchable = Utils.normalizeText(`${item.subject} ${subjectShort} ${item.group} ${item.doctorAr} ${item.doctorEn} ${item.day} ${item.time} ${item.code}`);
                return queryTokens.every(token => searchable.includes(token));
            });

            // Tier 3: Fuzzy Match (Fuse.js) for typos
            let tier3 = [];
            if (this.fuse) {
                const fuzzyResults = this.fuse.search(query);
                tier3 = fuzzyResults
                    .map(r => r.item)
                    .filter(item => pool.includes(item) && !tier1.includes(item) && !tier2.includes(item));
            }

            return [...tier1, ...tier2, ...tier3];
        } else {
            return pool;
        }
    }

    getUniqueValues(key) {
        return [...new Set(this.data.map(item => item[key]).filter(Boolean))].sort((a, b) => {
             // Natural sort for strings containing numbers (e.g. Hall 2 < Hall 10)
             return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        });
    }

    getAllRooms() {
        return this.getUniqueValues('room');
    }

    findEmptyRooms(day, time) {
        if (!day || !time) return [];

        const allRooms = this.getAllRooms();
        
        // Find occupied rooms for this slot
        const occupiedRooms = this.data
            .filter(item => item.day === day && item.time === time)
            .map(item => item.room);

        // Filter out occupied rooms
        // We also filter out "undefined" or empty rooms if any
        return allRooms.filter(room => !occupiedRooms.includes(room));
    }
}
