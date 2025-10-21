export interface DatasetRow {
  name: string
  host: string
  platform: string
  cadence: string
  link: string
}

export const initDatasets = (root: HTMLElement, rows: DatasetRow[]) => {
  const table = root.querySelector<HTMLTableElement>('#datasets-table-grid')
  const tbody = table?.querySelector('tbody')
  const searchInput = root.querySelector<HTMLInputElement>('#datasets-search')
  const statusEl = root.querySelector<HTMLElement>('#datasets-status')
  const exportBtn = root.querySelector<HTMLButtonElement>('#datasets-export')

  let filtered = [...rows]

  const render = () => {
    if (!tbody) return
    tbody.innerHTML = ''
    filtered.forEach((row) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.host}</td>
        <td>${row.platform}</td>
        <td>${row.cadence}</td>
        <td><a href="${row.link}" target="_blank" rel="noreferrer">Open ↗</a></td>
      `
      tbody.appendChild(tr)
    })
    if (statusEl) {
      if (!filtered.length) {
        statusEl.textContent = 'No datasets matched your filters.'
        statusEl.classList.add('alert')
      } else {
        statusEl.textContent = `${filtered.length} dataset${filtered.length === 1 ? '' : 's'} available.`
        statusEl.classList.add('alert')
      }
    }
  }

  const applyFilters = () => {
    const term = (searchInput?.value || '').trim().toLowerCase()
    filtered = !term
      ? rows
      : rows.filter((row) =>
          [row.name, row.host, row.platform, row.cadence]
            .join(' ')
            .toLowerCase()
            .includes(term),
        )
    render()
  }

  const exportCsv = () => {
    if (!filtered.length) return
    const header = ['Dataset', 'Host organization', 'Platform coverage', 'Update cadence', 'Access']
    const csv = [header.join(',')]
      .concat(
        filtered.map((row) =>
          [row.name, row.host, row.platform, row.cadence, row.link]
            .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
            .join(','),
        ),
      )
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'researcher-datasets.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  render()
  searchInput?.addEventListener('input', applyFilters)
  exportBtn?.addEventListener('click', exportCsv)

  return () => {
    searchInput?.removeEventListener('input', applyFilters)
    exportBtn?.removeEventListener('click', exportCsv)
  }
}
