import { dom } from "../../shared/dom.js";
import { Store } from "./Store.js";
import { toast } from "../../shared/toast.js";
import { search } from "./Search.js";

// Components
import { Navbar } from "../components/Navbar.js";
import { Dashboard } from "../components/Dashboard.js";
import { StageView } from "../components/StageView.js";
import { DetailView } from "../components/DetailView.js";

// Data
import { contentData as builtinContent } from "../../data/content.js";
import { getCourseContent, getCourse } from "../../data/CourseStore.js";

class App {
  constructor() {
    this.store = new Store();

    // Load correct content based on courseId
    this.courseId = this.store.courseId;
    if (this.courseId === "javascript") {
      this.contentData = builtinContent;
    } else {
      this.contentData = getCourseContent(this.courseId) || [];
    }

    // Initialize Components (pass contentData)
    this.navbar = new Navbar(this.store);
    this.dashboard = new Dashboard(this.store);
    this.stageView = new StageView(this.store);
    this.detailView = new DetailView(this.store);

    // Inject contentData into components that need it
    this.dashboard.contentData = this.contentData;
    this.stageView.contentData = this.contentData;

    // Update course title in sidebar if it's a custom course
    this.updateCourseBranding();

    this.init();
  }

  init() {
    this.loadDashboard();

    // Listeners
    if (dom.searchInput)
      dom.searchInput.addEventListener("input", (e) => this.handleSearch(e));
    if (dom.toggle)
      dom.toggle.addEventListener("change", (e) => this.handleToggle(e));

    // Mobile
    if (dom.menuBtn)
      dom.menuBtn.onclick = () => dom.sidebar.classList.toggle("open");
    if (dom.backBtn)
      dom.backBtn.onclick = () => dom.detailPanel.classList.remove("open");

    window.app = this;
  }

  updateCourseBranding() {
    const header = document.getElementById("sidebar-course-title");
    if (!header) return;

    if (this.courseId === "javascript") {
      header.textContent = "Synapse";
    } else {
      const course = getCourse(this.courseId);
      if (course) {
        header.textContent = course.title;
        // Apply custom accent color
        if (course.color) {
          document.documentElement.style.setProperty("--accent", course.color);
        }
      }
    }
  }

  // --- Navigation ---

  loadDashboard() {
    this.store.setState({
      currentStageIdx: -1,
      selectedItemIdx: null,
      tempSearchContext: null,
    });

    if (dom.sidebar) dom.sidebar.classList.remove("open");

    this.navbar.render(
      () => this.loadDashboard(),
      (idx) => this.loadStage(idx),
      this.contentData,
    );
    this.dashboard.render((idx) => this.loadStage(idx));
  }

  loadStage(index) {
    this.store.setState({
      currentStageIdx: index,
      selectedItemIdx: null,
      tempSearchContext: null,
    });

    if (dom.sidebar) dom.sidebar.classList.remove("open");

    this.navbar.render(
      () => this.loadDashboard(),
      (idx) => this.loadStage(idx),
      this.contentData,
    );
    this.stageView.render(index, (iIdx) => this.selectItem(iIdx));
  }

  selectItem(itemIdx) {
    const sIdx = this.store.state.currentStageIdx;
    this.store.setState({ selectedItemIdx: itemIdx });

    const item = this.contentData[sIdx].items[itemIdx];
    this.detailView.render(item, sIdx, itemIdx);
  }

  // --- Actions ---

  handleToggle(e) {
    const isChecked = e.target.checked;
    const state = this.store.state;
    let id;

    if (state.tempSearchContext) {
      id = `${state.tempSearchContext.sIdx}-${state.tempSearchContext.iIdx}`;
    } else if (state.currentStageIdx !== -1 && state.selectedItemIdx !== null) {
      id = `${state.currentStageIdx}-${state.selectedItemIdx}`;
    } else {
      return;
    }

    const isComplete = this.store.toggleItemComplete(id);

    // Update specific item UI
    this.stageView.updateItemStatus(id, isComplete);

    // Update Stats
    if (state.currentStageIdx === -1) {
      this.dashboard.renderStats();
    } else {
      this.stageView.updateProgress(state.currentStageIdx);
    }

    if (isComplete) toast.show("Topic Mastered!", "success");
  }

  handleSearch(e) {
    const query = e.target.value.trim();
    if (query.length === 0) {
      if (this.store.state.currentStageIdx === -1) this.loadDashboard();
      else this.loadStage(this.store.state.currentStageIdx);
      return;
    }

    const results = search.run(query, this.contentData);
    this.stageView.renderSearchResults(results, (s, i) =>
      this.selectSearchItem(s, i),
    );
  }

  selectSearchItem(sIdx, iIdx) {
    this.store.setState({
      tempSearchContext: { sIdx, iIdx },
      selectedItemIdx: iIdx,
    });
    const item = this.contentData[sIdx].items[iIdx];
    this.detailView.render(item, sIdx, iIdx);
  }

  resetData() {
    if (confirm("Reset all progress?")) {
      this.store.resetProgress();
      location.reload();
    }
  }

  continueJourney() {
    // Find first uncompleted item across all stages
    for (let s = 0; s < this.contentData.length; s++) {
      for (let i = 0; i < this.contentData[s].items.length; i++) {
        if (!this.store.isCompleted(`${s}-${i}`)) {
          this.loadStage(s);
          setTimeout(() => this.selectItem(i), 50);
          return;
        }
      }
    }
    // All complete
    this.loadStage(0);
  }
}

// Global hook
window.AppClass = App;
window.onload = () => {
  window.app = new App();
};
