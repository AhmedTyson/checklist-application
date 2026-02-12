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
    if (type === "success")
      icon.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    else if (type === "error")
      icon.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    else
      icon.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

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
