export const toast = {
  init: () => {
    const container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  },

  show: (message, type = "info") => {
    let container = document.getElementById("toast-container");
    if (!container) {
      toast.init();
      container = document.getElementById("toast-container");
    }

    // Create Toast
    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.innerText = message;

    // Icon
    const icon = document.createElement("span");
    icon.className = "toast-icon";
    if (type === "success") icon.innerHTML = "✓";
    else if (type === "error") icon.innerHTML = "✕";
    else icon.innerHTML = "ℹ";

    el.prepend(icon);
    container.appendChild(el);

    // Animate In
    requestAnimationFrame(() => {
      el.classList.add("show");
    });

    // Remove after 3s
    setTimeout(() => {
      el.classList.remove("show");
      el.addEventListener("transitionend", () => {
        el.remove();
      });
    }, 3000);
  },
};
