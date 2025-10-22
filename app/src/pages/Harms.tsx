import { useCallback } from 'react'
import html from '../content/harms.html?raw'
import Page from '../components/Page'
import bootstrapRaw from '../data/harms-sql-bootstrap.json'
import samplesRaw from '../data/harms-sql-samples-data.json'
import tableDataRaw from '../data/harms-sql-table-data.json'
import { initSqlPlayground, type SampleQuery, type PreviewTable } from '../features/sqlPlayground'

const HarmsPage = () => {
  const handleReady = useCallback((root: HTMLElement) => {
    let cleanup: (() => void) | undefined
    let disposed = false

    const bootstrap = bootstrapRaw as string[]
    const samples = samplesRaw as SampleQuery[]
    const preview = tableDataRaw as PreviewTable[]

    initSqlPlayground(root, {
      bootstrap,
      walkthrough: [],
      samples,
      preview,
      selectors: {
        textarea: '#harms-sql-input',
        runButton: '#harms-run-query',
        resetButton: '#harms-reset-db',
        result: '#harms-sql-result',
        samples: '#harms-sql-samples',
        preview: '#harms-sql-preview',
      },
    }).then((dispose) => {
      if (disposed) {
        dispose?.()
      } else {
        cleanup = dispose
      }
    })

    return () => {
      disposed = true
      if (cleanup) cleanup()
    }
  }, [])

  return <Page html={html} onReady={handleReady} />
}

export default HarmsPage
