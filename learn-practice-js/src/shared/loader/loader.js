(function () {
  // Create loader element if it doesn't exist (in case we want to inject it via JS,
  // but for faster TTI we usually put HTML in directly.
  // This script mainly handles the removal).

  window.addEventListener("load", () => {
    const loader = document.getElementById("global-loader");
    if (loader) {
      // Small delay to ensure smooth visual
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 500);
    }
  });
})();
