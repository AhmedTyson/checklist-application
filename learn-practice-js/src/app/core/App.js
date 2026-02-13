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

    // Update sidebar branding
    this.updateCourseBranding();

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

  updateCourseBranding() {
    const titleEl = document.getElementById("sidebar-course-title");
    const logoContainer = document.querySelector(".brand-logo"); // Target the logo container
    const subtitleEl = document.querySelector(".brand-subtitle");

    if (!titleEl || !subtitleEl) return;

    // Helper to get icon HTML
    const getIconHTML = (iconId, color) => {
      if (!iconId) return null;
      // Font Awesome
      if (iconId.includes("fa-")) {
        return `<i class="${iconId}" style="font-size: 24px; color: ${color};"></i>`;
      }
      // Custom SVG
      if (iconId.trim().startsWith("<svg")) {
        return iconId
          .replace(/width="\d+"/, 'width="24"')
          .replace(/height="\d+"/, 'height="24"');
      }
      return null; // Fallback to default if not custom/FA
    };

    // Get current course details
    let courseTitle = "Synapse";
    let courseIcon = null; // Default null (keeps existing if any or logic to set default)
    let courseColor = "#a855f7";

    const course = getCourse(this.courseId);

    if (course) {
      courseTitle = course.title;
      courseIcon = course.icon;
      courseColor = course.color || "#a855f7";

      // Apply accent color
      document.documentElement.style.setProperty("--accent", courseColor);
    } else if (this.courseId === "javascript") {
      // Fallback for initial JS course if not found in store for some reason
      courseTitle = "JavaScript";
      courseIcon = "javascript"; // Assume exists or handled
    }

    // Update Title
    titleEl.textContent = courseTitle;
    subtitleEl.textContent = "Course Dashboard";

    // Update Icon if possible
    if (logoContainer && courseIcon) {
      const iconHTML = getIconHTML(courseIcon, courseColor);
      if (iconHTML) {
        logoContainer.innerHTML = iconHTML;
      } else {
        // Revert to default Synapse logo if needed, or keep as is?
        // If it's a simple ID ("code"), we might not be able to render it here easily
        // without the full SVG map.
        // Ideally we'd move the SVG map to a shared utility.
        // For now, if getIconHTML returns null, we do nothing (keep default)
        // OR we could strictly enforce the new brand logo.
        // But the user asked for "Course Icon".
        // If it's a built-in course like 'javascript' with a simple ID, we might miss it.
        // Let's simple-check for 'javascript' simple ID.
        if (courseIcon === "javascript") {
          logoContainer.innerHTML = `<i class="fa-brands fa-js" style="font-size: 24px; color: ${courseColor};"></i>`;
        }
      }
    }
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
