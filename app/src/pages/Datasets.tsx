import { useCallback } from 'react'
import html from '../content/datasets.html?raw'
import Page from '../components/Page'
import rawData from '../data/datasets-data.json'
import { initDatasets, type DatasetRow } from '../features/datasets'

const DatasetsPage = () => {
  const handleReady = useCallback((root: HTMLElement) => {
    const data = rawData as DatasetRow[]
    const cleanup = initDatasets(root, data)
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return <Page html={html} onReady={handleReady} />
}

export default DatasetsPage
