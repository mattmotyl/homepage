import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { usePageContext } from '../hooks/PageContext'
import { extractHeadings } from '../utils/headings'
import { renderHtml } from '../utils/renderHtml'
import PageNavigation from './PageNavigation'
import type { ChapterMeta } from '../data/chapters'

interface PageProps {
  html: string
  onReady?: (root: HTMLElement) => void | (() => void)
  children?: ReactNode
}

const Page = ({ html, onReady, children }: PageProps) => {
  const { setHeadings } = usePageContext()
  const headings = useMemo(() => extractHeadings(html), [html])
  const content = useMemo(() => renderHtml(html), [html])
  const containerRef = useRef<HTMLDivElement>(null)
  const { previous, next } = useOutletContext<{ previous?: ChapterMeta; next?: ChapterMeta }>()

  useEffect(() => {
    setHeadings(headings)
    return () => setHeadings([])
  }, [headings, setHeadings])

  useEffect(() => {
    if (!onReady) return
    const node = containerRef.current
    if (!node) return
    const cleanup = onReady(node)
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [onReady])

  return (
    <div ref={containerRef} className="page-content">
      {content}
      {children}
      <PageNavigation previous={previous} next={next} />
    </div>
  )
}

export default Page
