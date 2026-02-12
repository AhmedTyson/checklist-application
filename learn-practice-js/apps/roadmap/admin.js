import { toast } from "./js/toast.js";
import { contentData } from "./content.js";

const appConfig = {
  brandTitle: "JS Master",
  brandSubtitle: "Curriculum",
  accentColor: "#a855f7",
};

/**
 * Admin Panel Logic - Rebuilt v3.0
 * Modular, Event-Driven, Clean State Management
 */

const App = {
  state: {
    data: [], // The full roadmap content
    config: {}, // App configuration
    view: "visual", // 'visual' | 'source' | 'edit'
    activeStage: null, // index
    activeItem: null, // index
  },

  // --- INITIALIZATION ---
  init() {
    this.loadState();
    this.bindEvents();
    this.render();
    console.log("Admin Panel Initialized");
  },

  loadState() {
    const savedData = localStorage.getItem("roadmap_data");
    const savedConfig = localStorage.getItem("roadmap_config");

    if (savedData) {
      this.state.data = JSON.parse(savedData);
      toast.show("Restored unsaved session", "info");
    } else {
      this.state.data = JSON.parse(JSON.stringify(contentData));
    }

    if (savedConfig) {
      this.state.config = JSON.parse(savedConfig);
    } else {
      this.state.config = JSON.parse(JSON.stringify(appConfig));
    }
  },

  // --- EVENT BINDING ---
  bindEvents() {
    // Helper for ID binding
    const on = (id, event, handler) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(event, handler);
    };

    // 1. Toolbar Actions
    on("btn-copy-json", "click", () => this.copyJSON());
    on("btn-view-visual", "click", () => this.switchView("visual"));
    on("btn-view-edit", "click", () => this.switchView("edit"));
    on("btn-view-source", "click", () => this.switchView("source"));
    on("btn-apply-source", "click", () => this.applySourceEdits());

    // Search Input
    on("inp-search-tree", "input", (e) => this.filterTree(e.target.value));

    // 2. Tree Interaction (Event Delegation)
    const treeRoot = document.getElementById("tree-root");
    if (treeRoot) {
      treeRoot.addEventListener("click", (e) => this.handleTreeClick(e));
    }

    // 3. Stage & Item Actions
    on("btn-new-stage", "click", () => this.createNewStage());
    on("btn-save-item", "click", () => this.saveCurrentItem());
    on("btn-delete-item", "click", () => this.deleteCurrentItem());

    // 4. Live Preview Inputs
    ["inp-title", "inp-desc", "inp-expl", "inp-code", "inp-prompt"].forEach(
      (id) => {
        on(id, "input", () => this.updatePreviewFromInputs());
      },
    );

    // Resource Actions
    on("btn-add-resource", "click", () => this.addResourceRow());
  },

  // --- RENDER LOGIC ---
  render() {
    this.renderTree();
    this.updateEditorState();
    this.updatePreview();
  },

  renderTree() {
    const root = document.getElementById("tree-root");
    if (!root) return;
    root.innerHTML = "";

    this.state.data.forEach((stage, sIdx) => {
      // Stage Header
      const stageEl = document.createElement("div");
      stageEl.className = "tree-stage";

      const header = document.createElement("div");
      header.className = "tree-stage-header";
      header.innerHTML = `
                <div style="display:flex; align-items:center; gap:8px;">
                    <span class="toggle-icon" style="font-size:10px; transition:transform 0.2s;">▶</span>
                    <span>${stage.title}</span>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size: 10px; color: #666;">${stage.items.length} items</span>
                    <button class="icon-danger delete-stage-btn" style="border:none; background:transparent; cursor:pointer; font-size:14px; color:var(--text-dim);" title="Delete Stage">×</button>
                </div>
            `;

      // Delete Button Logic
      const delBtn = header.querySelector(".delete-stage-btn");
      if (delBtn) {
        delBtn.onclick = (e) => {
          e.stopPropagation();
          this.deleteStage(sIdx);
        };
      }

      // Items Container
      const itemsCont = document.createElement("div");
      itemsCont.className = `tree-items`; // Default collapsed

      // If this stage contains the active item, expand it by default
      if (this.state.activeStage === sIdx) {
        itemsCont.classList.add("expanded");
        header.querySelector(".toggle-icon").style.transform = "rotate(90deg)";
      }

      header.onclick = (e) => {
        // Toggle Logic
        const isExpanded = itemsCont.classList.contains("expanded");
        if (isExpanded) {
          itemsCont.classList.remove("expanded");
          header.querySelector(".toggle-icon").style.transform = "rotate(0deg)";
        } else {
          itemsCont.classList.add("expanded");
          header.querySelector(".toggle-icon").style.transform =
            "rotate(90deg)";
        }
      };

      stage.items.forEach((item, iIdx) => {
        const itemEl = document.createElement("div");
        itemEl.className = `tree-item ${
          this.isItemActive(sIdx, iIdx) ? "active" : ""
        }`;
        itemEl.textContent = item.title;
        itemEl.onclick = (e) => {
          e.stopPropagation();
          this.selectItem(sIdx, iIdx);
        };
        itemsCont.appendChild(itemEl);
      });

      // "Add Item" Button in Tree
      const addBtn = document.createElement("div");
      addBtn.className = "tree-item";
      addBtn.style.color = "var(--text-dim)";
      addBtn.style.fontStyle = "italic";
      addBtn.textContent = "+ Add Item";
      addBtn.onclick = (e) => {
        e.stopPropagation();
        this.createNewItem(sIdx);
      };
      itemsCont.appendChild(addBtn);

      stageEl.appendChild(header);
      stageEl.appendChild(itemsCont);
      root.appendChild(stageEl);
    });
  },

  filterTree(query) {
    const q = query.toLowerCase();
    const allItems = document.querySelectorAll(".tree-item");
    const allStages = document.querySelectorAll(".tree-stage");

    if (!q) {
      // Reset
      allItems.forEach((el) => el.classList.remove("hidden"));
      allStages.forEach((el) => el.classList.remove("hidden"));
      return;
    }

    this.state.data.forEach((stage, sIdx) => {
      let hasVisibleItems = false;
      const stageEl = document.querySelectorAll(".tree-stage")[sIdx];
      if (!stageEl) return;

      const items = stageEl.querySelectorAll(".tree-item");

      items.forEach((item) => {
        if (item.textContent.toLowerCase().includes(q)) {
          item.classList.remove("hidden");
          hasVisibleItems = true;
        } else {
          item.classList.add("hidden");
        }
      });

      // Toggle Stage visibility
      if (hasVisibleItems) {
        stageEl.classList.remove("hidden");
        stageEl.querySelector(".tree-items").classList.add("expanded"); // Auto-expand
      } else {
        stageEl.classList.add("hidden");
      }
    });
  },

  updateEditorState() {
    const editor = document.getElementById("item-editor");
    const empty = document.getElementById("editor-empty");

    if (this.state.activeStage !== null && this.state.activeItem !== null) {
      if (editor) editor.classList.remove("hidden");
      if (empty) empty.classList.add("hidden");

      // Populate Inputs
      const item =
        this.state.data[this.state.activeStage].items[this.state.activeItem];

      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
      };

      setVal("inp-title", item.title);
      setVal("inp-desc", item.description || "");
      setVal("inp-expl", item.explanation || "");
      setVal("inp-code", item.code || "");
      setVal("inp-prompt", item.prompt || "");

      // Populate Resources
      const resContainer = document.getElementById("resources-list");
      if (resContainer) {
        resContainer.innerHTML = "";
        if (item.resources && item.resources.length > 0) {
          item.resources.forEach((r) => this.addResourceRow(r.url, r.label));
        } else {
          // Add one empty row
          this.addResourceRow();
        }
      }
    } else {
      if (editor) editor.classList.add("hidden");
      if (empty) empty.classList.remove("hidden");
    }
  },

  addResourceRow(url = "", label = "") {
    const div = document.createElement("div");
    div.className = "resource-row";
    div.style.display = "flex";
    div.style.gap = "8px";

    div.innerHTML = `
        <input type="text" class="input-text res-url" placeholder="URL" value="${url}" style="flex:1">
        <input type="text" class="input-text res-label" placeholder="Label" value="${label}" style="flex:1">
        <button class="icon-danger" style="border:none; background:transparent; cursor:pointer;" onclick="this.parentElement.remove()">×</button>
      `;
    const list = document.getElementById("resources-list");
    if (list) list.appendChild(div);
  },

  updatePreview() {
    // If in visual mode, update DOM
    if (this.state.view === "visual") {
      this.updatePreviewFromInputs();
    } else if (this.state.view === "source") {
      // Update Source Code Textarea
      const json = JSON.stringify(this.state.data, null, 2);
      const output = document.getElementById("code-output");
      if (output) {
        output.value =
          `export const appConfig = ${JSON.stringify(this.state.config, null, 2)};\n\n` +
          `export const contentData = ${json};`;
      }
    }
  },

  updatePreviewFromInputs() {
    // Updates the visual preview based on CURRENT INPUT STATES (for live editing)
    // or falls back to active item data if inputs are not focused

    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : "";
    };

    const title = getVal("inp-title");
    const desc = getVal("inp-desc");
    const expl = getVal("inp-expl");
    const code = getVal("inp-code");
    const prompt = getVal("inp-prompt");

    // 1. Header
    const prevTitle = document.getElementById("prev-title");
    if (prevTitle) prevTitle.textContent = title || "Item Title";

    const prevDesc = document.getElementById("prev-desc");
    if (prevDesc) prevDesc.textContent = desc || "Description...";

    // 2. Content Body
    const contentContainer = document.getElementById("prev-content");
    if (!contentContainer) return;

    let html = "";

    // Explanation
    if (expl) {
      html += `<div style="margin-bottom: 24px; font-family: var(--font-ui); color: var(--text-main); line-height: 1.6;">${expl.replace(/\n/g, "<br>")}</div>`;
    }

    // Code
    if (code) {
      html += `
            <div style="background: #1e1e1e; padding: 16px; border-radius: 8px; border: 1px solid #333; margin-bottom: 24px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #d4d4d4; white-space: pre-wrap;">
                ${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
        `;
    }

    // Prompt
    if (prompt) {
      html += `
            <div style="background: rgba(168, 85, 247, 0.1); border-left: 3px solid #a855f7; padding: 16px; border-radius: 4px; color: #e9d5ff; font-size: 13px; margin-bottom: 24px;">
                <strong>💡 Challenge:</strong><br>
                ${prompt}
            </div>
        `;
    }

    // Resources
    const resRows = document.querySelectorAll("#resources-list .resource-row");
    if (resRows.length > 0) {
      html += `<div style="margin-top: 24px; border-top: 1px solid #333; padding-top: 16px;">`;
      html += `<h4 style="font-size: 12px; color: #888; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Resources</h4>`;
      html += `<ul style="list-style: none; padding: 0;">`;
      resRows.forEach((row) => {
        const url = row.querySelector(".res-url").value;
        const label = row.querySelector(".res-label").value;
        if (url && label) {
          html += `
                    <li style="margin-bottom: 6px;">
                        <a href="#" style="color: #a855f7; text-decoration: none; font-size: 13px;">🔗 ${label}</a>
                    </li>
                `;
        }
      });
      html += `</ul></div>`;
    }

    contentContainer.innerHTML = html;
  },

  // --- ACTIONS ---

  isItemActive(sIdx, iIdx) {
    return this.state.activeStage === sIdx && this.state.activeItem === iIdx;
  },

  selectItem(sIdx, iIdx) {
    this.state.activeStage = sIdx;
    this.state.activeItem = iIdx;
    this.render(); // Re-render tree (for active class) and editor
  },

  createNewStage() {
    const title = prompt("New Stage Title:");
    if (title) {
      this.state.data.push({
        title: title,
        description: "",
        items: [],
      });
      this.saveState();
      this.render();
    }
  },

  createNewItem(sIdx) {
    const title = prompt("New Item Title:");
    if (title) {
      const newItem = {
        title: title,
        description: "New description",
        items: [],
      };
      this.state.data[sIdx].items.push(newItem);
      this.selectItem(sIdx, this.state.data[sIdx].items.length - 1);
      this.saveState();
    }
  },

  saveCurrentItem() {
    if (this.state.activeStage === null || this.state.activeItem === null)
      return;

    const sIdx = this.state.activeStage;
    const iIdx = this.state.activeItem;

    // Gather Data
    const item = this.state.data[sIdx].items[iIdx];

    // Helper to safely get value
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : "";
    };

    item.title = getVal("inp-title");
    item.description = getVal("inp-desc");
    item.explanation = getVal("inp-expl");
    item.code = getVal("inp-code");
    item.prompt = getVal("inp-prompt");

    // Parse Resources
    const resRows = document.querySelectorAll("#resources-list .resource-row");
    item.resources = Array.from(resRows)
      .map((row) => {
        return {
          url: row.querySelector(".res-url").value,
          label: row.querySelector(".res-label").value,
        };
      })
      .filter((r) => r.url && r.label);

    this.saveState();
    toast.show("Item Saved!", "success");
    this.renderTree(); // Update title in tree if changed
  },

  deleteCurrentItem() {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const sIdx = this.state.activeStage;
    const iIdx = this.state.activeItem;

    this.state.data[sIdx].items.splice(iIdx, 1);
    this.state.activeItem = null; // Deselect

    this.saveState();
    this.render();
    toast.show("Item Deleted", "info");
  },

  deleteStage(sIdx) {
    const stage = this.state.data[sIdx];
    if (
      !confirm(
        `Are you sure you want to delete Stage: "${stage.title}"?\nThis will remove all ${stage.items.length} items inside it.`,
      )
    )
      return;

    this.state.data.splice(sIdx, 1);

    // Reset active if it was in this stage or if indices shifted
    this.state.activeStage = null;
    this.state.activeItem = null;

    this.saveState();
    this.render();
    toast.show("Stage Deleted", "info");
  },

  // --- VIEW & EXPORT ---

  switchView(mode) {
    this.state.view = mode;
    this.updatePreviewFromInputs(); // Sync preview before switching

    // Toggle Buttons
    document
      .querySelectorAll(".toggle-btn")
      .forEach((b) => b.classList.remove("active"));
    const activeBtn = document.querySelector(
      `.toggle-btn[data-view="${mode}"]`,
    );
    if (activeBtn) activeBtn.classList.add("active");

    // Toggle Containers
    const views = ["view-visual", "view-edit", "view-source"];
    views.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = "none";
        el.classList.remove("visible");
      }
    });

    if (mode === "visual") {
      const el = document.getElementById("view-visual");
      if (el) el.style.display = "flex";
    } else if (mode === "edit") {
      const el = document.getElementById("view-edit");
      if (el) el.style.display = "block";
    } else {
      const el = document.getElementById("view-source");
      if (el) {
        el.style.display = "block";
        el.classList.add("visible");
      }
      this.updatePreview(); // Generate JSON for source view
    }
  },

  copyJSON() {
    const json = JSON.stringify(this.state.data, null, 2);
    const fullContent =
      `export const appConfig = ${JSON.stringify(this.state.config, null, 2)};\n\n` +
      `export const contentData = ${json};`;

    navigator.clipboard.writeText(fullContent).then(() => {
      toast.show("Copied to clipboard!", "success");
    });
  },

  applySourceEdits() {
    const raw = document.getElementById("code-output").value;
    try {
      // Robust Parsing: Find markers instead of Regex
      const startMarker = "export const contentData =";
      const startIdx = raw.indexOf(startMarker);

      if (startIdx === -1) {
        throw new Error("Could not find 'export const contentData ='");
      }

      // Find first '[' after export
      const jsonStart = raw.indexOf("[", startIdx);
      // Find last '];'
      const jsonEnd = raw.lastIndexOf("];");

      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error("Could not find valid '[ ... ];' block.");
      }

      // Extract just the Array part: [ ... ]
      // jsonEnd + 1 includes the closing ']'
      const jsonStr = raw.substring(jsonStart, jsonEnd + 1);

      // Parse using Function constructor (safer/cleaner than direct eval)
      const parsedData = new Function("return " + jsonStr)();

      if (!Array.isArray(parsedData)) {
        throw new Error("Parsed content is not an Array.");
      }

      this.state.data = parsedData;
      this.saveState();
      this.switchView("visual");
      this.render();
      toast.show("Changes Applied!", "success");
    } catch (e) {
      console.error(e);
      toast.show("Syntax Error: " + e.message, "error");
    }
  },

  saveState() {
    localStorage.setItem("roadmap_data", JSON.stringify(this.state.data));
    localStorage.setItem("roadmap_config", JSON.stringify(this.state.config));
  },

  handleTreeClick(e) {
    // If we needed delegation for controls inside items, we'd do it here
    // But currently simple onclicks on created elements work fine since we re-render the whole tree
  },
};

// Start
App.init();
