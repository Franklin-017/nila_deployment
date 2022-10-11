var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine, world;

let randomIndexList = [];
var automaticDeletion = true;

let randomColor;

let collisionCheckFlag = false;

let vertices = [];
let pentagonVertices = [];
var startX,
  startY,
  clientX,
  clientY,
  shapeWidth = 0,
  shapeHeight = 0,
  mouseDrawFlag = false,
  circleRadius;

var vertexLeftX, vertexRightX, vertextopX;

var vertexLeftY, vertexRightY, vertextopY;

var shapesCounter = 0;

var shapesList = [];
function setup() {
  var canvas = createCanvas(innerWidth/2, (innerHeight));
  canvas.parent("canvas");
  canvas.mousePressed(mousePressedEvent);
  canvas.mouseReleased(mouseReleasedEvent);
  engine = Engine.create();
  world = engine.world;
  Matter.Runner.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(width/2, height + 15, width, 30, options); // 300 is that the matter.js creates a rectangle from the middle
  leftWall = Bodies.rectangle(0, (height+30)/2, 30, height + 30, options);
  rightWall = Bodies.rectangle(width, (height+30)/2, 30, height + 30, options);
  World.add(world, [ground, leftWall, rightWall]);
}

function generateRandomIndex() {
  randomIndexList = [];
  while (randomIndexList.length < 4) {
    var randomIndex = Math.floor(Math.random() * 4) + 1;
    if (randomIndexList.indexOf(randomIndex) === -1) randomIndexList.push(randomIndex);
  }
}

function getRandomColor() {
  let colorsList = ["#ff915a", "#57ccff", "#6b4dff", "#ffe05c"];
  randomColor = colorsList[randomIndexList[shapesCounter] - 1];
  return randomColor;
}

function draw() {
  background('#090d18');
  strokeWeight(2);
  fill('#090d18');
  if (mouseDrawFlag) {
    stroke(randomColor);
    switch (shapesCounter) {
      case 0:
        drawRectangle();
        break;
      case 1:
        drawCircle();
        break;
      case 2:
        drawTriangle();
        break;
      case 3:
        drawPentagon();
        break;
      default:
      // code block
    }
  }
  for (var i = 0; i < shapesList.length; i++) {
    shapesList[i].show();
    if (shapesList[i].body.velocity.y <= 0 && shapesList[i].body.velocity.x <= 0 && shapesList[i].body.position.y < 200 && automaticDeletion) {
      background(51);
      for (let i = 0; i < shapesList.length; i++) {
        World.remove(world, world.bodies[3]);
      }
      shapesList = [];
    }
  }
}

function drawRectangle() {
  rect(startX, startY, shapeWidth, shapeHeight);
}

function drawCircle() {
  circleRadius = Math.sqrt(shapeWidth * shapeWidth + shapeHeight * shapeHeight);
  ellipse(startX, startY, circleRadius * 2, circleRadius * 2);
}
function drawTriangle() {
  vertexLeftX = Math.min(startX, clientX);
  vertexLeftY = startY;
  vertextopY = clientY;
  vertexRightX = Math.max(startX, clientX);
  vertexRightY = vertexLeftY;
  vertextopX = (vertexLeftX + vertexRightX) / 2;
  triangle(vertexLeftX, vertexLeftY, vertextopX, vertextopY, vertexRightX, vertexRightY);
}
function drawPentagon() {
  angleMode(DEGREES);
  beginShape();
  for (let a = 0; a <= 360; a += 72) {
    let xax = -(startX - clientX) * sin(a) + startX;
    let yax = -(startY - clientY) * cos(a) + startY;
    vertex(xax, yax);
  }
  endShape();
  angleMode(RADIANS);
}

function checkCollision() {
  collisionCheckFlag = false;
  let drawingObject = world.bodies[world.bodies.length - 1];
  for (let i = 0; i < world.bodies.length - 1; i++) {
    if (Matter.Collision.collides(drawingObject, world.bodies[i])) {
      collisionCheckFlag = true;
    }
  }
  if (collisionCheckFlag) {
    shapesCounter -= 1;
    shapesList.pop();
    world.bodies.pop();
  }
}

function mouseDragged() {
  if (startX && startY) {
    mouseDrawFlag = true;
    clientX = mouseX;
    clientY = mouseY;
    shapeWidth = mouseX - startX;
    shapeHeight = mouseY - startY;
  }
}

function mousePressedEvent() {
  startX = mouseX;
  startY = mouseY;
  if (!(Array.isArray(randomIndexList) && randomIndexList.length)) {
    generateRandomIndex();
  }
  if (!collisionCheckFlag) {
    randomColor = color(getRandomColor());
  }
}

function mouseReleasedEvent() {
  mouseDrawFlag = false;
  if (shapeWidth && shapeHeight) {
    switch (shapesCounter) {
      case 0:
        shapesList.push(new Rectangle(Math.min(startX, clientX), Math.min(startY, clientY), Math.abs(shapeWidth), Math.abs(shapeHeight), randomColor));
        checkCollision();
        break;
      case 1:
        shapesList.push(new Circle(startX, startY, circleRadius * 2, randomColor));
        checkCollision();
        break;
      case 2:
        vertices = [
          { x: vertexLeftX, y: vertexLeftY },
          { x: vertextopX, y: vertextopY },
          { x: vertexRightX, y: vertexRightY }
        ];
        shapesList.push(new Triangle(startX, startY, vertices, randomColor));
        checkCollision();
        break;
      case 3:
        angleMode(DEGREES);
        for (let a = 0; a < 360; a += 72) {
          let xax = -(startX - clientX) * sin(a) + startX;
          let yax = -(startY - clientY) * cos(a) + startY;
          pentagonVertices.push({ x: xax, y: yax });
        }
        shapesList.push(new Pentagon(startX, startY, pentagonVertices, randomColor));
        shapesCounter = -1;
        randomIndexList = [];
        pentagonVertices = [];
        angleMode(RADIANS);
        checkCollision();
        break;
    }
    shapesCounter += 1;
  }
  startX = 0;
  startY = 0;
  clientX = 0;
  clientY = 0;
  shapeWidth = 0;
  shapeHeight = 0;
}

