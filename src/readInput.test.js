import { getGridSize } from './readInput'


describe('Read the input txt file', () => {
  it('read the grid size', async () => {
    const {x, y} = await getGridSize()
    expect(typeof x).toBe('number')
    expect(typeof y).toBe('number')
    expect(x).toBeGreaterThan(0)
    expect(x).toBeLessThan(51)
    expect(y).toBeGreaterThan(0)
    expect(y).toBeLessThan(51)
  })
})