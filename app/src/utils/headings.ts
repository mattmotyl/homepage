import { Element, Node } from 'domhandler'
import { getText } from 'domutils'
import { parseDocument } from 'htmlparser2'
import type { Heading } from '../hooks/PageContext'

const isElement = (node: Node): node is Element => node.type === 'tag'

export const extractHeadings = (html: string): Heading[] => {
  const document = parseDocument(html)
  const headings: Heading[] = []
  const sectionStack: (string | undefined)[] = []

  const visit = (nodes: Node[]) => {
    nodes.forEach((node) => {
      if (!isElement(node)) {
        return
      }
      if (node.name === 'section') {
        sectionStack.push(node.attribs?.id)
        if (node.children?.length) {
          visit(node.children)
        }
        sectionStack.pop()
        return
      }

      if (/^h[1-6]$/.test(node.name)) {
        const level = Number(node.name.slice(1))
        const text = getText(node).replace(/\s+/g, ' ').trim()
        const fallbackId = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
        const id = node.attribs?.id || sectionStack[sectionStack.length - 1] || fallbackId
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
