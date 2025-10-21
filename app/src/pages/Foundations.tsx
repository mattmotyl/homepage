import { useCallback } from 'react'
import html from '../content/foundations.html?raw'
import Page from '../components/Page'
import catalogDataRaw from '../data/catalog-data.json'
import programDataRaw from '../data/program-data.json'
import supplementalDataRaw from '../data/supplemental-data.json'
import { initCatalog, type CatalogRow, type AccessProgram } from '../features/catalog'
import { initSupplemental, type SupplementalData } from '../features/supplemental'

const FoundationsPage = () => {
  const handleReady = useCallback((root: HTMLElement) => {
    const cleanups: Array<(() => void) | void> = []
    const catalogData = catalogDataRaw as CatalogRow[]
    const programData = programDataRaw as AccessProgram[]
    const supplementalData = supplementalDataRaw as SupplementalData

    cleanups.push(initCatalog(root, catalogData, programData))
    cleanups.push(initSupplemental(root, supplementalData))
    return () => {
      cleanups.forEach((cleanup) => {
        if (typeof cleanup === 'function') cleanup()
      })
    }
  }, [])

  return <Page html={html} onReady={handleReady} />
}

export default FoundationsPage
