// game functionality: click on cockroaches

let cockroaches = new Array(30);
let middle;
let score_number = 0;
let total_sadness_points = 0;
let STATUS;
let rubik;

function preload() {
  bg = loadImage("floor.jpg");
  STATUS = 'loading';
  rubik = loadFont('RubikDirt-Regular.ttf');
  baloo = loadFont("Baloo2-VariableFont_wght.ttf")
}


function setup() {
  middle = createVector(windowWidth / 2, windowHeight / 2);
  // create array of roaches
  for (let i = 0; i < cockroaches.length; i++) {
    middle = createVector(windowWidth / 2, windowHeight / 2);
    roach_size = Math.round(45 + random(-45, 45))

    lifenum = max(1, Math.round(roach_size / 10))

    total_sadness_points += lifenum;
    cockroaches[i] = new Bug(middle, roach_size, lifenum);
  }


  // create canvas
  createCanvas(windowWidth, windowHeight);
}

// draw function
function draw() {
  background(bg);

  cursor("cursorhand.png");

  if (STATUS == 'loading') {
    formatText("#d9d3ce", 30, rubik, "Your dorm room has a", windowWidth / 2, windowHeight / 2 - 170)
    formatText("#f5c431", 70, rubik, "COCKROACH INFESTATION!", windowWidth / 2, windowHeight / 2 - 100)
    formatText("white", 20, baloo, "The smaller roaches are easy to kill with one click, but the big ones contain multiple mini-cockroach-lives . . .", windowWidth / 2, windowHeight / 2)
    formatText("white", 20, baloo, "You will need to choose a strategy: Kill the small ones fast and let the big ones escape OR ", windowWidth / 2, windowHeight / 2 + 20)
    formatText("white", 20, baloo, "Focus on the big roaches but lose sight of the small cockroaches that can get in your bed . . .", windowWidth / 2, windowHeight / 2 + 40)
    formatText("#f5c431", 40, rubik, "(click anywhere to start extermination)", windowWidth / 2, windowHeight / 2 + 200)
    return;

  }

  formatText("white", 30, rubik, "SCORE = " + str(score_number), windowWidth / 9, windowHeight / 9)

  for (let i = 0; i < cockroaches.length; i++) {

    if (abs(cockroaches[i].pos.x) > windowWidth || abs(cockroaches[i].pos.y) > windowHeight) {
      cockroaches.splice(i, 1);
    }
    else {
      cockroaches[i].scatter();
    }
  }
  checkPoints();
}

// Mouse click will start the game, if we're not playing already
function mouseClicked() {
  if (STATUS != 'start') {
    STATUS = 'start';
  }
}

function mousePressed() {

  for (let i = 0; i < cockroaches.length; i++) {
    if (cockroaches[i].contains(mouseX, mouseY)) {
      cockroaches.splice(i, 1);
    }
  }
}

function checkPoints() {
  if (cockroaches.length == 0) {
    noLoop();
    let percentage = Math.round((score_number / total_sadness_points) * 100)
    if (percentage > 75) {
      formatText("#f5c431", 70, rubik, "UNPRECEDENTED!", windowWidth / 2, windowHeight / 2 - 100)
      formatText("white", 20, rubik, "You killed almost all the cockroaches! Enjoy a (mostly) cockroach-free semester :)", windowWidth / 2, windowHeight / 2)
    }
    else if (percentage > 50) {
      formatText("#f5c431", 70, rubik, "CONGRATS!", windowWidth / 2, windowHeight / 2 - 100)
      formatText("white", 20, rubik, "You successfully killed most (specifically, " + percentage + '%) of the cockroaches (but they might come back)', windowWidth / 2, windowHeight / 2)


    } else {
      formatText("red", 70, rubik, "BOO YOU LOST :(", windowWidth / 2, windowHeight / 2 - 100)
      formatText("white", 20, rubik, "You only killed " + percentage + '% of the cockroaches. THEY WILL COME BACK!', windowWidth / 2, windowHeight / 2)


    }
  }
}

///// --- cockroach object class
class Bug {
  constructor(middle, resizeVal, lifespan) {
    this.personal_cockroach = loadImage('cockroach2.png');
    // positioning
    this.r = 50;
    this.pos = middle;
    let offsetX = random(-60, 70);
    let offsetY = random(-70, 70);
    this.pos.x += offsetX;
    this.pos.y += offsetY;
    // movement
    this.vel = createVector();
    this.acc = createVector();
    // points
    this.lifespan = lifespan
    this.points = lifespan
    this.resizeVal = resizeVal
  }

  scatter() {
    this.direction = p5.Vector.random2D().mult(0.08);
    this.movement(this.direction);
    this.update();
    this.show();
  }

  show() {
    image(this.personal_cockroach, this.pos.x, this.pos.y);
    this.personal_cockroach.resize(this.resizeVal, this.resizeVal);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(5);
    this.acc.mult(0);
  }

  contains(givenX, givenY) {
    let d = dist(givenX, givenY, this.pos.x, this.pos.y);

    if (d < this.r) {
      this.lifespan -= 1
      if (this.lifespan <= 0) {
        score_number += this.points;
        this.personal_cockroach.resize(0, 0);
        return true;
      }
    }
    else {
      return false;
    }
  }

  // apply force to cockroach
  movement(force) {
    this.acc.add(force);
  }
}
//// text function
function formatText(hexcolor, sz, font, textstring, x, y) {
  textAlign(CENTER);

  fill(color(hexcolor));
  textSize(sz);
  textFont(font)
  text(textstring, x, y)
}

