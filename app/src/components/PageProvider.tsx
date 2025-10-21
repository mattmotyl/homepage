import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { PageContext, type Heading } from '../hooks/PageContext'

interface PageProviderProps {
  children: ReactNode
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [headings, setHeadings] = useState<Heading[]>([])

  const value = useMemo(() => ({ headings, setHeadings }), [headings])

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}
