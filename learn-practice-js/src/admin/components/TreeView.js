import { toast } from "../../shared/toast.js";

export class TreeView {
  constructor(store, containerId = "tree-root") {
    this.store = store;
    this.container = document.getElementById(containerId);

    // Subscribe to store changes to auto-render
    this.store.subscribe((state) => {
      this.render(state);
    });

    // Initial Render
    this.render(this.store.getState());

    // Bind Search
    const searchInput = document.getElementById("inp-search-tree");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.filter(e.target.value));
    }

    // Bind New Stage
    const newStageBtn = document.getElementById("btn-new-stage");
    if (newStageBtn) {
      newStageBtn.onclick = () => this.handleNewStage();
    }
  }

  handleNewStage() {
    const title = prompt("New Stage Title:");
    if (!title) return;

    const state = this.store.getState();
    const newData = [...state.data];
    newData.push({
      title,
      items: [],
    });

    this.store.setState({
      data: newData,
      activeStage: newData.length - 1,
      activeItem: null,
    });

    toast.show("Stage added", "success");
  }

  render(state) {
    if (!this.container) return;
    this.container.innerHTML = "";

    state.data.forEach((stage, sIdx) => {
      // Stage Header
      const stageEl = document.createElement("div");
      stageEl.className = "tree-stage";

      const header = document.createElement("div");
      header.className = "tree-stage-header";
      header.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <span class="toggle-icon" style="font-size:10px; transition:transform 0.2s; display:flex; align-items:center; justify-content:center;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </span>
                <span>${stage.title}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size: 10px; color: #666;">${stage.items.length} items</span>
                <button class="icon-danger delete-stage-btn" style="border:none; background:transparent; cursor:pointer;" title="Delete Stage">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        `;

      // Helper: Delete Stage
      const delBtn = header.querySelector(".delete-stage-btn");
      if (delBtn) {
        delBtn.onclick = (e) => {
          e.stopPropagation();
          this.handleDeleteStage(sIdx);
        };
      }

      // Items Container
      const itemsCont = document.createElement("div");
      itemsCont.className = `tree-items`;
      // Expand if active
      if (state.activeStage === sIdx) {
        itemsCont.classList.add("expanded");
        header.querySelector(".toggle-icon").style.transform = "rotate(90deg)";
      }

      // Toggle Logic
      header.onclick = () => {
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

      // Items
      stage.items.forEach((item, iIdx) => {
        const itemEl = document.createElement("div");
        const isActive =
          state.activeStage === sIdx && state.activeItem === iIdx;
        itemEl.className = `tree-item ${isActive ? "active" : ""}`;
        itemEl.textContent = item.title;
        itemEl.onclick = (e) => {
          e.stopPropagation();
          this.store.setState({ activeStage: sIdx, activeItem: iIdx });
        };
        itemsCont.appendChild(itemEl);
      });

      // Add Item Button
      const addBtn = document.createElement("div");
      addBtn.className = "tree-item";
      addBtn.style.color = "var(--text-dim)";
      addBtn.style.fontStyle = "italic";
      addBtn.textContent = "+ Add Item";
      addBtn.onclick = (e) => {
        e.stopPropagation();
        this.handleAddItem(sIdx);
      };
      itemsCont.appendChild(addBtn);

      stageEl.appendChild(header);
      stageEl.appendChild(itemsCont);
      this.container.appendChild(stageEl);
    });
  }

  handleAddItem(sIdx) {
    const title = prompt("New Item Title:");
    if (!title) return;

    const state = this.store.getState();
    const newData = [...state.data]; // Shallow copy array
    // Deep copy not strictly needed if we push new object, but good practice
    // Here we just mutate the stage's item array which is fine in specific immutable patterns but direct mutation is easier for now

    const newItem = {
      title,
      description: "New description",
      items: [], // sub-items if nested, but here items are leaves
    };

    newData[sIdx].items.push(newItem);

    // Update state
    this.store.setState({
      data: newData,
      activeStage: sIdx,
      activeItem: newData[sIdx].items.length - 1,
    });
  }

  handleDeleteStage(sIdx) {
    const state = this.store.getState();
    const stage = state.data[sIdx];

    if (!confirm(`Delete Stage "${stage.title}" and all its items?`)) return;

    const newData = [...state.data];
    newData.splice(sIdx, 1);

    this.store.setState({
      data: newData,
      activeStage: null,
      activeItem: null,
    });
    toast.show("Stage deleted", "info");
  }

  filter(query) {
    const q = query.toLowerCase();
    const allItems = this.container.querySelectorAll(".tree-item");
    const allStages = this.container.querySelectorAll(".tree-stage");

    if (!q) {
      allItems.forEach((el) => el.classList.remove("hidden"));
      allStages.forEach((el) => el.classList.remove("hidden"));
      return;
    }

    // We rely on DOM text content for filtering to match visual representation
    allStages.forEach((stageEl) => {
      let hasVisible = false;
      const items = stageEl.querySelectorAll(".tree-item");
      items.forEach((item) => {
        if (item.textContent.toLowerCase().includes(q)) {
          item.classList.remove("hidden");
          hasVisible = true;
        } else {
          item.classList.add("hidden");
        }
      });

      if (hasVisible) {
        stageEl.classList.remove("hidden");
        stageEl.querySelector(".tree-items").classList.add("expanded");
      } else {
        stageEl.classList.add("hidden");
      }
    });
  }
}
