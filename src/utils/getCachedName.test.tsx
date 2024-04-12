import { getCachedName } from './getCachedName'

describe('getCachedName function', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty string when no cached data is available', () => {
    const result = getCachedName(123)
    expect(result).toEqual('')
  })

  it('returns empty string when id is not provided', () => {
    localStorage.setItem(
      'charactersData',
      JSON.stringify([{ id: 123, name: 'BotName1' }]),
    )
    const result = getCachedName()
    expect(result).toEqual('')
  })

  it('returns empty string when id does not match any persona', () => {
    localStorage.setItem(
      'charactersData',
      JSON.stringify([{ id: 123, name: 'BotName1' }]),
    )
    const result = getCachedName(456)
    expect(result).toEqual('')
  })

  it('returns persona name when id matches a persona', () => {
    const personas = [
      { id: 123, name: 'BotName1' },
      { id: 456, name: 'BotName2' },
    ]
    localStorage.setItem('charactersData', JSON.stringify(personas))
    const result = getCachedName(123)
    expect(result).toEqual('BotName1')
  })

  it('returns persona name when id matches a persona (string id)', () => {
    const personas = [
      { id: 'abc', name: 'BotName3' },
      { id: 'def', name: 'BotName2' },
    ]
    localStorage.setItem('charactersData', JSON.stringify(personas))
    const result = getCachedName('abc')
    expect(result).toEqual('BotName3')
  })
})
