import { dom } from "./dom.js";
import { state, actions } from "./state.js";
import { view } from "./view.js";
import { search } from "./search.js";
import { contentData } from "../content.js";
import { toast } from "./toast.js";

const app = {
  init: () => {
    // Default to dashboard
    app.loadDashboard();

    // Listeners
    dom.searchInput.addEventListener("input", app.handleSearch);
    dom.toggle.addEventListener("change", app.handleToggle);

    // Mobile Listeners
    if (dom.menuBtn) {
      dom.menuBtn.addEventListener("click", () => {
        dom.sidebar.classList.toggle("open");
      });
    }
    if (dom.backBtn) {
      dom.backBtn.addEventListener("click", () => {
        dom.detailPanel.classList.remove("open");
      });
    }
  },

  loadDashboard: () => {
    state.currentStageIdx = -1;
    state.selectedItemIdx = null;
    state.tempSearchContext = null;

    if (dom.sidebar) dom.sidebar.classList.remove("open"); // Mobile: Close sidebar

    view.renderNav(app.loadDashboard, app.loadStage);
    view.renderDashboard(app.loadStage);
  },

  loadStage: (index) => {
    state.currentStageIdx = index;
    state.selectedItemIdx = null;
    state.tempSearchContext = null;

    if (dom.sidebar) dom.sidebar.classList.remove("open"); // Mobile: Close sidebar

    view.renderNav(app.loadDashboard, app.loadStage);
    view.renderStage(index, app.selectItem);
  },

  selectItem: (itemIdx) => {
    state.selectedItemIdx = itemIdx;
    const stageIdx = state.currentStageIdx;

    view.renderItemDetail(
      contentData[stageIdx].items[itemIdx],
      stageIdx,
      itemIdx,
    );
  },

  selectSearchItem: (sIdx, iIdx) => {
    state.tempSearchContext = { sIdx, iIdx };
    state.selectedItemIdx = iIdx; // For detail view reference context (less reliable in search, but okay)

    view.renderItemDetail(contentData[sIdx].items[iIdx], sIdx, iIdx);
  },

  handleSearch: (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
      // Restore
      if (state.currentStageIdx === -1) app.loadDashboard();
      else app.loadStage(state.currentStageIdx);
      return;
    }

    // Search Mode
    const results = search.run(query);
    view.renderSearchResults(results, app.selectSearchItem);
  },

  handleToggle: (e) => {
    const isChecked = e.target.checked;
    let id;

    if (state.tempSearchContext) {
      id = `${state.tempSearchContext.sIdx}-${state.tempSearchContext.iIdx}`;
    } else if (state.currentStageIdx !== -1 && state.selectedItemIdx !== null) {
      id = `${state.currentStageIdx}-${state.selectedItemIdx}`;
    } else {
      return;
    }

    actions.toggleItemComplete(id);

    // Update specific item UI
    view.updateItemStatus(id, isChecked);

    // Update stats
    view.renderGlobalStats();
    if (state.currentStageIdx !== -1) {
      view.updateStageProgress(state.currentStageIdx);
    }

    // Toast Feedback
    if (isChecked) {
      toast.show("Topic Mastered!", "success");
    }
  },
};

// Start
app.init();
