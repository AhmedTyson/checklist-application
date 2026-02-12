/**
 * Store.js
 * Centralized State Management for the Roadmap Editor.
 * Follows a simple Pub/Sub pattern for reactive UI updates.
 */

export class Store {
  constructor(initialState = {}) {
    this.state = {
      data: [],
      config: {},
      view: "visual",
      activeStage: null,
      activeItem: null,
      ...initialState,
    };
    this.listeners = new Set();
  }

  /**
   * Subscribe to state changes.
   * @param {Function} listener - Callback function receiving the new state.
   * @returns {Function} Unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of state changes.
   */
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  /**
   * Update state and notify listeners.
   * @param {Object} partialState - Object containing state changes.
   */
  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  /**
   * Get current state snapshot.
   */
  getState() {
    return this.state;
  }
}
