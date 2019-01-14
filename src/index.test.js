import {
  getGridSize,
  getRobotVector,
  getRobotMovements,
  moveForward,
  turnLeft,
  turnRight,
  nextMove,
  checkScent,
  checkOffGrid
} from './index'

describe('Input functions', () => {
  test('getGridSize', () => {
    expect(getGridSize('1 1')).toMatchObject({ gx: 1, gy: 1 })
    expect(getGridSize('3 2')).toMatchObject({ gx: 3, gy: 2 })
  })

  test('getRobotVector', () => {
    expect(getRobotVector('1 1 N')).toMatchObject({ rx: 1, ry: 1, rd: 'N' })
    expect(getRobotVector('3 2 S')).toMatchObject({ rx: 3, ry: 2, rd: 'S' })
  })

  test('getRobotMovements', () => {
    expect(getRobotMovements('FLR')).toMatchObject(['F', 'L', 'R'])
    expect(getRobotMovements('LLRRFF')).toMatchObject(['L', 'L', 'R', 'R', 'F', 'F'])
  })
})

describe('Movment functions', () => {
  test('moveForward', () => {
    expect(moveForward({ rx: 1, ry: 1, rd: 'N' })).toMatchObject({ rx: 1, ry: 2, rd: 'N' })
    expect(moveForward({ rx: 1, ry: 1, rd: 'S' })).toMatchObject({ rx: 1, ry: 0, rd: 'S' })
    expect(moveForward({ rx: 1, ry: 1, rd: 'E' })).toMatchObject({ rx: 2, ry: 1, rd: 'E' })
    expect(moveForward({ rx: 1, ry: 1, rd: 'W' })).toMatchObject({ rx: 0, ry: 1, rd: 'W' })
  })

  test('turnLeft', () => {
    expect(turnLeft({ rx: 1, ry: 1, rd: 'N' })).toMatchObject({ rx: 1, ry: 1, rd: 'W' })
    expect(turnLeft({ rx: 1, ry: 2, rd: 'S' })).toMatchObject({ rx: 1, ry: 2, rd: 'E' })
    expect(turnLeft({ rx: 1, ry: 3, rd: 'E' })).toMatchObject({ rx: 1, ry: 3, rd: 'N' })
    expect(turnLeft({ rx: 1, ry: 0, rd: 'W' })).toMatchObject({ rx: 1, ry: 0, rd: 'S' })
  })

  test('turnRight', () => {
    expect(turnRight({ rx: 1, ry: 1, rd: 'N' })).toMatchObject({ rx: 1, ry: 1, rd: 'E' })
    expect(turnRight({ rx: 1, ry: 2, rd: 'S' })).toMatchObject({ rx: 1, ry: 2, rd: 'W' })
    expect(turnRight({ rx: 1, ry: 3, rd: 'E' })).toMatchObject({ rx: 1, ry: 3, rd: 'S' })
    expect(turnRight({ rx: 1, ry: 0, rd: 'W' })).toMatchObject({ rx: 1, ry: 0, rd: 'N' })
  })

  test('nextMove', () => {
    expect(nextMove({ rx: 1, ry: 1, rd: 'N' }, 'F')).toMatchObject({ rx: 1, ry: 2, rd: 'N' })
    expect(nextMove({ rx: 1, ry: 2, rd: 'S' }, 'L')).toMatchObject({ rx: 1, ry: 2, rd: 'E' })
    expect(nextMove({ rx: 1, ry: 3, rd: 'E' }, 'R')).toMatchObject({ rx: 1, ry: 3, rd: 'S' })
  })
})

describe('Check functions', () => {
  test('checkScent', () => {
    expect(
      checkScent([{ rx: 1, ry: 1, rd: 'N' }, { rx: 1, ry: 1, rd: 'S' }], { rx: 1, ry: 1, rd: 'S' })
    ).toBe(true)
    expect(
      checkScent([{ rx: 2, ry: 2, rd: 'N' }, { rx: 3, ry: 0, rd: 'S' }], { rx: 1, ry: 1, rd: 'W' })
    ).toBe(false)
  })

  test('checkOffGrid', () => {
    expect(
      checkOffGrid({ gx: 3, gy: 3 }, { rx: 1, ry: 1, rd: 'S' })
    ).toBe(false)
    expect(
      checkOffGrid({ gx: 5, gy: 5}, { rx: 6, ry: 4, rd: 'W' })
    ).toBe(true)
    expect(
      checkOffGrid({ gx: 8, gy: 8}, { rx: -1, ry: 0, rd: 'E' })
    ).toBe(true)
  })
})
