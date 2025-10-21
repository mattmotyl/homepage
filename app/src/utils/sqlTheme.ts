import type { CSSProperties } from 'react'

const base: Record<string, CSSProperties> = {
  'code[class*="language-"]': {
    color: '#1f2937',
    background: '#fff7ed',
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.95rem',
    lineHeight: 1.6,
  },
  'pre[class*="language-"]': {
    color: '#1f2937',
    background: '#fff7ed',
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    padding: '1.25rem',
    overflow: 'auto',
  },
  comment: { color: '#6b7280', fontStyle: 'italic' },
  keyword: { color: '#1e3a8a', fontWeight: '600' },
  builtin: { color: '#ea580c', fontWeight: '600' },
  function: { color: '#ea580c', fontWeight: '600' },
  string: { color: '#047857' },
  number: { color: '#0ea5e9' },
  operator: { color: '#1e293b' },
  punctuation: { color: '#1e293b' },
  constant: { color: '#7c3aed' },
  variable: { color: '#b45309' },
  tag: { color: '#1f2937' },
  selector: { color: '#1f2937' },
}

export default base
