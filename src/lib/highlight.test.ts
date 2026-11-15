import { describe, expect, it } from 'vitest'
import { splitMatches } from './highlight'

describe('splitMatches', () => {
  it('flags matching segments case-insensitively', () => {
    expect(splitMatches('Margherita Pizza', 'pizza')).toEqual([
      { text: 'Margherita ', match: false },
      { text: 'Pizza', match: true },
    ])
  })
  it('handles regex characters safely', () => {
    expect(splitMatches('a (b) c', '(b)')).toContainEqual({ text: '(b)', match: true })
  })
  it('returns the whole text for empty queries', () => {
    expect(splitMatches('abc', ' ')).toEqual([{ text: 'abc', match: false }])
  })
})
