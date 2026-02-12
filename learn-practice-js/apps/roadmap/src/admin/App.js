import { Store } from "./core/Store.js";
import { Storage } from "./core/Storage.js";
import { TreeView } from "./components/TreeView.js";
import { Editor } from "./components/Editor.js";
import { Preview } from "./components/Preview.js";
import { toast } from "../shared/toast.js";

// Default Data (fallback)
import { contentData } from "../data/content.js";

const appConfig = {
  brandTitle: "JS Master",
  brandSubtitle: "Curriculum",
  accentColor: "#a855f7",
};

class AdminApp {
  constructor() {
    this.storage = new Storage();

    // Load State
    const saved = this.storage.load();
    const initialState = {
      data: saved && saved.data ? saved.data : contentData,
      config: saved && saved.config ? saved.config : appConfig,
      view: "visual",
    };

    this.store = new Store(initialState);

    // Initialize Components
    this.tree = new TreeView(this.store);
    this.editor = new Editor(this.store);
    this.preview = new Preview(this.store);

    // Auto-Save Subscription
    this.store.subscribe((state) => {
      this.storage.save(state.data, state.config);
    });

    // Global Actions
    document.getElementById("btn-copy-json").onclick = () => this.copyJSON();

    console.log("Admin V4 Initialized");
  }

  copyJSON() {
    const state = this.store.getState();
    const json = JSON.stringify(state.data, null, 2);
    const fullContent =
      `export const appConfig = ${JSON.stringify(state.config, null, 2)};\n\n` +
      `export const contentData = ${json};`;

    navigator.clipboard.writeText(fullContent).then(() => {
      toast.show("Copied to clipboard!", "success");
    });
  }
}

// Start
window.app = new AdminApp();
