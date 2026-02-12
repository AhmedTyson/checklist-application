/**
 * Storage.js
 * Wrapper for LocalStorage to handle persistence.
 */

export class Storage {
  constructor(keys = { data: "roadmap_data", config: "roadmap_config" }) {
    this.keys = keys;
  }

  load() {
    try {
      const data = localStorage.getItem(this.keys.data);
      const config = localStorage.getItem(this.keys.config);
      return {
        data: data ? JSON.parse(data) : null,
        config: config ? JSON.parse(config) : null,
      };
    } catch (e) {
      console.error("Failed to load from storage", e);
      return null;
    }
  }

  save(data, config) {
    try {
      if (data) localStorage.setItem(this.keys.data, JSON.stringify(data));
      if (config)
        localStorage.setItem(this.keys.config, JSON.stringify(config));
      return true;
    } catch (e) {
      console.error("Failed to save to storage", e);
      return false;
    }
  }

  clear() {
    localStorage.removeItem(this.keys.data);
    localStorage.removeItem(this.keys.config);
  }
}
