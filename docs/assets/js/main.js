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

  const tocConfig = [
    {
      id: 'welcome',
      label: 'Welcome',
      url: 'index.html',
      children: [
        { label: '1. Introduction', url: 'index.html#introduction' },
        { label: '1.1 Article 40 at a glance', url: 'index.html#article-40' },
        { label: '1.2 How to use this primer', url: 'index.html#using-primer' },
        { label: '1.3 Who this is for', url: 'index.html#audiences' },
      ],
    },
    {
      id: 'foundations',
      label: 'Data foundations',
      url: 'foundations.html',
      children: [
        { label: '2. What data do platforms collect?', url: 'foundations.html#data-categories' },
        { label: '2.1 Data category reference', url: 'foundations.html#category-reference' },
        { label: '2.2 Extended data families', url: 'foundations.html#additional-families' },
        { label: '2.3 Interactive catalog', url: 'foundations.html#catalog' },
        { label: '2.4 Supplemental datasets', url: 'foundations.html#supplemental' },
        { label: '2.5 Staying current on data access', url: 'foundations.html#staying-current' },
        { label: '2.6 Trusted access programs', url: 'foundations.html#programs' },
      ],
    },
    {
      id: 'api',
      label: 'Setting up Article 40 APIs',
      url: 'api.html',
      children: [
        { label: '3. Preparing your workspace', url: 'api.html#api-overview' },
        { label: '3.1 Authenticating safely', url: 'api.html#api-authentication' },
        { label: '3.2 Managing keys and secrets', url: 'api.html#api-secrets' },
        { label: '3.3 Handling rate limits and quotas', url: 'api.html#api-limits' },
        { label: '3.4 Logging and documenting requests', url: 'api.html#api-logging' },
      ],
    },
    {
      id: 'warehouses',
      label: 'Understanding platform data models',
      url: 'warehouses.html',
      children: [
        { label: '4. What do platforms generate?', url: 'warehouses.html#generated-data' },
        { label: '4.1 Fact tables', url: 'warehouses.html#fact-tables' },
        { label: '4.2 Dimension tables', url: 'warehouses.html#dimension-tables' },
        { label: '4.3 Joining data across tables', url: 'warehouses.html#joining-data' },
        { label: '4.4 Probabilistic variables', url: 'warehouses.html#probabilistic' },
      ],
    },
    {
      id: 'workflows',
      label: 'Workflows and practice',
      url: 'workflows.html',
      children: [
        { label: '5. Starting your workflow', url: 'workflows.html#workflow-orientation' },
        { label: '5.1 Sample tables', url: 'workflows.html#sample-tables' },
        { label: '5.2 Guided SQL walkthrough', url: 'workflows.html#sql-walkthrough' },
        { label: '5.3 Practice sandbox', url: 'workflows.html#sql-sandbox' },
      ],
    },
    {
      id: 'harms',
      label: 'Mapping signals to delegated harms',
      url: 'harms.html',
      children: [
        { label: '6. Understanding delegated risks', url: 'harms.html#harms-overview' },
        { label: '6.1 Linking variables to harms', url: 'harms.html#harms-mapping' },
        { label: '6.2 Building harm-specific queries', url: 'harms.html#harms-sql' },
      ],
    },
    {
      id: 'datasets',
      label: 'Researcher-maintained datasets',
      url: 'datasets.html',
      children: [
        { label: '7. Landscape of public datasets', url: 'datasets.html#datasets-overview' },
        { label: '7.1 Explore the dataset catalog', url: 'datasets.html#datasets-table' },
        { label: '7.2 Tips for responsible reuse', url: 'datasets.html#datasets-practice' },
      ],
    },
    {
      id: 'comparisons',
      label: 'Comparing API and internal data',
      url: 'comparisons.html',
      children: [
        { label: '8. Why comparisons matter', url: 'comparisons.html#comparisons-overview' },
        { label: '8.1 Research by harm type', url: 'comparisons.html#example-1' },
        { label: '8.2 Structural indicator coverage', url: 'comparisons.html#example-2' },
        { label: '8.3 Mastodon as a reference point', url: 'comparisons.html#example-3' },
      ],
    },
    {
      id: 'engage',
      label: 'Engage and next steps',
      url: 'engage.html',
      children: [
        { label: '9. Connect with Matt', url: 'engage.html#contact' },
        { label: '9.1 Further reading', url: 'engage.html#further-reading' },
      ],
    },
  ];

  const buildSidebar = () => {
    document.querySelectorAll('.sidebar-nav').forEach((nav) => {
      const current = nav.dataset.currentPage;
      const list = document.createElement('ol');
      tocConfig.forEach((entry) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.url;
        link.textContent = entry.label;
        if (current === entry.id) {
          link.setAttribute('aria-current', 'page');
        }
        item.appendChild(link);
        if (entry.children && entry.children.length) {
          const childList = document.createElement('ol');
          entry.children.forEach((child) => {
            const childItem = document.createElement('li');
            const childLink = document.createElement('a');
            childLink.href = child.url;
            childLink.textContent = child.label;
            if (current === entry.id && child.url.includes('#')) {
              const hash = child.url.substring(child.url.indexOf('#'));
              if (window.location.hash === hash) {
                childLink.setAttribute('aria-current', 'location');
              }
            }
            childItem.appendChild(childLink);
            childList.appendChild(childItem);
          });
          item.appendChild(childList);
        }
        list.appendChild(item);
      });
      nav.innerHTML = '';
      nav.appendChild(list);
    });
  };

  buildSidebar();

  const keywordPattern = /\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|LEFT|RIGHT|INNER|OUTER|JOIN|ON|AS|WITH|LIMIT|AND|OR|NOT|DISTINCT|HAVING)\b/gi;
  const functionPattern = /\b(COUNT|AVG|SUM|MIN|MAX|CAST|DATE|strftime|TOTAL|ABS)\b/gi;
  const tablePattern = /\b(dim_[a-z0-9_]+|fact_[a-z0-9_]+|lookup_[a-z0-9_]+|bridge_[a-z0-9_]+)\b/gi;
  const identifierPattern = /\b([a-z][a-z0-9_]*_[a-z0-9_]+)\b/g;

  const highlightSql = (codeEl) => {
    if (!codeEl) return;
    const raw = codeEl.textContent;
    if (!raw) {
      codeEl.innerHTML = '';
      return;
    }
    let html = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(functionPattern, '<span class="sql-token function">$&</span>');
    html = html.replace(keywordPattern, '<span class="sql-token keyword">$&</span>');
    html = html.replace(tablePattern, '<span class="sql-token table">$&</span>');
    html = html.replace(identifierPattern, (match) => {
      if (/^sql-token/.test(match)) return match;
      if (/^dim_|^fact_|^lookup_|^bridge_/i.test(match)) return match;
      if (/^(SELECT|FROM|WHERE|GROUP|ORDER|LEFT|RIGHT|INNER|OUTER|JOIN|ON|AS|WITH|LIMIT|AND|OR|NOT|DISTINCT|HAVING)$/i.test(match))
        return match;
      return `<span class="sql-token identifier">${match}</span>`;
    });
    codeEl.innerHTML = html;
  };

  window.applySqlHighlight = () => {
    const blocks = document.querySelectorAll('code.language-sql');
    blocks.forEach((block) => highlightSql(block));
  };

  window.applySqlHighlight();
})();
