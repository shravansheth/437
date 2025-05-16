document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-toggle");
    if (!toggle) return;
  
    toggle.onchange = function (event) {
      event.stopPropagation();
      const dark = event.target.checked;
  
      const customToggleEvent = new CustomEvent("darkmode:toggle", {
        bubbles: true,
        detail: { dark }
      });
  
      toggle.dispatchEvent(customToggleEvent);
    };
  
    document.body.addEventListener("darkmode:toggle", (event) => {
      if (event.detail.dark) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
  });