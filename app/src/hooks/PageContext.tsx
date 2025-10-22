import { createContext, useContext } from 'react'

export interface Heading {
  id: string
  text: string
  level: number
}

export interface PageContextValue {
  headings: Heading[]
  setHeadings: (headings: Heading[]) => void
}

export const PageContext = createContext<PageContextValue | undefined>(undefined)

export const usePageContext = (): PageContextValue => {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider')
  }
  return context
}
