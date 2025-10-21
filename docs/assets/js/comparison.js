const DATA_URL = 'assets/data/comparison-indicators.json';

const table = document.getElementById('comparison-table');
const tbody = table?.querySelector('tbody');
const canvas = document.getElementById('comparison-chart');
const viewButtons = document.querySelectorAll('.comparison-controls button');
let chart;
let rows = [];
const palette = ['#1e2a5a', '#f97316', '#2dd4bf', '#6366f1', '#0ea5e9'];

const buildTable = () => {
  if (!tbody) return;
  tbody.innerHTML = '';
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${row.indicator}</td>
      <td>${row.dimension}</td>
      <td>${row.values.TikTok}</td>
      <td>${row.values.Facebook}</td>
      <td>${row.values.YouTube}</td>
      <td>${row.values.Mastodon}</td>
      <td>${row.values['Google Search']}</td>
    `;
    tbody.appendChild(tr);
  });
};

const buildChart = (type) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (chart) chart.destroy();
  const labels = Object.keys(rows[0].values);
  const dataSets = type === 'radar'
    ? rows.map((row, index) => ({
        label: row.indicator,
        data: labels.map((label) => row.values[label]),
        fill: true,
        borderColor: palette[index % palette.length],
        backgroundColor: `${palette[index % palette.length]}33`,
      }))
    : labels.map((label, index) => ({
        label,
        data: rows.map((row) => row.values[label]),
        borderWidth: 1,
        backgroundColor: `${palette[index % palette.length]}bb`,
        borderColor: palette[index % palette.length],
      }));

  const data = {
    labels: type === 'radar' ? labels : rows.map((row) => row.indicator),
    datasets: dataSets,
  };

  const options = {
    responsive: true,
    scales: type === 'radar'
      ? {}
      : {
          x: { stacked: type === 'bar' },
          y: { stacked: type === 'bar', beginAtZero: true, ticks: { stepSize: 1 } },
        },
    plugins: {
      legend: { position: type === 'radar' ? 'bottom' : 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
  };

  const chartType = type === 'bar' ? 'bar' : type === 'radar' ? 'radar' : 'bar';
  chart = new Chart(ctx, {
    type: chartType,
    data,
    options,
  });
};

const setView = (view) => {
  viewButtons.forEach((button) => {
    if (button.dataset.view === view) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  if (view === 'table') {
    if (table) table.hidden = false;
    if (canvas) canvas.hidden = true;
  } else {
    if (table) table.hidden = true;
    if (canvas) canvas.hidden = false;
    buildChart(view);
  }
};

async function init() {
  try {
    const res = await fetch(DATA_URL);
    rows = await res.json();
    buildTable();
    setView('table');
  } catch (error) {
    if (tbody) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="7">Unable to load comparison data.</td>';
      tbody.appendChild(tr);
    }
  }
}

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    if (view) setView(view);
  });
});

init();
