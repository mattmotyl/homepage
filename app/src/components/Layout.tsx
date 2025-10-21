import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { chapters } from '../data/chapters'
import { usePageContext } from '../hooks/PageContext'

const brandPrimary = 'Platform Data Primer'
const brandSecondary = 'Matt Motyl, Ph.D.'

const getPrevNext = (path: string) => {
  const index = chapters.findIndex((chapter) => chapter.path === path)
  const previous = index > 0 ? chapters[index - 1] : undefined
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined
  return { previous, next }
}

const Layout = () => {
  const location = useLocation()
  const { headings } = usePageContext()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { previous, next } = useMemo(() => getPrevNext(location.pathname || '/'), [location.pathname])

  const handleToggleSidebar = () => {
    setSidebarOpen((open) => !open)
  }

  const closeSidebar = () => setSidebarOpen(false)
  const sidebarCollapsed = !sidebarOpen

  return (
    <div className="app-shell">
      <header>
        <div className="header-inner">
          <div className="brand">
            <span>{brandPrimary}</span>
            <span>{brandSecondary}</span>
          </div>
          <nav aria-label="Primary">
            <ul>
              {chapters.map((chapter) => (
                <li key={chapter.slug}>
                  <NavLink
                    to={chapter.path}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                    onClick={closeSidebar}
                  >
                    {chapter.navTitle}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div className="layout">
        <aside
          className="sidebar"
          aria-label="Table of contents"
          data-collapsed={sidebarCollapsed ? 'true' : 'false'}
        >
          <button
            className="sidebar-toggle"
            type="button"
            aria-expanded={!sidebarCollapsed}
            onClick={handleToggleSidebar}
          >
            Table of contents
          </button>
          <nav className="sidebar-nav">
            <ol>
              {headings.map((heading) => (
                <li key={heading.id} className={`level-${heading.level}`}>
                  <a href={`#${heading.id}`} onClick={closeSidebar}>
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <main>
          <Outlet context={{ previous, next }} />
        </main>
      </div>

      <footer>
        <div className="footer-inner">
          <strong>Need a deeper walkthrough?</strong>
          <span>Schedule time with Matt to align these datasets to your investigation or research question.</span>
          <span>
            © <span>{new Date().getFullYear()}</span> Matt Motyl.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
