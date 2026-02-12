import { dom } from "../../shared/dom.js";
import { contentData } from "../../data/content.js";

export class StageView {
  constructor(store) {
    this.store = store;
  }

  render(index, onSelectItem) {
    // Visibility
    dom.dashContainer.classList.add("hidden");
    dom.stageViewWrapper.classList.remove("hidden");
    dom.detailContent.classList.add("hidden");
    dom.detailEmpty.classList.remove("hidden");

    const stage = contentData[index];
    dom.currentStageName.innerText = stage.title;

    // Show Progress
    if (dom.stageProgressBar)
      dom.stageProgressBar.parentElement.parentElement.style.display = "flex";

    this.updateProgress(index);

    // Render List
    dom.contentArea.innerHTML = stage.items
      .map((item, i) => {
        const id = `${index}-${i}`;
        const isCompleted = this.store.isCompleted(id);
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

    // Listeners
    document.querySelectorAll(".list-item").forEach((el) => {
      el.addEventListener("click", () =>
        onSelectItem(parseInt(el.dataset.idx)),
      );
    });
  }

  renderSearchResults(results, onSelectSearchItem) {
    dom.dashContainer.classList.add("hidden");
    dom.stageViewWrapper.classList.remove("hidden");
    dom.currentStageName.innerText = `Search Results`;
    if (dom.stageProgressBar)
      dom.stageProgressBar.parentElement.parentElement.style.display = "none";

    if (results.length === 0) {
      dom.contentArea.innerHTML = `<div class="detail-empty-state"><p>No results found.</p></div>`;
      return;
    }

    dom.contentArea.innerHTML = results
      .map((res) => {
        const id = `${res.sIdx}-${res.iIdx}`;
        const isCompleted = this.store.isCompleted(id);
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
  }

  updateProgress(idx) {
    if (idx === -1) return;
    const items = contentData[idx].items;
    const total = items.length;
    let completed = 0;
    items.forEach((_, i) => {
      if (this.store.isCompleted(`${idx}-${i}`)) completed++;
    });
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    dom.stageProgressBar.style.width = `${percent}%`;
    dom.stagePercentage.innerText = `${percent}%`;
  }

  updateItemStatus(id, isCompleted) {
    // Update Search List Item
    const searchEl = document.getElementById(`search-item-${id}`);
    if (searchEl) {
      isCompleted
        ? searchEl.classList.add("completed")
        : searchEl.classList.remove("completed");
    }

    // Update Regular List Item
    const [s, i] = id.split("-");
    // Only update if current stage matches
    if (parseInt(s) === this.store.state.currentStageIdx) {
      const itemEl = document.getElementById(`item-${i}`);
      if (itemEl) {
        isCompleted
          ? itemEl.classList.add("completed")
          : itemEl.classList.remove("completed");
      }
    }
  }
}
