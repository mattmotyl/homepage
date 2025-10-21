import { Link } from 'react-router-dom'
import type { ChapterMeta } from '../data/chapters'

interface PageNavigationProps {
  previous?: ChapterMeta
  next?: ChapterMeta
}

const PageNavigation = ({ previous, next }: PageNavigationProps) => (
  <div className="page-nav">
    {previous ? <Link to={previous.path}>← Previous: {previous.navTitle}</Link> : <span className="page-nav-placeholder" />}
    {next ? <Link to={next.path}>Next: {next.navTitle} →</Link> : <span className="page-nav-placeholder" />}
  </div>
)

export default PageNavigation
