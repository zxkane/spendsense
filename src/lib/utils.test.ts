import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('active-class')
  })

  it('handles undefined values', () => {
    const result = cn('base-class', undefined, 'another-class')
    expect(result).toBe('base-class another-class')
  })
})
