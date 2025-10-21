import parse, { domToReact } from 'html-react-parser'
import type { Element, DOMNode, HTMLReactParserOptions } from 'html-react-parser'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sqlTheme from './sqlTheme'

const routeMap: Record<string, string> = {
  'index.html': '/',
  'foundations.html': '/foundations',
  'api.html': '/api',
  'warehouses.html': '/warehouses',
  'workflows.html': '/workflows',
  'harms.html': '/harms',
  'datasets.html': '/datasets',
  'comparisons.html': '/comparisons',
  'engage.html': '/engage',
}

const transformNode = (domNode: Element, options: HTMLReactParserOptions) => {
  if (domNode.name === 'main') {
    return <>{domToReact(domNode.children as unknown as DOMNode[], options)}</>
  }

  if (domNode.name === 'div' && domNode.attribs?.class?.includes('page-nav')) {
    return null
  }

  if (domNode.name === 'a' && domNode.attribs?.href) {
    const href = domNode.attribs.href
    if (routeMap[href]) {
      return (
        <Link to={routeMap[href]}>{domToReact(domNode.children as unknown as DOMNode[], options)}</Link>
      )
    }
  }

  if (domNode.name === 'code' && domNode.attribs?.class?.includes('language-sql')) {
    const content = domToReact(domNode.children as unknown as DOMNode[], options)
    const text = Array.isArray(content)
      ? content
          .map((child) => (typeof child === 'string' ? child : ''))
          .join('')
      : typeof content === 'string'
        ? content
        : ''
    return (
      <SyntaxHighlighter language="sql" style={sqlTheme} customStyle={{ borderRadius: '0.75rem' }}>
        {text.trim()}
      </SyntaxHighlighter>
    )
  }

  return undefined
}

export const renderHtml = (html: string) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'text') return undefined
      if (domNode.type === 'tag') {
        return transformNode(domNode, options)
      }
      return undefined
    },
  }
  return parse(html, options)
}
