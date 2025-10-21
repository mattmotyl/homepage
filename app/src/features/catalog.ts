export interface CatalogRow {
  platform: string
  category: string
  element: string
  availability: string
  notes: string
  lastUpdated?: string
}

export interface AccessProgram {
  program: string
  sponsor: string
  cadence: string
  scope: string
  notes: string
  url: string
}

const formatDate = (input: string | undefined) => {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export const initCatalog = (
  root: HTMLElement,
  rows: CatalogRow[],
  programs: AccessProgram[],
) => {
  const platformSelect = root.querySelector<HTMLSelectElement>('#filter-platform')
  const categorySelect = root.querySelector<HTMLSelectElement>('#filter-category')
  const availabilitySelect = root.querySelector<HTMLSelectElement>('#filter-availability')
  const searchInput = root.querySelector<HTMLInputElement>('#filter-search')
  const statusEl = root.querySelector<HTMLElement>('#catalog-status')
  const table = root.querySelector<HTMLTableElement>('#catalog-table')
  const tbody = table?.querySelector('tbody')
  const exportBtn = root.querySelector<HTMLButtonElement>('#export-csv')
  const programsContainer = root.querySelector<HTMLElement>('#access-programs')

  let filteredRows = [...rows]

  const renderTable = () => {
    if (!tbody || !table) return
    tbody.innerHTML = ''
    filteredRows.forEach((row) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
        <td>${row.platform}</td>
        <td>${row.category}</td>
        <td>${row.element}</td>
        <td>${row.availability}</td>
        <td>${row.notes}</td>
        <td>${formatDate(row.lastUpdated)}</td>
      `
      tbody.appendChild(tr)
    })
    table.hidden = filteredRows.length === 0
    if (statusEl) {
      statusEl.textContent = `${filteredRows.length} record${filteredRows.length === 1 ? '' : 's'} displayed.`
    }
  }

  const populateSelect = (select: HTMLSelectElement | null, values: string[]) => {
    if (!select) return
    select.querySelectorAll('option:not([value=""])').forEach((option) => option.remove())
    values.forEach((value) => {
      const option = document.createElement('option')
      option.value = value
      option.textContent = value
      select.appendChild(option)
    })
  }

  const applyFilters = () => {
    const platform = platformSelect?.value || ''
    const category = categorySelect?.value || ''
    const availability = availabilitySelect?.value || ''
    const searchTerm = (searchInput?.value || '').toLowerCase()

    filteredRows = rows.filter((row) => {
      const matchesPlatform = !platform || row.platform === platform
      const matchesCategory = !category || row.category === category
      const matchesAvailability = !availability || row.availability === availability
      const matchesSearch = !searchTerm
        || row.element.toLowerCase().includes(searchTerm)
        || row.notes.toLowerCase().includes(searchTerm)
        || row.platform.toLowerCase().includes(searchTerm)
      return matchesPlatform && matchesCategory && matchesAvailability && matchesSearch
    })
    renderTable()
  }

  const downloadCsv = () => {
    if (!filteredRows.length) return
    const header = ['Platform', 'Category', 'Data element', 'Availability', 'Notes', 'Last updated']
    const csv = [header.join(',')]
      .concat(
        filteredRows.map((row) =>
          [row.platform, row.category, row.element, row.availability, row.notes, row.lastUpdated || '']
            .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
            .join(','),
        ),
      )
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'platform-data-catalog.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const renderPrograms = () => {
    if (!programsContainer) return
    programsContainer.innerHTML = ''
    programs.forEach((program) => {
      const card = document.createElement('article')
      card.className = 'card'
      card.innerHTML = `
        <h3>${program.program}</h3>
        <p><strong>Sponsor:</strong> ${program.sponsor}</p>
        <p><strong>Cadence:</strong> ${program.cadence}</p>
        <p><strong>Scope:</strong> ${program.scope}</p>
        <p><strong>Notes:</strong> ${program.notes}</p>
        <p><a href="${program.url}" target="_blank" rel="noreferrer">Program website ↗</a></p>
      `
      programsContainer.appendChild(card)
    })
  }

  populateSelect(platformSelect, [...new Set(rows.map((row) => row.platform))].sort())
  populateSelect(categorySelect, [...new Set(rows.map((row) => row.category))].sort())
  populateSelect(availabilitySelect, [...new Set(rows.map((row) => row.availability))].sort())
  renderTable()
  renderPrograms()

  if (statusEl) {
    statusEl.textContent = `${rows.length} records loaded. Use the filters to refine your view.`
    statusEl.classList.add('alert')
  }

  const handleExport = () => downloadCsv()

  platformSelect?.addEventListener('change', applyFilters)
  categorySelect?.addEventListener('change', applyFilters)
  availabilitySelect?.addEventListener('change', applyFilters)
  searchInput?.addEventListener('input', applyFilters)
  exportBtn?.addEventListener('click', handleExport)

  return () => {
    platformSelect?.removeEventListener('change', applyFilters)
    categorySelect?.removeEventListener('change', applyFilters)
    availabilitySelect?.removeEventListener('change', applyFilters)
    searchInput?.removeEventListener('input', applyFilters)
    exportBtn?.removeEventListener('click', handleExport)
  }
}
