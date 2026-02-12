import { dom } from "./dom.js";
import { state, actions } from "./state.js";
import { contentData } from "../content.js";
import { syntax } from "./syntax.js"; // Import

export const view = {
  // ... (rest of view content)
  renderNav: (onLoadDashboard, onLoadStage) => {
    dom.nav.innerHTML = "";

    // Dashboard Link
    const dashLink = document.createElement("div");
    dashLink.className = `nav-item ${state.currentStageIdx === -1 ? "active" : ""}`;
    dashLink.innerText = "Dashboard";
    dashLink.onclick = onLoadDashboard;
    dom.nav.appendChild(dashLink);

    // Separator
    const sep = document.createElement("div");
    sep.style.height = "1px";
    sep.style.background = "var(--border)";
    sep.style.margin = "8px 0";
    dom.nav.appendChild(sep);

    contentData.forEach((stage, index) => {
      const el = document.createElement("div");
      el.className = `nav-item ${state.currentStageIdx === index ? "active" : ""}`;
      el.innerText = stage.title;
      el.onclick = () => onLoadStage(index);
      dom.nav.appendChild(el);
    });
  },

  renderDashboard: (onLoadStage) => {
    // Toggle Views
    dom.dashContainer.classList.remove("hidden");
    dom.stageViewWrapper.classList.add("hidden");
    dom.detailContent.classList.add("hidden");
    dom.detailEmpty.classList.remove("hidden");

    view.renderGlobalStats();

    // Grid
    dom.dashGrid.innerHTML = "";
    contentData.forEach((stage, index) => {
      const total = stage.items.length;
      let completed = 0;
      stage.items.forEach((_, i) => {
        if (state.progress.includes(`${index}-${i}`)) completed++;
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
  },

  renderStage: (index, onSelectItem) => {
    dom.dashContainer.classList.add("hidden");
    dom.stageViewWrapper.classList.remove("hidden");
    dom.detailContent.classList.add("hidden");
    dom.detailEmpty.classList.remove("hidden");

    const stage = contentData[index];
    dom.currentStageName.innerText = stage.title;

    // Ensure progress bar visible
    if (dom.stageProgressBar)
      dom.stageProgressBar.parentElement.parentElement.style.display = "flex";

    view.updateStageProgress(index);

    dom.contentArea.innerHTML = stage.items
      .map((item, i) => {
        const id = `${index}-${i}`;
        const isCompleted = state.progress.includes(id);
        return `
                <div class="list-item ${isCompleted ? "completed" : ""}" 
                     id="item-${i}"
                     data-idx="${i}">
                    <div class="item-left">
                        <span class="item-title">${item.title}</span>
                        <span class="item-desc">${item.desc}</span>
                    </div>
                    <div class="item-status-icon"></div>
                </div>
            `;
      })
      .join("");

    // Attach listeners
    document.querySelectorAll(".list-item").forEach((el) => {
      el.addEventListener("click", () =>
        onSelectItem(parseInt(el.dataset.idx)),
      );
    });
  },

  renderItemDetail: (item, sIdx, iIdx) => {
    // Highlight List Item
    document
      .querySelectorAll(".list-item")
      .forEach((el) => el.classList.remove("selected"));

    // Handle both regular list and search list IDs
    const listId =
      state.currentStageIdx === -1
        ? `search-item-${sIdx}-${iIdx}`
        : `item-${iIdx}`;
    const targetEl = document.getElementById(listId);
    if (targetEl) targetEl.classList.add("selected");

    // Show Detail
    dom.detailEmpty.classList.add("hidden");
    dom.detailContent.classList.remove("hidden");

    dom.detailTitle.innerText = item.title;
    dom.detailExplanation.innerHTML = item.explanation;
    // Syntax Highlight
    const rawCode = item.code || "// No code provided";
    dom.detailCode.innerHTML = syntax.highlight(rawCode);

    dom.detailPrompt.innerText = item.prompt || "...";
    dom.detailId.innerText = `ID:${sIdx}.${iIdx}`;

    // External Resources
    const resourceContainer = document.getElementById("detail-resources");
    if (item.resources && item.resources.length > 0) {
      resourceContainer.innerHTML = `<h3>Read More</h3><div class="resource-list">
                ${item.resources.map((r) => `<a href="${r.url}" target="_blank" class="resource-link"><span>🔗</span> ${r.label}</a>`).join("")}
            </div>`;
      resourceContainer.style.display = "block";
    } else {
      resourceContainer.innerHTML = "";
      resourceContainer.style.display = "none";
    }

    // Toggle State
    const id = `${sIdx}-${iIdx}`;
    dom.toggle.checked = state.progress.includes(id);

    // Mobile: Slide in
    if (dom.detailPanel) dom.detailPanel.classList.add("open");
  },

  renderSearchResults: (results, onSelectSearchItem) => {
    dom.dashContainer.classList.add("hidden");
    dom.stageViewWrapper.classList.remove("hidden");
    dom.currentStageName.innerText = `Search Results`;
    dom.stageProgressBar.parentElement.parentElement.style.display = "none";

    if (results.length === 0) {
      dom.contentArea.innerHTML = `<div class="detail-empty-state"><p>No results found.</p></div>`;
      return;
    }

    dom.contentArea.innerHTML = results
      .map((res) => {
        const id = `${res.sIdx}-${res.iIdx}`;
        const isCompleted = state.progress.includes(id);
        const stageTitle = contentData[res.sIdx].title;

        return `
                <div class="list-item ${isCompleted ? "completed" : ""}" 
                        id="search-item-${id}"
                        data-sidx="${res.sIdx}"
                        data-iidx="${res.iIdx}">
                    <div class="item-left">
                        <span class="item-title">${res.title}</span>
                        <span class="item-desc"><span style="color:var(--accent)">${stageTitle}</span> • ${res.desc}</span>
                    </div>
                    <div class="item-status-icon"></div>
                </div>
            `;
      })
      .join("");

    document.querySelectorAll(".list-item").forEach((el) => {
      el.addEventListener("click", () =>
        onSelectSearchItem(
          parseInt(el.dataset.sidx),
          parseInt(el.dataset.iidx),
        ),
      );
    });
  },

  renderGlobalStats: () => {
    let total = 0;
    contentData.forEach((s) => (total += s.items.length));
    const completed = state.progress.length;
    const percent = Math.round((completed / total) * 100) || 0;

    dom.progressBar.style.width = `${percent}%`;
    dom.percentage.innerText = `${percent}%`;
    if (dom.heroPercentage) dom.heroPercentage.innerText = `${percent}%`;
  },

  updateStageProgress: (idx) => {
    if (idx === -1) return;
    const items = contentData[idx].items;
    const total = items.length;
    let completed = 0;
    items.forEach((_, i) => {
      if (state.progress.includes(`${idx}-${i}`)) completed++;
    });
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    dom.stageProgressBar.style.width = `${percent}%`;
    dom.stagePercentage.innerText = `${percent}%`;
  },

  updateItemStatus: (id, isCompleted) => {
    // Update both list views if present
    const searchEl = document.getElementById(`search-item-${id}`);
    if (searchEl) {
      if (isCompleted) searchEl.classList.add("completed");
      else searchEl.classList.remove("completed");
    }

    const [s, i] = id.split("-");
    const itemEl = document.getElementById(`item-${i}`);
    if (itemEl && parseInt(s) === state.currentStageIdx) {
      if (isCompleted) itemEl.classList.add("completed");
      else itemEl.classList.remove("completed");
    }
  },
};
