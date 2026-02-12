import { dom } from "../../shared/dom.js";
import { syntax } from "../../shared/syntax.js";

export class DetailView {
  constructor(store) {
    this.store = store;
  }

  render(item, sIdx, iIdx) {
    // Highlight Selection
    document
      .querySelectorAll(".list-item")
      .forEach((el) => el.classList.remove("selected"));

    // determine active ID based on context (dashboard search vs stage list)
    // Actually simplicity: try to highlight both if present
    const regularId = `item-${iIdx}`;
    const searchId = `search-item-${sIdx}-${iIdx}`;

    // We prefer search ID if we are in search mode (stageIdx = -1), else regular
    const targetId =
      this.store.state.currentStageIdx === -1 ? searchId : regularId;

    const targetEl = document.getElementById(targetId);
    if (targetEl) targetEl.classList.add("selected");

    // Show Detail Panel
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
                ${item.resources
                  .map(
                    (
                      r,
                    ) => `<a href="${r.url}" target="_blank" class="resource-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> 
                    ${r.label}</a>`,
                  )
                  .join("")}
            </div>`;
      resourceContainer.style.display = "block";
    } else {
      resourceContainer.innerHTML = "";
      resourceContainer.style.display = "none";
    }

    // Toggle Checkbox State
    const id = `${sIdx}-${iIdx}`;
    dom.toggle.checked = this.store.isCompleted(id);

    // Mobile: Slide in
    if (dom.detailPanel) dom.detailPanel.classList.add("open");
  }
}
