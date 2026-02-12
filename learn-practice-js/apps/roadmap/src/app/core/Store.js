/**
 * Store.js
 * State Management for the Roadmap App.
 */

export class Store {
  constructor() {
    this.state = {
      progress: this.loadProgress(),
      currentStageIdx: -1, // -1 = Dashboard
      selectedItemIdx: null,
      tempSearchContext: null,
    };
    this.listeners = new Set();
  }

  loadProgress() {
    try {
      return JSON.parse(localStorage.getItem("jsCurriculumState")) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  saveProgress() {
    localStorage.setItem(
      "jsCurriculumState",
      JSON.stringify(this.state.progress),
    );
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  // --- Domain Actions ---

  toggleItemComplete(id) {
    const progress = [...this.state.progress];
    if (!progress.includes(id)) {
      progress.push(id);
    } else {
      const idx = progress.indexOf(id);
      if (idx > -1) progress.splice(idx, 1);
    }

    this.state.progress = progress; // Direct update for sync, then save
    this.saveProgress();
    this.notify();
    return progress.includes(id); // Return new status
  }

  resetProgress() {
    this.state.progress = [];
    this.saveProgress();
    this.notify();
  }

  isCompleted(id) {
    return this.state.progress.includes(id);
  }
}
