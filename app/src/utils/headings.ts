import { Element, Node } from 'domhandler'
import { getText } from 'domutils'
import { parseDocument } from 'htmlparser2'
import type { Heading } from '../hooks/PageContext'

const isElement = (node: Node): node is Element => node.type === 'tag'

export const slugifyHeading = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const extractHeadings = (html: string): Heading[] => {
  const document = parseDocument(html)
  const headings: Heading[] = []

  const visit = (nodes: Node[]) => {
    nodes.forEach((node) => {
      if (!isElement(node)) {
        return
      }

      if (/^h[1-6]$/.test(node.name)) {
        const level = Number(node.name.slice(1))
        const text = getText(node).replace(/\s+/g, ' ').trim()
        if (!text) return
        const fallbackId = slugifyHeading(text)
        const id = node.attribs?.id || fallbackId
        headings.push({ id, text, level })
      }

      if (node.children?.length) {
        visit(node.children)
      }
    })
  }

  visit(document.childNodes as Node[])
  return headings
}
