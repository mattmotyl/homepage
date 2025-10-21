const catalogDataEl = document.getElementById('catalog-data');
const programDataEl = document.getElementById('program-data');

const platformSelect = document.getElementById('filter-platform');
const categorySelect = document.getElementById('filter-category');
const availabilitySelect = document.getElementById('filter-availability');
const searchInput = document.getElementById('filter-search');
const statusEl = document.getElementById('catalog-status');
const table = document.getElementById('catalog-table');
const tbody = table ? table.querySelector('tbody') : null;
const exportBtn = document.getElementById('export-csv');

let rows = [];
let filteredRows = [];

const formatDate = (input) => {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const renderTable = () => {
  if (!tbody) return;
  tbody.innerHTML = '';
  filteredRows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.platform}</td>
      <td>${row.category}</td>
      <td>${row.element}</td>
      <td>${row.availability}</td>
      <td>${row.notes}</td>
      <td>${formatDate(row.lastUpdated)}</td>
    `;
    tbody.appendChild(tr);
  });
  if (statusEl) {
    statusEl.textContent = `${filteredRows.length} record${filteredRows.length === 1 ? '' : 's'} displayed.`;
  }
  if (table) {
    table.hidden = filteredRows.length === 0;
  }
};

const applyFilters = () => {
  const platform = platformSelect ? platformSelect.value : '';
  const category = categorySelect ? categorySelect.value : '';
  const availability = availabilitySelect ? availabilitySelect.value : '';
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

  filteredRows = rows.filter((row) => {
    const matchesPlatform = !platform || row.platform === platform;
    const matchesCategory = !category || row.category === category;
    const matchesAvailability = !availability || row.availability === availability;
    const matchesSearch = !searchTerm
      || row.element.toLowerCase().includes(searchTerm)
      || row.notes.toLowerCase().includes(searchTerm)
      || row.platform.toLowerCase().includes(searchTerm);
    return matchesPlatform && matchesCategory && matchesAvailability && matchesSearch;
  });
  renderTable();
};

const populateSelect = (select, values) => {
  if (!select) return;
  select.querySelectorAll('option:not([value=""])').forEach((option) => option.remove());
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
};

const downloadCsv = () => {
  if (!filteredRows.length) return;
  const header = ['Platform', 'Category', 'Data element', 'Availability', 'Notes', 'Last updated'];
  const csv = [header.join(',')]
    .concat(
      filteredRows.map((row) =>
        [row.platform, row.category, row.element, row.availability, row.notes, row.lastUpdated]
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
  link.setAttribute('download', 'platform-data-catalog.csv');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const renderPrograms = (programs) => {
  const container = document.getElementById('access-programs');
  if (!container) return;
  container.innerHTML = '';
  programs.forEach((program) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${program.program}</h3>
      <p><strong>Sponsor:</strong> ${program.sponsor}</p>
      <p><strong>Cadence:</strong> ${program.cadence}</p>
      <p><strong>Scope:</strong> ${program.scope}</p>
      <p><strong>Notes:</strong> ${program.notes}</p>
      <p><a href="${program.url}" target="_blank" rel="noreferrer">Program website ↗</a></p>
    `;
    container.appendChild(card);
  });
};

(function init() {
  if (!catalogDataEl) return;
  try {
    rows = JSON.parse(catalogDataEl.textContent || '[]');
  } catch (error) {
    rows = [];
  }
  filteredRows = rows.slice();

  if (platformSelect) populateSelect(platformSelect, [...new Set(rows.map((row) => row.platform))].sort());
  if (categorySelect) populateSelect(categorySelect, [...new Set(rows.map((row) => row.category))].sort());
  if (availabilitySelect)
    populateSelect(availabilitySelect, [...new Set(rows.map((row) => row.availability))].sort());
  renderTable();
  if (statusEl) {
    statusEl.textContent = `${rows.length} records loaded. Use the filters to refine your view.`;
    statusEl.classList.add('alert');
  }

  if (programDataEl) {
    try {
      const programs = JSON.parse(programDataEl.textContent || '[]');
      renderPrograms(programs);
    } catch (error) {
      // no-op
    }
  }
})();

if (platformSelect) platformSelect.addEventListener('change', applyFilters);
if (categorySelect) categorySelect.addEventListener('change', applyFilters);
if (availabilitySelect) availabilitySelect.addEventListener('change', applyFilters);
if (searchInput) searchInput.addEventListener('input', applyFilters);
if (exportBtn) exportBtn.addEventListener('click', downloadCsv);
