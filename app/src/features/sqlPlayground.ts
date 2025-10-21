import initSqlJs from 'sql.js'
import type { Database, SqlJsStatic } from 'sql.js'

const SQL_WASM_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm'

export interface WalkthroughStep {
  title: string
  description: string
  query: string
}

export interface SampleQuery {
  label: string
  sql: string
}

export interface PreviewTable {
  name: string
  description: string
  columns: string[]
  rows?: Record<string, string | number | null>[]
}

export interface SqlPlaygroundConfig {
  bootstrap: string[]
  walkthrough: WalkthroughStep[]
  samples: SampleQuery[]
  preview: PreviewTable[]
  selectors?: {
    textarea?: string
    runButton?: string
    resetButton?: string
    result?: string
    walkthrough?: string
    samples?: string
    preview?: string
  }
}

const defaultSelectors = {
  textarea: '#sql-input',
  runButton: '#run-query',
  resetButton: '#reset-db',
  result: '#sql-result',
  walkthrough: '#sql-walkthrough',
  samples: '#sql-samples',
  preview: '#sql-table-preview',
}

const renderResult = (container: HTMLElement | null, rows: Record<string, unknown>[]) => {
  if (!container) return
  if (!rows.length) {
    container.innerHTML = '<div class="alert">No rows returned. Try running a different query.</div>'
    return
  }
  const columns = Object.keys(rows[0])
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const headerRow = document.createElement('tr')
  columns.forEach((column) => {
    const th = document.createElement('th')
    th.textContent = column
    headerRow.appendChild(th)
  })
  thead.appendChild(headerRow)
  const tbody = document.createElement('tbody')
  rows.forEach((row) => {
    const tr = document.createElement('tr')
    columns.forEach((column) => {
      const td = document.createElement('td')
      const value = row[column]
      td.textContent = value === null || value === undefined ? '—' : String(value)
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })
  table.appendChild(thead)
  table.appendChild(tbody)
  container.innerHTML = ''
  container.appendChild(table)
}

const renderWalkthrough = (
  container: HTMLElement | null,
  steps: WalkthroughStep[],
  onRun: (query: string) => void,
) => {
  if (!container) return
  container.innerHTML = ''
  steps.forEach((step) => {
    const article = document.createElement('article')
    article.className = 'card'
    article.innerHTML = `
      <h4>${step.title}</h4>
      <p>${step.description}</p>
      <pre><code class="language-sql">${step.query}</code></pre>
      <button type="button" class="button secondary">Try this query</button>
    `
    const button = article.querySelector('button')
    button?.addEventListener('click', () => onRun(step.query))
    container.appendChild(article)
  })
}

const renderSamples = (
  container: HTMLElement | null,
  samples: SampleQuery[],
  onRun: (query: string) => void,
) => {
  if (!container) return
  container.innerHTML = ''
  samples.forEach((sample) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'button secondary'
    button.style.marginTop = '0.5rem'
    button.textContent = sample.label
    button.addEventListener('click', () => onRun(sample.sql))
    li.appendChild(button)
    container.appendChild(li)
  })
}

const renderPreviewTables = (container: HTMLElement | null, tables: PreviewTable[]) => {
  if (!container) return
  container.innerHTML = ''
  tables.forEach((tableInfo) => {
    const article = document.createElement('article')
    article.className = 'card'
    const columns = tableInfo.columns
    const sampleRows = tableInfo.rows || []
    const tableMarkup = sampleRows.length
      ? `<div class="table-wrapper"><table><thead><tr>${columns
          .map((col) => `<th>${col}</th>`)
          .join('')}</tr></thead><tbody>${sampleRows
          .map((row) => `<tr>${columns.map((col) => `<td>${row[col] ?? '—'}</td>`).join('')}</tr>`)
          .join('')}</tbody></table></div>`
      : ''
    article.innerHTML = `
      <h4>${tableInfo.name}</h4>
      <p>${tableInfo.description}</p>
      <p><strong>Key fields:</strong> ${columns.map((col) => `<code>${col}</code>`).join(', ')}</p>
      ${tableMarkup}
    `
    container.appendChild(article)
  })
}

export const initSqlPlayground = async (root: HTMLElement, config: SqlPlaygroundConfig) => {
  const selectors = { ...defaultSelectors, ...config.selectors }
  const textarea = root.querySelector<HTMLTextAreaElement>(selectors.textarea)
  const runBtn = root.querySelector<HTMLButtonElement>(selectors.runButton)
  const resetBtn = root.querySelector<HTMLButtonElement>(selectors.resetButton)
  const resultEl = root.querySelector<HTMLElement>(selectors.result)
  const walkthroughEl = root.querySelector<HTMLElement>(selectors.walkthrough)
  const samplesEl = root.querySelector<HTMLElement>(selectors.samples)
  const previewEl = root.querySelector<HTMLElement>(selectors.preview)

  let SQL: SqlJsStatic | null = null
  let db: Database | null = null

  const applyQuery = (query: string) => {
    if (textarea) {
      textarea.value = query
      textarea.dispatchEvent(new Event('input', { bubbles: true }))
    }
    runQuery()
  }

  const resetDatabase = () => {
    if (!SQL) return
    db = new SQL.Database()
    if (config.bootstrap.length) {
      db.exec('BEGIN TRANSACTION;')
      config.bootstrap.forEach((statement) => {
        if (statement.trim()) {
          db?.exec(statement)
        }
      })
      db.exec('COMMIT;')
    }
    if (resultEl) {
      resultEl.innerHTML = '<div class="alert">Tables reloaded. Run a query!</div>'
    }
  }

  const runQuery = () => {
    if (!db || !textarea) return
    try {
      const res = db.exec(textarea.value)
      if (!res.length) {
        renderResult(resultEl, [])
        return
      }
      const [first] = res
      const rows = first.values.map((row: Array<string | number | null>) => {
        const entry: Record<string, unknown> = {}
        first.columns.forEach((col: string, idx: number) => {
          entry[col] = row[idx]
        })
        return entry
      })
      renderResult(resultEl, rows)
    } catch (error) {
      if (resultEl) {
        resultEl.innerHTML = `<div class="alert">${error}</div>`
      }
    }
  }

  renderWalkthrough(walkthroughEl, config.walkthrough, applyQuery)
  renderSamples(samplesEl, config.samples, applyQuery)
  renderPreviewTables(previewEl, config.preview)

  SQL = await initSqlJs({ locateFile: () => SQL_WASM_PATH })
  resetDatabase()

  runBtn?.addEventListener('click', runQuery)
  resetBtn?.addEventListener('click', resetDatabase)

  return () => {
    runBtn?.removeEventListener('click', runQuery)
    resetBtn?.removeEventListener('click', resetDatabase)
    db?.close()
  }
}
