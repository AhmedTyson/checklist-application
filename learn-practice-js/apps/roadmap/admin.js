const admin = {
  data: [],

  // UI Refs
  inputs: {
    title: document.getElementById("inp-title"),
    desc: document.getElementById("inp-desc"),
    expl: document.getElementById("inp-expl"),
    code: document.getElementById("inp-code"),
    prompt: document.getElementById("inp-prompt"),
    stageSelect: document.getElementById("stage-select"),
    stageTitle: document.getElementById("stage-title-input"),
  },

  preview: {
    title: document.getElementById("prev-title"),
    expl: document.getElementById("prev-expl"),
    code: document.getElementById("prev-code"),
    prompt: document.getElementById("prev-prompt"),
  },

  init: () => {
    // Load data safely
    if (typeof contentData !== "undefined") {
      admin.data = JSON.parse(JSON.stringify(contentData));
    }

    admin.renderStageSelect();
    admin.bindEvents();
    admin.updateCodeView(); // Initial render
  },

  bindEvents: () => {
    // Live Preview Listeners
    const { inputs, preview } = admin;

    inputs.title.addEventListener("input", (e) => {
      preview.title.innerText = e.target.value || "New Item";
    });

    inputs.expl.addEventListener("input", (e) => {
      preview.expl.innerText = e.target.value || "Start typing...";
    });

    inputs.code.addEventListener("input", (e) => {
      preview.code.innerText = e.target.value || "// Code will appear here";
    });

    inputs.prompt.addEventListener("input", (e) => {
      preview.prompt.innerText =
        e.target.value || "Challenge will appear here...";
    });

    // Stage Selection
    inputs.stageSelect.addEventListener("change", (e) => {
      const isNew = e.target.value === "new";
      document.getElementById("new-stage-inputs").style.display = isNew
        ? "block"
        : "none";
    });
  },

  renderStageSelect: () => {
    const sel = admin.inputs.stageSelect;
    sel.innerHTML = '<option value="new">+ Create New Stage</option>';
    admin.data.forEach((s, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.innerText = s.title;
      sel.appendChild(opt);
    });
  },

  commitItem: () => {
    const { inputs } = admin;
    const newItem = {
      title: inputs.title.value,
      desc: inputs.desc.value,
      explanation: inputs.expl.value,
      code: inputs.code.value,
      prompt: inputs.prompt.value,
    };

    if (!newItem.title) return alert("Title is required!");

    const stageVal = inputs.stageSelect.value;
    if (stageVal === "new") {
      const sTitle = inputs.stageTitle.value;
      if (!sTitle) return alert("Stage Name is required!");

      admin.data.push({
        title: sTitle,
        description: "New Stage",
        items: [newItem],
      });
    } else {
      const idx = parseInt(stageVal);
      admin.data[idx].items.push(newItem);
    }

    // Reset Inputs
    Object.values(inputs).forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.value = "";
    });

    // Reset Preview
    admin.preview.title.innerText = "Item Added!";
    admin.preview.expl.innerText = "Start typing to create another...";
    admin.preview.code.innerText = "// ...";
    admin.preview.prompt.innerText = "...";

    admin.renderStageSelect();
    // Select last stage if new
    if (stageVal === "new") {
      admin.inputs.stageSelect.value = admin.data.length - 1;
      document.getElementById("new-stage-inputs").style.display = "none";
    } else {
      admin.inputs.stageSelect.value = stageVal;
    }

    admin.updateCodeView();
    alert("Item Added! Switch to 'Source Code' tab to copy.");
  },

  setView: (mode) => {
    // Toggle Buttons
    const btns = document.querySelectorAll(".toggle-btn");
    btns.forEach((b) => b.classList.remove("active"));
    const activeBtn = Array.from(btns).find((b) =>
      b.innerText
        .toLowerCase()
        .includes(mode === "visual" ? "visual" : "source"),
    );
    if (activeBtn) activeBtn.classList.add("active");

    // Toggle Views
    const visual = document.getElementById("view-visual");
    const code = document.getElementById("view-code");

    if (mode === "visual") {
      visual.style.display = "flex";
      code.classList.remove("visible");
    } else {
      visual.style.display = "none";
      code.classList.add("visible");
      admin.updateCodeView();
    }
  },

  updateCodeView: () => {
    const json = JSON.stringify(admin.data, null, 4);
    document.getElementById("code-output").textContent =
      `const contentData = ${json};`;
  },

  copyJson: () => {
    admin.updateCodeView();
    const txt = document.getElementById("code-output").textContent;
    navigator.clipboard
      .writeText(txt)
      .then(() => alert("Copied all content to clipboard!"));
  },
};

admin.init();
