/**
 * Store.js
 * State Management for the Roadmap App.
 * Course-aware: reads courseId from URL params for per-course storage.
 */

import {
  getProgress,
  saveProgress,
  getActivity,
  saveActivity,
} from "../../data/CourseStore.js";

export class Store {
  constructor() {
    // Read courseId from URL (default to "javascript")
    const params = new URLSearchParams(window.location.search);
    this.courseId = params.get("courseId") || "javascript";

    this.state = {
      progress: this._loadProgress(),
      activity: this._loadActivity(),
      currentStageIdx: -1, // -1 = Dashboard
      selectedItemIdx: null,
      tempSearchContext: null,
    };
    this.listeners = new Set();
  }

  _loadProgress() {
    return getProgress(this.courseId);
  }

  _saveProgress() {
    saveProgress(this.courseId, this.state.progress);
  }

  _loadActivity() {
    return getActivity(this.courseId);
  }

  _saveActivity() {
    saveActivity(this.courseId, this.state.activity);
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
      this.recordActivity(); // Track study day
    } else {
      const idx = progress.indexOf(id);
      if (idx > -1) progress.splice(idx, 1);
    }

    this.state.progress = progress;
    this._saveProgress();
    this.notify();
    return progress.includes(id);
  }

  resetProgress() {
    this.state.progress = [];
    this.state.activity = [];
    this._saveProgress();
    this._saveActivity();
    this.notify();
  }

  isCompleted(id) {
    return this.state.progress.includes(id);
  }

  // --- Activity Tracking ---

  recordActivity() {
    const today = new Date().toISOString().split("T")[0];
    if (!this.state.activity.includes(today)) {
      this.state.activity.push(today);
      this._saveActivity();
    }
  }

  getStreak() {
    const dates = [...this.state.activity].sort().reverse();
    if (dates.length === 0) return 0;

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    // Streak must include today or yesterday
    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const curr = new Date(dates[i]);
      const prev = new Date(dates[i + 1]);
      const diff = (curr - prev) / 86400000;
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  }

  getActivityHistory(days = 30) {
    const result = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      result.push({
        date: dateStr,
        active: this.state.activity.includes(dateStr),
        day: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2),
      });
    }
    return result;
  }
}
