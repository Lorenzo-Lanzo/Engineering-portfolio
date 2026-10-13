// Loaded in the head so a saved preference is applied before the page paints.
(() => {
  try {
    const preference = localStorage.getItem('portfolio-theme');
    if (preference === 'light' || preference === 'dark') document.documentElement.dataset.theme = preference;
  } catch (_) { /* The operating-system theme still works if storage is blocked. */ }
})();
