import { useCallback } from 'react'
import html from '../content/using-apis.html?raw'
import Page from '../components/Page'
import bootstrapRaw from '../data/sql-bootstrap.json'
import walkthroughRaw from '../data/sql-walkthrough-data.json'
import samplesRaw from '../data/sql-samples-data.json'
import tableDataRaw from '../data/sql-table-data.json'
import { initSqlPlayground, type WalkthroughStep, type SampleQuery, type PreviewTable } from '../features/sqlPlayground'

const UsingApisPage = () => {
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
        textarea: '#using-sql-input',
        runButton: '#using-run-query',
        resetButton: '#using-reset-db',
        result: '#using-sql-result',
        walkthrough: '#using-sql-walkthrough',
        samples: '#using-sql-samples',
        preview: '#using-sql-preview',
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

export default UsingApisPage
