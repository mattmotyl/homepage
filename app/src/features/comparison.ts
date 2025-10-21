import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export interface ComparisonRow {
  indicator: string
  dimension: string
  values: Record<string, number>
}

const palette = ['#1e2a5a', '#f97316', '#2dd4bf', '#6366f1', '#0ea5e9']
const statusLabels: Record<number, string> = {
  0: 'Not available',
  1: 'Partial coverage',
  2: 'Available with safeguards',
}

type ViewMode = 'table' | 'radar' | 'bar'

const formatValue = (value: number | string) => {
  if (typeof value === 'number') {
    const label = statusLabels[value]
    return label ? `${label} (${value})` : String(value)
  }
  return value
}

export const initComparison = (root: HTMLElement, rows: ComparisonRow[]) => {
  const table = root.querySelector<HTMLTableElement>('#comparison-table')
  const tbody = table?.querySelector('tbody')
  const canvas = root.querySelector<HTMLCanvasElement>('#comparison-chart')
  const viewButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('.comparison-controls button'))

  let chart: Chart | undefined

  const buildTable = () => {
    if (!tbody) return
    tbody.innerHTML = ''
    rows.forEach((row) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${row.indicator}</td>
        <td>${row.dimension}</td>
        ${Object.keys(row.values)
          .map((key) => `<td>${formatValue(row.values[key])}</td>`)
          .join('')}
      `
      tbody.appendChild(tr)
    })
  }

  const buildChart = (view: Exclude<ViewMode, 'table'>) => {
    if (!canvas || !rows.length) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (chart) chart.destroy()

    const labels = Object.keys(rows[0].values)
    const datasetConfig =
      view === 'radar'
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
          }))

    const data = {
      labels: view === 'radar' ? labels : rows.map((row) => row.indicator),
      datasets: datasetConfig,
    }

    const legendPosition: 'bottom' | 'top' = view === 'radar' ? 'bottom' : 'top'

    const options = {
      responsive: true,
      scales:
        view === 'radar'
          ? {}
          : {
              x: { stacked: view === 'bar' },
              y: { stacked: view === 'bar', beginAtZero: true, ticks: { stepSize: 1 } },
            },
      plugins: {
        legend: { position: legendPosition },
        tooltip: { mode: 'index' as const, intersect: false },
      },
    }

    const chartType = view === 'radar' ? 'radar' : 'bar'
    chart = new Chart(ctx, {
      type: chartType,
      data,
      options,
    })
  }

  const setView = (view: ViewMode) => {
    viewButtons.forEach((button) => {
      if (button.dataset.view === view) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })

    if (view === 'table') {
      if (table) table.hidden = false
      if (canvas) canvas.hidden = true
    } else {
      if (table) table.hidden = true
      if (canvas) canvas.hidden = false
      buildChart(view)
    }
  }

  if (!rows.length) {
    if (tbody) {
      const tr = document.createElement('tr')
      tr.innerHTML = '<td colspan="7">No comparison data available.</td>'
      tbody.appendChild(tr)
    }
    return () => {}
  }

  buildTable()
  setView('table')

  const handleClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement
    const view = target.dataset.view as ViewMode | undefined
    if (view) setView(view)
  }

  viewButtons.forEach((button) => {
    button.addEventListener('click', handleClick)
  })

  return () => {
    viewButtons.forEach((button) => button.removeEventListener('click', handleClick))
    if (chart) chart.destroy()
  }
}
