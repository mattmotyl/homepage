const dataScript = document.getElementById('supplemental-data');
const table = document.getElementById('supplemental-table');
const tbody = table?.querySelector('tbody');
const groupSelect = document.getElementById('supplemental-group');
const availabilitySelect = document.getElementById('supplemental-availability');
const searchInput = document.getElementById('supplemental-search');

let rows = [];
let filteredRows = [];
let sortKey = 'group';
let sortDirection = 'asc';

const uniqueValues = (items, key) => Array.from(new Set(items.map((item) => item[key]).filter(Boolean))).sort();

const renderTable = () => {
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!filteredRows.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="6">No matching rows. Adjust your filters to see more data.</td>';
    tbody.appendChild(tr);
    return;
  }
  filteredRows.forEach((row) => {
    const tr = document.createElement('tr');
    const linkCell = row.link
      ? `<a href="${row.link}" target="_blank" rel="noreferrer">Source ↗</a>`
      : '';
    tr.innerHTML = `
      <td>${row.group}</td>
      <td>${row.subcategory}</td>
      <td>${row.element}</td>
      <td>${row.description}</td>
      <td>${row.availability}</td>
      <td>${linkCell}</td>
    `;
    tbody.appendChild(tr);
  });
};

const applyFilters = () => {
  const group = groupSelect?.value ?? '';
  const availability = availabilitySelect?.value ?? '';
  const searchTerm = (searchInput?.value ?? '').toLowerCase();

  filteredRows = rows.filter((row) => {
    const matchesGroup = !group || row.group === group;
    const matchesAvailability = !availability || row.availability === availability;
    const matchesSearch = !searchTerm
      || row.element.toLowerCase().includes(searchTerm)
      || row.description.toLowerCase().includes(searchTerm)
      || row.subcategory.toLowerCase().includes(searchTerm);
    return matchesGroup && matchesAvailability && matchesSearch;
  });

  sortRows(sortKey, false);
};

const sortRows = (key, toggleDirection = true) => {
  if (toggleDirection) {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }
  } else {
    sortKey = key;
  }

  const directionMultiplier = sortDirection === 'asc' ? 1 : -1;
  filteredRows.sort((a, b) => {
    const valueA = (a[key] ?? '').toString().toLowerCase();
    const valueB = (b[key] ?? '').toString().toLowerCase();
    if (valueA < valueB) return -1 * directionMultiplier;
    if (valueA > valueB) return 1 * directionMultiplier;
    return 0;
  });
  renderTable();
};

const init = () => {
  if (!dataScript || !tbody) return;
  try {
    rows = JSON.parse(dataScript.textContent.trim());
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="6">Unable to load supplemental dataset.</td></tr>';
    return;
  }
  filteredRows = rows.slice();

  if (groupSelect) {
    uniqueValues(rows, 'group').forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      groupSelect.appendChild(option);
    });
  }

  if (availabilitySelect) {
    uniqueValues(rows, 'availability').forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      availabilitySelect.appendChild(option);
    });
  }

  if (groupSelect) groupSelect.addEventListener('change', applyFilters);
  if (availabilitySelect) availabilitySelect.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  table.querySelectorAll('th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort');
      if (key) {
        sortRows(key);
      }
    });
  });

  applyFilters();
};

init();
