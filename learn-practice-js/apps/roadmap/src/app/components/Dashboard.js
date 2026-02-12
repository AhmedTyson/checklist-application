import { dom } from "../../shared/dom.js";
import { contentData } from "../../data/content.js";

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

    this.renderStats();

    // Grid
    dom.dashGrid.innerHTML = "";
    contentData.forEach((stage, index) => {
      const total = stage.items.length;
      let completed = 0;
      stage.items.forEach((_, i) => {
        if (this.store.isCompleted(`${index}-${i}`)) completed++;
      });
      const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

      const card = document.createElement("div");
      card.className = "dash-card";
      card.onclick = () => onLoadStage(index);

      card.innerHTML = `
                <h3>${stage.title}</h3>
                <div class="dash-mini-bar">
                    <div class="dash-mini-fill" style="width: ${percent}%"></div>
                </div>
                <div class="dash-meta">
                    <span>${completed}/${total} Items</span> • <span>${percent}%</span>
                </div>
            `;
      dom.dashGrid.appendChild(card);
    });
  }

  renderStats() {
    let total = 0;
    contentData.forEach((s) => (total += s.items.length));
    const completed = this.store.state.progress.length;
    const percent = Math.round((completed / total) * 100) || 0;

    if (dom.progressBar) dom.progressBar.style.width = `${percent}%`;
    if (dom.percentage) dom.percentage.innerText = `${percent}%`;
    if (dom.heroPercentage) dom.heroPercentage.innerText = `${percent}%`;
  }
}
