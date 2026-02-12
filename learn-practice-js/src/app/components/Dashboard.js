import { dom } from "../../shared/dom.js";

export class Dashboard {
  constructor(store) {
    this.store = store;
  }

  render(onLoadStage) {
    // Visibility
    dom.dashContainer.classList.remove("hidden");
    dom.stageViewWrapper.classList.add("hidden");
    dom.detailContent.classList.add("hidden");
    dom.detailEmpty.classList.remove("hidden");

    const stats = this.calcStats();
    this.renderStatCards(stats);
    this.renderHero(stats);
    this.renderStageTable(stats.stages, onLoadStage);
    this.renderHeatmap();
    this.updateGlobalProgress(stats);
  }

  // --- Stats Calculation ---

  calcStats() {
    let total = 0;
    let completed = 0;
    const stages = this.contentData.map((stage, index) => {
      const stageTotal = stage.items.length;
      let stageDone = 0;
      stage.items.forEach((_, i) => {
        if (this.store.isCompleted(`${index}-${i}`)) stageDone++;
      });
      total += stageTotal;
      completed += stageDone;
      return {
        title: stage.title,
        description: stage.description,
        total: stageTotal,
        completed: stageDone,
        percent:
          stageTotal === 0 ? 0 : Math.round((stageDone / stageTotal) * 100),
        index,
      };
    });

    return {
      total,
      completed,
      remaining: total - completed,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      streak: this.store.getStreak(),
      stages,
    };
  }

  // --- Stat Cards ---

  renderStatCards(stats) {
    if (dom.statTotal) dom.statTotal.textContent = stats.total;
    if (dom.statCompleted) dom.statCompleted.textContent = stats.completed;
    if (dom.statStreak) dom.statStreak.textContent = stats.streak;
    if (dom.statRemaining) dom.statRemaining.textContent = stats.remaining;
  }

  // --- Hero ---

  renderHero(stats) {
    if (dom.heroPercentage)
      dom.heroPercentage.textContent = `${stats.percent}%`;

    // Find first incomplete stage
    const currentStage = stats.stages.find((s) => s.percent < 100);
    if (currentStage && dom.heroTitle) {
      dom.heroTitle.textContent = currentStage.title;
      dom.heroDesc.textContent = `${currentStage.completed}/${currentStage.total} items mastered — ${currentStage.description}`;
    } else if (stats.completed === stats.total && dom.heroTitle) {
      dom.heroTitle.textContent = "🏆 Course Complete!";
      dom.heroDesc.textContent =
        "You have mastered all 123 JavaScript concepts. Incredible work!";
    }
  }

  // --- Stage Table ---

  renderStageTable(stages, onLoadStage) {
    if (!dom.stageTable) return;
    dom.stageTable.innerHTML = "";

    stages.forEach((stage) => {
      const row = document.createElement("div");
      row.className = "stage-row";
      row.onclick = () => onLoadStage(stage.index);

      // Status badge
      let badge = "not-started";
      let badgeText = "Not Started";
      if (stage.percent === 100) {
        badge = "complete";
        badgeText = "Complete";
      } else if (stage.completed > 0) {
        badge = "in-progress";
        badgeText = "In Progress";
      }

      // SVG ring
      const radius = 16;
      const circumference = 2 * Math.PI * radius;
      const dashoffset = circumference - (stage.percent / 100) * circumference;

      row.innerHTML = `
        <div class="stage-row__ring">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="${radius}" fill="none" stroke="var(--border)" stroke-width="3"/>
            <circle cx="20" cy="20" r="${radius}" fill="none" stroke="var(--accent)" stroke-width="3"
              stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}"
              stroke-linecap="round" transform="rotate(-90 20 20)"
              style="transition: stroke-dashoffset 0.6s ease"/>
          </svg>
          <span class="ring-text">${stage.percent}%</span>
        </div>
        <div class="stage-row__info">
          <span class="stage-row__title">${stage.title}</span>
          <div class="stage-row__bar-container">
            <div class="stage-row__bar">
              <div class="stage-row__bar-fill" style="width: ${stage.percent}%"></div>
            </div>
            <span class="stage-row__count">${stage.completed}/${stage.total}</span>
          </div>
        </div>
        <span class="stage-badge stage-badge--${badge}">${badgeText}</span>
      `;
      dom.stageTable.appendChild(row);
    });
  }

  // --- Heatmap ---

  renderHeatmap() {
    if (!dom.activityHeatmap) return;
    dom.activityHeatmap.innerHTML = "";

    const history = this.store.getActivityHistory(30);
    history.forEach((entry) => {
      const dot = document.createElement("div");
      dot.className = `heatmap-dot ${entry.active ? "heatmap-dot--active" : ""}`;
      dot.title = `${entry.date} ${entry.active ? "✓ Studied" : "—"}`;
      dom.activityHeatmap.appendChild(dot);
    });
  }

  // --- Global Progress Bar (sidebar) ---

  updateGlobalProgress(stats) {
    if (dom.progressBar) dom.progressBar.style.width = `${stats.percent}%`;
    if (dom.percentage) dom.percentage.textContent = `${stats.percent}%`;
  }

  renderStats() {
    const stats = this.calcStats();
    this.renderStatCards(stats);
    this.updateGlobalProgress(stats);
    if (dom.heroPercentage)
      dom.heroPercentage.textContent = `${stats.percent}%`;
  }
}
