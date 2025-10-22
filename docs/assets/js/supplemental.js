const supplementalDataEl = document.getElementById('supplemental-data');
const tabsContainer = document.getElementById('supplemental-tabs');
const tableEl = document.getElementById('supplemental-table');
const tbody = tableEl ? tableEl.querySelector('tbody') : null;
const searchInput = document.getElementById('supplemental-search-input');
const exportBtn = document.getElementById('supplemental-export');

let datasets = {};
let activeKey = '';
let visibleRows = [];

const renderTabs = () => {
  if (!tabsContainer) return;
  tabsContainer.innerHTML = '';
  Object.keys(datasets).forEach((key, index) => {
    const button = document.createElement('button');
    button.className = `button secondary${key === activeKey ? ' active' : ''}`;
    button.type = 'button';
    button.textContent = `${key} data`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', key === activeKey ? 'true' : 'false');
    button.dataset.key = key;
    tabsContainer.appendChild(button);
    if (index === 0 && !activeKey) {
      activeKey = key;
    }
  });
};

const renderRows = () => {
  if (!tbody || !activeKey) return;
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const rows = datasets[activeKey] || [];
  visibleRows = rows.filter((row) => {
    if (!searchTerm) return true;
    return (
      row.field.toLowerCase().includes(searchTerm)
      || row.description.toLowerCase().includes(searchTerm)
      || row.table.toLowerCase().includes(searchTerm)
      || row.access.toLowerCase().includes(searchTerm)
      || row.source.toLowerCase().includes(searchTerm)
    );
  });
  tbody.innerHTML = '';
  visibleRows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code>${row.field}</code></td>
      <td>${row.description}</td>
      <td>${row.table}</td>
      <td>${row.access}</td>
      <td>${row.source}</td>
    `;
    tbody.appendChild(tr);
  });
};

const setActiveKey = (key) => {
  activeKey = key;
  renderTabs();
  renderRows();
};

const downloadRows = () => {
  if (!visibleRows.length) return;
  const header = ['Field', 'Description', 'Primary table', 'Access considerations', 'Source'];
  const csv = [header.join(',')]
    .concat(
      visibleRows.map((row) =>
        [row.field, row.description, row.table, row.access, row.source]
          .map((value) => {
            const normalized = String(value ?? '').replace(/"/g, '""');
            return `"${normalized}"`;
          })
          .join(',')
      )
    )
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${activeKey.toLowerCase()}-supplemental-data.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

(function init() {
  if (!supplementalDataEl) return;
  try {
    datasets = JSON.parse(supplementalDataEl.textContent || '{}');
  } catch (error) {
    datasets = {};
  }
  const keys = Object.keys(datasets);
  if (!keys.length) return;
  activeKey = keys[0];
  renderTabs();
  renderRows();
})();

tabsContainer?.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLButtonElement && target.dataset.key) {
    setActiveKey(target.dataset.key);
  }
});

searchInput?.addEventListener('input', () => {
  renderRows();
});

exportBtn?.addEventListener('click', downloadRows);
