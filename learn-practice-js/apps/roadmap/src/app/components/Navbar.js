import { dom } from "../../shared/dom.js";
import { contentData } from "../../data/content.js";

export class Navbar {
  constructor(store) {
    this.store = store;
  }

  render(onLoadDashboard, onLoadStage) {
    dom.nav.innerHTML = "";
    const currentIdx = this.store.state.currentStageIdx;

    // Dashboard Link
    const dashLink = document.createElement("div");
    dashLink.className = `nav-item ${currentIdx === -1 ? "active" : ""}`;
    dashLink.innerText = "Dashboard";
    dashLink.onclick = onLoadDashboard;
    dom.nav.appendChild(dashLink);

    // Separator
    const sep = document.createElement("div");
    sep.style.height = "1px";
    sep.style.background = "var(--border)";
    sep.style.margin = "8px 0";
    dom.nav.appendChild(sep);

    // Stages
    contentData.forEach((stage, index) => {
      const el = document.createElement("div");
      el.className = `nav-item ${currentIdx === index ? "active" : ""}`;
      el.innerText = stage.title;
      el.onclick = () => onLoadStage(index);
      dom.nav.appendChild(el);
    });
  }
}
