import { Icons } from '../Icons.js?v=7';

export class RoomGrid {
    #container;

    constructor(containerId) {
        this.#container = document.getElementById(containerId);
    }

    render(rooms, day, time) {
        if (!this.#container) return;

        this.#container.innerHTML = '';
        
        if (!rooms.length) {
            this.#container.innerHTML = `
                <div class="room-results-header">
                    <div class="no-rooms-state">
                        ${Icons.ghost}
                        <h3>No Rooms Available</h3>
                        <p>Every room is booked for <span>${day}</span> at <span>${time}</span>.</p>
                    </div>
                </div>
            `;
            return;
        }

        this.#container.innerHTML = `
            <div class="room-results-header">
                <h4>Available Rooms <span class="count-badge">${rooms.length}</span></h4>
                <p class="results-meta">for <span class="highlight">${day}</span> at <span class="highlight">${time}</span></p>
            </div>
            <div class="room-grid-rich">
                ${rooms.map((room, i) => this.#getRoomCardTemplate(room, i)).join('')}
            </div>
        `;
    }

    #getRoomCardTemplate(room, index) {
        const isLab = room.toLowerCase().includes('lab');
        const type = isLab ? 'Lab' : 'Hall';
        const num = room.replace(/(Hall|Lab)\s*/i, '');

        return `
            <div class="room-card ${isLab ? 'is-lab' : ''}" style="--delay: ${index * 50}ms">
                <div class="room-card-content">
                    <span class="room-type">${type}</span>
                    <span class="room-number">${num}</span>
                </div>
            </div>
        `;
    }
}
