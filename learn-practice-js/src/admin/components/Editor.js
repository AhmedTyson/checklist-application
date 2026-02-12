import { toast } from "../../shared/toast.js";

export class Editor {
  constructor(store, containerId = "item-editor") {
    this.store = store;
    this.container = document.getElementById(containerId);
    this.emptyState = document.getElementById("editor-empty");

    this.inputs = {
      title: document.getElementById("inp-title"),
      desc: document.getElementById("inp-desc"),
      expl: document.getElementById("inp-expl"),
      code: document.getElementById("inp-code"),
      prompt: document.getElementById("inp-prompt"),
    };

    // Bind Input Events
    Object.values(this.inputs).forEach((input) => {
      if (input) {
        input.addEventListener("input", () => this.syncToStore());
      }
    });

    // Bind Resources
    const addResBtn = document.getElementById("btn-add-resource");
    if (addResBtn) addResBtn.onclick = () => this.addResourceRow();

    // Bind Save/Delete
    const saveBtn = document.getElementById("btn-save-item");
    if (saveBtn) saveBtn.onclick = () => this.save(); // Actually manual save might be redundant with auto-sync, but good for feedback

    const delBtn = document.getElementById("btn-delete-item");
    if (delBtn) delBtn.onclick = () => this.deleteItem();

    // Subscribe
    this.store.subscribe((state) => this.render(state));

    // Initial Render
    this.render(this.store.getState());
  }

  render(state) {
    if (state.activeStage === null || state.activeItem === null) {
      if (this.container) this.container.classList.add("hidden");
      if (this.emptyState) this.emptyState.classList.remove("hidden");
      return;
    }

    if (this.container) this.container.classList.remove("hidden");
    if (this.emptyState) this.emptyState.classList.add("hidden");

    // Only populate inputs if we switched items (avoid overwriting while typing)
    // To track this, we might need to store last rendered ID
    const newItemKey = `${state.activeStage}-${state.activeItem}`;
    if (this.lastRenderedKey !== newItemKey) {
      const item = state.data[state.activeStage].items[state.activeItem];
      this.populate(item);
      this.lastRenderedKey = newItemKey;
    }
  }

  populate(item) {
    if (this.inputs.title) this.inputs.title.value = item.title;
    if (this.inputs.desc)
      this.inputs.desc.value = item.description || item.desc || "";
    if (this.inputs.expl)
      this.inputs.expl.value = item.explanation || item.expl || "";
    if (this.inputs.code) this.inputs.code.value = item.code || "";
    if (this.inputs.prompt) this.inputs.prompt.value = item.prompt || "";

    this.renderResources(item.resources || []);
  }

  renderResources(resources) {
    const container = document.getElementById("resources-list");
    if (!container) return;
    container.innerHTML = "";

    if (resources.length === 0) {
      this.addResourceRow(); // Empty row
    } else {
      resources.forEach((r) => this.addResourceRow(r.url, r.label));
    }
  }

  addResourceRow(url = "", label = "") {
    const container = document.getElementById("resources-list");
    if (!container) return;

    const div = document.createElement("div");
    div.className = "resource-row";
    div.style.display = "flex";
    div.style.gap = "8px";

    div.innerHTML = `
        <input type="text" class="input-text res-url" placeholder="URL" value="${url}" style="flex:1">
        <input type="text" class="input-text res-label" placeholder="Label" value="${label}" style="flex:1">
        <button class="icon-danger remove-btn" style="border:none; background:transparent; cursor:pointer;">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      `;

    div.querySelector(".remove-btn").onclick = () => {
      div.remove();
      this.syncToStore();
    };

    // Add listeners to new inputs
    div
      .querySelectorAll("input")
      .forEach((i) => i.addEventListener("input", () => this.syncToStore()));

    container.appendChild(div);
  }

  syncToStore() {
    // Reads DOM and updates Store (without re-rendering Editor to avoid cursor jumps)
    const state = this.store.getState();
    if (state.activeStage === null || state.activeItem === null) return;

    const updatedData = [...state.data];
    const item = updatedData[state.activeStage].items[state.activeItem];

    item.title = this.inputs.title.value;
    item.description = this.inputs.desc.value;
    item.explanation = this.inputs.expl.value;
    item.code = this.inputs.code.value;
    item.prompt = this.inputs.prompt.value;

    // Resources
    const resRows = document.querySelectorAll("#resources-list .resource-row");
    item.resources = Array.from(resRows)
      .map((row) => ({
        url: row.querySelector(".res-url").value,
        label: row.querySelector(".res-label").value,
      }))
      .filter((r) => r.url && r.label);

    // We call setState but we don't want a full re-render loop that affects focus
    // The store notifies listeners. TreeView needs to know to update title.
    // Editor listener checks key and won't re-populate.
    this.store.setState({ data: updatedData });
  }

  save() {
    this.syncToStore();
    toast.show("Item Saved", "success");
    // Persist happens in App.js subscription to store usually, or we trigger it
  }

  deleteItem() {
    if (!confirm("Delete this item?")) return;

    const state = this.store.getState();
    const newData = [...state.data];
    newData[state.activeStage].items.splice(state.activeItem, 1);

    this.store.setState({
      data: newData,
      activeItem: null,
    });
    toast.show("Item Deleted", "info");
  }
}
