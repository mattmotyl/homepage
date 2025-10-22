import { useCallback } from 'react'
import html from '../content/practice.html?raw'
import Page from '../components/Page'
import bootstrapRaw from '../data/sql-bootstrap.json'
import walkthroughRaw from '../data/practice-sql-walkthrough.json'
import samplesRaw from '../data/practice-sql-samples-data.json'
import tableDataRaw from '../data/sql-table-data.json'
import { initSqlPlayground, type WalkthroughStep, type SampleQuery, type PreviewTable } from '../features/sqlPlayground'

const PracticePage = () => {
  const handleReady = useCallback((root: HTMLElement) => {
    let cleanup: (() => void) | undefined
    let disposed = false

    const bootstrap = bootstrapRaw as string[]
    const walkthrough = walkthroughRaw as WalkthroughStep[]
    const samples = samplesRaw as SampleQuery[]
    const preview = tableDataRaw as PreviewTable[]

    initSqlPlayground(root, {
      bootstrap,
      walkthrough,
      samples,
      preview,
      selectors: {
        textarea: '#practice-sql-input',
        runButton: '#practice-run-query',
        resetButton: '#practice-reset-db',
        result: '#practice-sql-result',
        walkthrough: '#practice-sql-walkthrough',
        samples: '#practice-sql-samples',
        preview: '#practice-sql-preview',
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

export default PracticePage
