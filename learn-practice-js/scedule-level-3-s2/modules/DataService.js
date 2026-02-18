import { Config } from './Config.js?v=7';
import { Utils } from './Utils.js?v=7';

export class DataService {
    #data = [];
    #worker = null;
    #pendingRequests = new Map();
    #requestIdCounter = 0;

    constructor() {
        this.#worker = new Worker('modules/workers/SearchWorker.js', { type: 'module' });
        this.#worker.onmessage = this.#handleWorkerMessage.bind(this);
    }

    getAllData() {
        return this.#data;
    }

    async fetchData() {
        try {
            const response = await fetch(Config.DATA_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            this.#data = await response.json();
            
            // Initialize Worker
            await this.#sendToWorker('INIT', { data: this.#data });
            
            return this.#data;
        } catch (error) {
            console.error('DataService Error:', error);
            throw error;
        }
    }

    async search(query) {
        if (!query || query.length < 2) return this.#data;
        return this.#sendToWorker('SEARCH', { query });
    }

    async getSuggestions(query) {
        if (!query || query.length < 2) return [];
        return this.#sendToWorker('SUGGEST', { query });
    }

    getUniqueValues(key) {
        const values = [...new Set(this.#data.map(item => item[key]).filter(Boolean))];

        if (key === 'day') {
            const dayOrder = { 'Saturday': 1, 'Sunday': 2, 'Monday': 3, 'Tuesday': 4, 'Wednesday': 5, 'Thursday': 6, 'Friday': 7 };
            return values.sort((a, b) => (dayOrder[a] || 99) - (dayOrder[b] || 99));
        }

        if (key === 'time') {
            return values.sort((a, b) => {
                const parseTime = (t) => {
                    const [time, modifier] = t.split(' ');
                    let [hours, minutes] = time.split(':').map(Number);
                    if (hours === 12) hours = 0;
                    if (modifier === 'PM') hours += 12;
                    return hours * 60 + minutes;
                };
                return parseTime(a) - parseTime(b);
            });
        }

        return values.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    }

    findEmptyRooms(day, time) {
        if (!day || !time) return [];

        const allRooms = this.getUniqueValues('room');
        const occupiedRooms = this.#data
            .filter(item => item.day === day && item.time === time)
            .map(item => item.room);

        return allRooms.filter(room => !occupiedRooms.includes(room));
    }

    // --- Worker Communication ---

    #sendToWorker(type, payload) {
        return new Promise((resolve, reject) => {
            const id = this.#requestIdCounter++;
            this.#pendingRequests.set(id, { resolve, reject });
            this.#worker.postMessage({ type, payload, id });
        });
    }

    #handleWorkerMessage(e) {
        const { type, payload, id } = e.data;
        
        if (type === 'READY') {
            const req = this.#pendingRequests.get(id);
            if (req) {
                 req.resolve();
                 this.#pendingRequests.delete(id);
            }
            return;
        }

        if (this.#pendingRequests.has(id)) {
            const { resolve, reject } = this.#pendingRequests.get(id);
            if (type === 'ERROR') {
                reject(payload);
            } else {
                resolve(payload);
            }
            this.#pendingRequests.delete(id);
        }
    }
}
