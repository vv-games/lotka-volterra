let preys = []
let predators = []

function setup() {
  createCanvas(800, 800);

  preys.push(new Prey(round(random(width) / 5) * 5, round(random(height) / 5) * 5))
  predators.push(new Predator(round(random(width) / 5) * 5, round(random(height) / 5) * 5))
}

function draw() {
  frameRate(144)
  background('rgba(255,255,255, 0.5)');

  for (let i = 0; i < preys.length; i++) {
    preys[i].draw()
    preys[i].move()
  }

  let spawn = random()

  if (spawn >= 0.7 && preys.length !== 0) {
    let parent = floor(random(preys.length))

    preys.push(new Prey(preys[parent].position.x, preys[parent].y))
  }

  let predatorHasEaten = -1

  for (let i = 0; i < predators.length; i++) {
    predators[i].draw()
    predators[i].move()
    
    end_loops:
    for (let k = 0; k < preys.length; k++) {
      if (dist(predators[i].position.x, predators[i].position.y, preys[k].position.x, preys[k].position.y) <= 10) {
      // if (preys[k].position.x === predators[i].position.x + (row * 5) && preys[k].position.y === predators[i].position.y + (col * 5)) {
        predatorHasEaten = i
        preys.splice(k, 1)
        break end_loops
      }
    }
  }

  if (predatorHasEaten !== -1) {
    // console.log('eaten', predatorHasEaten)
    let predatorShouldSpawn = random()

    if (predatorShouldSpawn >= 0.5) {
      predators.push(new Predator(predators[predatorHasEaten].position.x, predators[predatorHasEaten].position.y))
    }
  }
  
  let predatorShouldDie = random()
  
  if (preys.length > 0 && predatorShouldDie >= 1 - predators.length / preys.length && predators.length >= 2) {
    predators.splice(floor(random(predators.length)), 1)
  }

  noStroke()
  fill(0, 0, 255)
  text(preys.length, 20, 20)
  fill(255, 0, 0)
  text(predators.length, width - 20, 20)
  // console.log(preys.length)
}

class Prey {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = p5.Vector.random2D()
    this.speed = 2
  }

  draw() {
    // fill(0, 0, 255)
    strokeWeight(5)
    stroke(0, 0, 255)
    point(this.position.x, this.position.y)
    // rect(this.x, this.y, 5, 5)
  }

  move() {

    this.velocity.add(p5.Vector.random2D())
    this.velocity.setMag(this.speed)
    this.velocity.limit(5)
    this.position.add(this.velocity)

    this.position.x = (this.position.x + width) % width
    this.position.y = (this.position.y + height) % height
  }
}

class Predator extends Prey {
  constructor(x, y) {
    super(x, y)
    this.speed = 3
  }

  draw() {
    stroke(255, 0, 0)
    point(this.position.x, this.position.y)
    // fill(255, 0, 0)
    // rect(this.x, this.y, 5, 5)
  }
}
