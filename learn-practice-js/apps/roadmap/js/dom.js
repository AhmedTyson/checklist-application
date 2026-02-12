// DOM Elements Cache
export const dom = {
  nav: document.getElementById("stage-nav"),
  contentArea: document.getElementById("content-area"),

  // Global Progress
  progressBar: document.getElementById("global-progress-bar"),
  percentage: document.getElementById("global-percentage"),

  // Header
  currentStageName: document.getElementById("current-stage-name"),
  stageProgressBar: document.getElementById("stage-progress-fill"),
  stagePercentage: document.getElementById("stage-percentage"),

  // Dashboard
  dashContainer: document.getElementById("dashboard-container"),
  stageViewWrapper: document.getElementById("stage-view-wrapper"),
  heroPercentage: document.getElementById("hero-percentage"),
  dashGrid: document.getElementById("dash-grid"),

  // Search
  searchInput: document.getElementById("search-input"),

  // Detail Pane
  detailEmpty: document.getElementById("detail-empty"),
  detailContent: document.getElementById("detail-content"),
  detailTitle: document.getElementById("detail-title"),
  detailExplanation: document.getElementById("detail-explanation"),
  detailCode: document.getElementById("detail-code"),
  detailPrompt: document.getElementById("detail-prompt"),
  detailId: document.getElementById("detail-id"),
  toggle: document.getElementById("mark-complete-toggle"),

  // Mobile
  menuBtn: document.getElementById("menu-btn"),
  backBtn: document.getElementById("back-btn"),
  sidebar: document.querySelector(".sidebar"),
  detailPanel: document.getElementById("detail-panel"),
};
