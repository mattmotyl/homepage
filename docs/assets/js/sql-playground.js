const SQL_WASM_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm';

const textarea = document.getElementById('sql-input');
const runBtn = document.getElementById('run-query');
const resetBtn = document.getElementById('reset-db');
const resultEl = document.getElementById('sql-result');
const walkthroughEl = document.getElementById('sql-walkthrough');
const samplesEl = document.getElementById('sql-samples');

let SQL;
let db;
let bootstrapStatements = [];
let walkthroughSteps = [];
let sampleQuestions = [];

const getJsonFromScript = (id) => {
  const el = document.getElementById(id);
  if (!el) return null;
  try {
    return JSON.parse(el.textContent.trim());
  } catch (error) {
    return null;
  }
};

const renderResult = (rows) => {
  if (!resultEl) return;
  if (!rows || rows.length === 0) {
    resultEl.innerHTML = '<div class="alert">No rows returned. Try running a different query.</div>';
    return;
  }
  const columns = Object.keys(rows[0]);
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  const tbody = document.createElement('tbody');
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((column) => {
      const td = document.createElement('td');
      const value = row[column];
      td.textContent = value === null ? '—' : value;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  resultEl.innerHTML = '';
  resultEl.appendChild(table);
};

const runQuery = () => {
  if (!db || !textarea) return;
  try {
    const query = textarea.value;
    const res = db.exec(query);
    if (!res.length) {
      renderResult([]);
      return;
    }
    const rows = res[0].values.map((row) => {
      const entry = {};
      res[0].columns.forEach((col, idx) => {
        entry[col] = row[idx];
      });
      return entry;
    });
    renderResult(rows);
  } catch (error) {
    if (resultEl) {
      resultEl.innerHTML = `<div class="alert">${error}</div>`;
    }
  }
};

const resetDatabase = async () => {
  if (!SQL) return;
  if (resultEl) resultEl.innerHTML = '<div class="alert">Resetting tables…</div>';
  db = new SQL.Database();
  if (bootstrapStatements && bootstrapStatements.length) {
    db.exec('BEGIN TRANSACTION;');
    bootstrapStatements.forEach((statement) => {
      db.exec(statement);
    });
    db.exec('COMMIT;');
  }
  if (resultEl) resultEl.innerHTML = '<div class="alert">Tables reloaded. Run a query!</div>';
};

const renderWalkthrough = () => {
  if (!walkthroughEl) return;
  walkthroughEl.innerHTML = '';
  walkthroughSteps.forEach((step) => {
    const section = document.createElement('article');
    section.className = 'card';
    section.innerHTML = `
      <h4>${step.title}</h4>
      <p>${step.description}</p>
      <pre><code>${step.query}</code></pre>
      <button type="button" class="button secondary" data-query="${encodeURIComponent(step.query)}">Try this query</button>
    `;
    walkthroughEl.appendChild(section);
  });
};

const renderSamples = () => {
  if (!samplesEl) return;
  samplesEl.innerHTML = '';
  sampleQuestions.forEach((sample) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button secondary';
    button.style.marginTop = '0.5rem';
    button.textContent = sample.label;
    button.dataset.query = sample.sql;
    li.appendChild(button);
    samplesEl.appendChild(li);
  });
};

const attachHandlers = () => {
  if (walkthroughEl) {
    walkthroughEl.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLButtonElement && target.dataset.query) {
        if (textarea) textarea.value = decodeURIComponent(target.dataset.query);
        runQuery();
      }
    });
  }
  if (samplesEl) {
    samplesEl.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLButtonElement && target.dataset.query) {
        if (textarea) textarea.value = target.dataset.query;
        runQuery();
      }
    });
  }
  if (runBtn) runBtn.addEventListener('click', runQuery);
  if (resetBtn) resetBtn.addEventListener('click', resetDatabase);
};

async function init() {
  if (!window.initSqlJs) {
    if (resultEl) resultEl.innerHTML = '<div class="alert">Unable to load the SQL engine.</div>';
    return;
  }
  bootstrapStatements = getJsonFromScript('sql-bootstrap') ?? [];
  walkthroughSteps = getJsonFromScript('sql-walkthrough') ?? [];
  sampleQuestions = getJsonFromScript('sql-samples') ?? [];
  SQL = await window.initSqlJs({ locateFile: () => SQL_WASM_PATH });
  await resetDatabase();
  renderWalkthrough();
  renderSamples();
  attachHandlers();
}

init();
