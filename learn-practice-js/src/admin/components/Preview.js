export class Preview {
  constructor(store, containerId = "view-visual") {
    this.store = store;
    this.container = document.getElementById(containerId);

    // Bind Toolbar
    const btns = document.querySelectorAll(".toggle-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.store.setState({ view: btn.dataset.view });
      });
    });

    // Bind Apply Source
    const applyBtn = document.getElementById("btn-apply-source");
    if (applyBtn) applyBtn.onclick = () => this.applySource();

    this.store.subscribe((state) => this.render(state));

    // Initial Render
    this.render(this.store.getState());
  }

  render(state) {
    this.updateVisibility(state.view);

    if (state.view === "visual") {
      this.renderVisual(state);
    } else if (state.view === "source") {
      this.renderSource(state);
    }
    // Edit view is handled by Editor.js visibility logic or CSS
  }

  updateVisibility(view) {
    // Toggle Tabs
    document.querySelectorAll(".toggle-btn").forEach((b) => {
      if (b.dataset.view === view) b.classList.add("active");
      else b.classList.remove("active");
    });

    // Toggle Panes
    ["view-visual", "view-edit", "view-source"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (id === `view-${view}`) {
        el.style.display = view === "visual" ? "flex" : "block";
        if (view === "source") el.classList.add("visible");
      } else {
        el.style.display = "none";
        el.classList.remove("visible");
      }
    });
  }

  renderVisual(state) {
    // We render based on INPUTS if we are editing, but here we can render based on STORE
    // to be truly reactive. However, to support "live preview" while typing without saving,
    // we might want to read from inputs or have the Editor update the store on 'input' events.
    // Editor.js DOES update store on input, so we can just read from state.

    if (state.activeStage === null || state.activeItem === null) {
      document.getElementById("prev-title").textContent = "Item Title";
      document.getElementById("prev-desc").textContent = "Description...";
      document.getElementById("prev-content").innerHTML = "";
      return;
    }

    const item = state.data[state.activeStage].items[state.activeItem];

    document.getElementById("prev-title").textContent =
      item.title || "Item Title";
    document.getElementById("prev-desc").textContent =
      item.description || "Description...";

    let html = "";
    if (item.explanation) {
      html += `<div style="margin-bottom: 24px; font-family: var(--font-ui); color: var(--text-main); line-height: 1.6;">${item.explanation.replace(/\n/g, "<br>")}</div>`;
    }
    if (item.code) {
      html += `
            <div style="background: #1e1e1e; padding: 16px; border-radius: 8px; border: 1px solid #333; margin-bottom: 24px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #d4d4d4; white-space: pre-wrap;">
                ${item.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>`;
    }
    if (item.prompt) {
      html += `
            <div style="background: rgba(168, 85, 247, 0.1); border-left: 3px solid #a855f7; padding: 16px; border-radius: 4px; color: #e9d5ff; font-size: 13px; margin-bottom: 24px;">
                <strong style="display:flex; align-items:center; gap:6px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 9.5 6 4.65 4.65 0 0 0 7.5 11.5c.35.79.9 1.55 1.41 2.5V14h6.18z"></path></svg>
                    Challenge:
                </strong><br>
                ${item.prompt}
            </div>`;
    }

    if (item.resources && item.resources.length > 0) {
      html += `<div style="margin-top: 24px; border-top: 1px solid #333; padding-top: 16px;">
            <h4 style="font-size: 12px; color: #888; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Resources</h4>
            <ul style="list-style: none; padding: 0;">`;
      item.resources.forEach((r) => {
        html += `<li style="margin-bottom: 6px;"><a href="#" style="color: #a855f7; text-decoration: none; font-size: 13px; display:inline-flex; align-items:center; gap:4px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> 
            ${r.label}</a></li>`;
      });
      html += `</ul></div>`;
    }

    document.getElementById("prev-content").innerHTML = html;
  }

  renderSource(state) {
    const output = document.getElementById("code-output");
    if (!output) return;

    // formatting logic
    const json = JSON.stringify(state.data, null, 2);
    output.value =
      `export const appConfig = ${JSON.stringify(state.config, null, 2)};\n\n` +
      `export const contentData = ${json};`;
  }

  applySource() {
    const raw = document.getElementById("code-output").value;
    try {
      const startMarker = "export const contentData =";
      const startIdx = raw.indexOf(startMarker);
      if (startIdx === -1)
        throw new Error("Could not find 'export const contentData ='");

      const jsonStart = raw.indexOf("[", startIdx);
      const jsonEnd = raw.lastIndexOf("];"); // rough check

      if (jsonStart === -1 || jsonEnd === -1)
        throw new Error("Invalid structure");

      const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
      const parsedData = new Function("return " + jsonStr)();

      if (!Array.isArray(parsedData)) throw new Error("Not an array");

      this.store.setState({ data: parsedData, view: "visual" });
      // Notify success handled by store listener effect or we do it here?
      // We can't easily import toast here if we want to keep it pure, but let's assume global or imported toast
      // Importing toast at top of file
      import("../../shared/toast.js").then((m) =>
        m.toast.show("Changes Applied", "success"),
      );
    } catch (e) {
      import("../../shared/toast.js").then((m) =>
        m.toast.show(e.message, "error"),
      );
    }
  }
}
