import readline from 'readline'
import fs from 'fs'

let grid = { gx: 0, gy: 0 }
let robots = []
let directions = ['N', 'E', 'S', 'W']

// getGrid size
export const getGridSize = line => {
  let [gx, gy] = line.split(' ')
  return { gx: parseInt(gx, 10), gy: parseInt(gy, 10) }
}

// get robot initial position and direction
export const getRobotVector = line => {
  let [rx, ry, rd] = line.split(' ')
  return { rx: parseInt(rx, 10), ry: parseInt(ry, 10), rd }
}

// get robot movements
export const getRobotMovements = line => line.split('')

// open input file
const rl = readline.createInterface({
  input: fs.createReadStream('./data/input.txt')
})

export const moveForward = ({ rx, ry, rd }) => {
  switch (rd) {
    case 'N':
      ry++
      break
    case 'E':
      rx++
      break
    case 'S':
      ry--
      break
    case 'W':
      rx--
      break
    default:
  }
  return { rx, ry, rd }
}

export const turnLeft = ({ rx, ry, rd }) => {
  let idx = directions.findIndex(d => d === rd)
  if (idx > 0) {
    idx--
  } else {
    idx = 3
  }
  rd = directions[idx]
  return { rx, ry, rd }
}

export const turnRight = ({ rx, ry, rd }) => {
  let idx = directions.findIndex(d => d === rd)
  if (idx < 3) {
    idx++
  } else {
    idx = 0
  }
  rd = directions[idx]
  return { rx, ry, rd }
}

export const nextMove = (vector, mvt) => {
  switch (mvt) {
    case 'F':
      return moveForward(vector)
    case 'L':
      return turnLeft(vector)
    case 'R':
      return turnRight(vector)
    default:
  }
}

// check if a vector is in the scent list
export const checkScent = (scents, vector) => {
  let v = `${vector.rx}${vector.ry}${vector.rd}`
  let ret = scents.findIndex(s => `${s.rx}${s.ry}${s.rd}` === v)
  return ret > -1
}

// check if a vector is in the scent list
export const checkOffGrid = (grid, vector) =>
  vector.rx < 0 || vector.rx > grid.gx || vector.ry < 0 || vector.ry > grid.gy

let lineIdx = 0
let robotIdx = 0

// process the input file line by line
// to get grid size and for each robot location, direction, movements
rl.on('line', line => {
  if (lineIdx === 0) {
    grid = getGridSize(line)
  } else if (lineIdx === 1) {
    robots.push({})
    robots[robotIdx].vector = getRobotVector(line)
  } else if (lineIdx === 2) {
    robots[robotIdx].mvts = getRobotMovements(line)
  } else if (lineIdx === 3) {
    // reset line index to process next robot
    lineIdx = 0
    robotIdx++
  }
  lineIdx++
})

// reach end of file, process retrieved data
rl.on('close', () => {
  let scents = []

  // loop the robots list
  robots.forEach(robot => {
    let { vector, mvts } = robot
    let isLost = false

    // loop the movements list of each robot
    for (let mvt of mvts) {
      let newVector = nextMove(vector, mvt)
      let offGrid = checkOffGrid(grid, newVector)
      let isScent = checkScent(scents, vector)

      if (!isScent || !offGrid) {
        if (offGrid) {
          isLost = true
          scents.push(vector)
          console.log(`${vector.rx} ${vector.ry} ${vector.rd} LOST`)
          return false
        }
        vector = { ...newVector }
      }
    }

    if (isLost === false) {
      console.log(`${vector.rx} ${vector.ry} ${vector.rd}`)
    }
  })
})
