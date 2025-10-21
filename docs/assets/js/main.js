document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const tocContainer = document.querySelector('[data-toc]');
  if (!tocContainer) return;

  const list = tocContainer.querySelector('ul');
  const toggle = tocContainer.querySelector('.toc-toggle');
  const headings = Array.from(document.querySelectorAll('main h2, main h3')).filter((heading) => {
    if (!heading.id) {
      const slug = heading.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      heading.id = slug;
    }
    return true;
  });

  if (list && headings.length) {
    headings.forEach((heading) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      link.dataset.tocTarget = heading.id;
      if (heading.tagName.toLowerCase() === 'h3') {
        link.style.paddingLeft = '1.5rem';
        link.style.fontSize = '0.95rem';
      }
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  if (toggle) {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncState = () => {
      if (mediaQuery.matches) {
        tocContainer.classList.add('collapsed');
      } else {
        tocContainer.classList.remove('collapsed');
      }
      toggle.setAttribute('aria-expanded', tocContainer.classList.contains('collapsed') ? 'false' : 'true');
    };
    syncState();
    mediaQuery.addEventListener('change', syncState);
    toggle.addEventListener('click', () => {
      tocContainer.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', tocContainer.classList.contains('collapsed') ? 'false' : 'true');
    });
  }

  const tocLinks = Array.from(tocContainer.querySelectorAll('a[data-toc-target]'));
  if (!tocLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((link) => {
            if (link.dataset.tocTarget === entry.target.id) {
              link.classList.add('current-section');
            } else {
              link.classList.remove('current-section');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 1.0],
    }
  );

  headings.forEach((heading) => observer.observe(heading));
});
