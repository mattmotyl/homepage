declare module '*.html?raw' {
  const content: string
  export default content
}

declare module '*.json' {
  const value: unknown
  export default value
}

declare module 'sql.js' {
  export interface SqlJsConfig {
    locateFile: (file: string) => string
  }

  export interface SqlJsStatic {
    Database: new (data?: Uint8Array) => Database
  }

  export interface QueryExecResult {
    columns: string[]
    values: Array<Array<string | number | null>>
  }

  export interface Database {
    exec(sql: string): QueryExecResult[]
    close(): void
    run(sql: string): void
  }

  export default function initSqlJs(config: SqlJsConfig): Promise<SqlJsStatic>
}

declare module 'react-syntax-highlighter' {
  import type { ComponentType } from 'react'

  interface SyntaxHighlighterProps {
    language?: string
    style?: Record<string, unknown>
    customStyle?: Record<string, unknown>
    children: string
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>
}
