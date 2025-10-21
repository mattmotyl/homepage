interface SupplementalRow {
  field: string
  description: string
  table: string
  access: string
  source: string
}

export type SupplementalData = Record<string, SupplementalRow[]>

export const initSupplemental = (root: HTMLElement, datasets: SupplementalData) => {
  const tabsContainer = root.querySelector<HTMLElement>('#supplemental-tabs')
  const table = root.querySelector<HTMLTableElement>('#supplemental-table')
  const tbody = table?.querySelector('tbody')
  const searchInput = root.querySelector<HTMLInputElement>('#supplemental-search-input')
  const exportBtn = root.querySelector<HTMLButtonElement>('#supplemental-export')

  const keys = Object.keys(datasets)
  let activeKey = keys[0] || ''
  let visibleRows: SupplementalRow[] = []

  const renderTabs = () => {
    if (!tabsContainer) return
    tabsContainer.innerHTML = ''
    keys.forEach((key) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = `button secondary${key === activeKey ? ' active' : ''}`
      button.dataset.key = key
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-selected', key === activeKey ? 'true' : 'false')
      button.textContent = `${key} data`
      tabsContainer.appendChild(button)
    })
  }

  const renderRows = () => {
    if (!tbody) return
    const searchTerm = (searchInput?.value || '').toLowerCase()
    const rows = datasets[activeKey] || []
    visibleRows = !searchTerm
      ? rows
      : rows.filter((row) =>
          [row.field, row.description, row.table, row.access, row.source]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm),
        )
    tbody.innerHTML = ''
    visibleRows.forEach((row) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td><code>${row.field}</code></td>
        <td>${row.description}</td>
        <td>${row.table}</td>
        <td>${row.access}</td>
        <td>${row.source}</td>
      `
      tbody.appendChild(tr)
    })
  }

  const setActive = (key: string) => {
    activeKey = key
    renderTabs()
    renderRows()
  }

  const downloadRows = () => {
    if (!visibleRows.length) return
    const header = ['Field', 'Description', 'Primary table', 'Access considerations', 'Source']
    const csv = [header.join(',')]
      .concat(
        visibleRows.map((row) =>
          [row.field, row.description, row.table, row.access, row.source]
            .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
            .join(','),
        ),
      )
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${activeKey.toLowerCase()}-supplemental-data.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleTabClick = (event: Event) => {
    const target = event.target as HTMLElement
    if (target instanceof HTMLButtonElement && target.dataset.key) {
      setActive(target.dataset.key)
    }
  }

  renderTabs()
  renderRows()

  tabsContainer?.addEventListener('click', handleTabClick)
  searchInput?.addEventListener('input', renderRows)
  exportBtn?.addEventListener('click', downloadRows)

  return () => {
    tabsContainer?.removeEventListener('click', handleTabClick)
    searchInput?.removeEventListener('input', renderRows)
    exportBtn?.removeEventListener('click', downloadRows)
  }
}
