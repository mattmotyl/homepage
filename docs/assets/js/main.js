(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  if (sidebar && toggle) {
    const setCollapsed = (collapsed) => {
      sidebar.setAttribute('data-collapsed', String(collapsed));
      toggle.setAttribute('aria-expanded', String(!collapsed));
    };

    setCollapsed(window.innerWidth < 1080);

    toggle.addEventListener('click', () => {
      const current = sidebar.getAttribute('data-collapsed') === 'true';
      setCollapsed(!current);
      toggle.setAttribute('data-user-toggled', 'true');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1080) {
        setCollapsed(false);
        toggle.removeAttribute('data-user-toggled');
      } else if (!toggle.hasAttribute('data-user-toggled')) {
        setCollapsed(true);
      }
    });
  }
})();
