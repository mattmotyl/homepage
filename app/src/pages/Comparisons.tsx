import { useCallback } from 'react'
import html from '../content/comparisons.html?raw'
import Page from '../components/Page'
import rawData from '../data/comparison-indicators.json'
import { initComparison, type ComparisonRow } from '../features/comparison'

const ComparisonsPage = () => {
  const handleReady = useCallback((root: HTMLElement) => {
    const data = rawData as ComparisonRow[]
    const cleanup = initComparison(root, data)
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return <Page html={html} onReady={handleReady} />
}

export default ComparisonsPage
