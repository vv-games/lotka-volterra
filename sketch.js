let preys = []
let predators = []

function setup() {
  createCanvas(800, 800);

  preys.push(new Prey(round(random(width) / 5) * 5, round(random(height) / 5) * 5))

  predators.push(new Predator(round(random(width) / 5) * 5, round(random(height) / 5) * 5))
}

function draw() {
  frameRate(144)
  background(255);

  for (let i = 0; i < preys.length; i++) {
    preys[i].draw()
    preys[i].move()
  }

  let spawn = random()

  if (spawn >= 0.7 && preys.length !== 0) {
    let parent = floor(random(preys.length))

    preys.push(new Prey(preys[parent].x, preys[parent].y))
  }

  let predatorHasEaten = -1

  for (let i = 0; i < predators.length; i++) {
    predators[i].draw()
    predators[i].move()
    
    end_loops:
    for (let k = 0; k < preys.length; k++) {
      for (let row = -1; row < 2; row++) {
        for (let col = -1; col < 2; col++) {
          if (preys[k].x === predators[i].x + (row * 5) && preys[k].y === predators[i].y + (col * 5)) {
            predatorHasEaten = i
            preys.splice(k, 1)
            break end_loops
          }
        }
      }
    }

//     let preyIndex = preys.findIndex(function(prey) {

//       for (let row = -1; row < 2; row++) {
//         for (let col = -1; col < 2; col++) {
//           if (prey.x == predators[i].x + row && prey.y == predators[i].y + col) {
//             predatorHasEaten = i
//             return true
//           }
//         }
//       }

//       return false
//     })

    // if (preyIndex !== -1) {
    //   preys.splice(preyIndex, 1)
    // }
  }

  if (predatorHasEaten !== -1) {
    // console.log('eaten', predatorHasEaten)
    let predatorShouldSpawn = random()

    if (predatorShouldSpawn >= 0.5) {
      predators.push(new Predator(predators[predatorHasEaten].x, predators[predatorHasEaten].y))
    }
  }
  
  let predatorShouldDie = random()
  
  if (preys.length > 0 && predatorShouldDie >= 1 - predators.length / preys.length && predators.length >= 2) {
    predators.splice(floor(random(predators.length)), 1)
  }

  fill(0, 0, 255)
  text(preys.length, 20, 20)
  fill(255, 0, 0)
  text(predators.length, width - 20, 20)
  // console.log(preys.length)
}

class Prey {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  draw() {
    fill(0, 0, 255)
    rect(this.x, this.y, 5, 5)
  }

  move() {
    let direction = round(random(7))

    switch (direction) {
      case 0:
        this.x -= 5;
        this.y -= 5;
        break;
      case 1:
        this.y -= 5;
        break;
      case 2:
        this.x += 5;
        this.y -= 5;
        break;
      case 3:
        this.x -= 5;
        break;
      case 4:
        this.x += 5;
        break;
      case 5:
        this.x -= 5;
        this.y += 5;
        break;
      case 6:
        this.y += 5;
        break;
      case 7:
        this.x += 5;
        this.y += 5;
        break;
    }

    this.x = (this.x + width) % width
    this.y = (this.y + height) % height
  }
}

class Predator extends Prey {
  draw() {
    fill(255, 0, 0)
    rect(this.x, this.y, 5, 5)
  }
}
