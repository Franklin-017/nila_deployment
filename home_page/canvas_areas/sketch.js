var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;

Constraint = Matter.Constraint,
Mouse = Matter.Mouse,
MouseConstraint = Matter.MouseConstraint;

var engine,
    world;

let addGroundFlag = true;
let mouseDraggedFlag = true;

let mouseOverBodies = false;
let removeGroundFlag = false;

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
    shapeWidth=0,
    shapeHeight=0,
    mouseDrawFlag = false,
    mousePressedFlag = false,
    circleRadius;

var vertexLeftX,
    vertexRightX,
    vertextopX;

var vertexLeftY,
    vertexRightY,
    vertextopY;

var shapesCounter = 0;

var shapesList = [];
var bodiesList = [];
function setup() {
    var canvas = createCanvas(innerWidth,innerHeight);
    canvas.parent("canvas");
    canvas.mousePressed(mousePressedEvent);
    canvas.mouseMoved(mouseMovedEvent);
    engine = Engine.create();
    world = engine.world;
    Matter.Runner.run(engine);
    var boxWidth = 800;
    var options = {
        isStatic : true
    }
    ground = Bodies.rectangle(width / 2, height + (boxWidth/2), width+boxWidth, boxWidth, options); // 300 is that the matter.js creates a rectangle from the middle
    leftWall = Bodies.rectangle(-(boxWidth/2), height/2, boxWidth, height + boxWidth, options);
    rightWall = Bodies.rectangle(width + (boxWidth/2), height / 2, boxWidth, height + boxWidth, options);
    ceilWall = Bodies.rectangle(width / 2, -(boxWidth/2), width+boxWidth, boxWidth, options);

    bodiesList.push(ground);
    bodiesList.push(leftWall);
    bodiesList.push(rightWall);
    bodiesList.push(ceilWall);

    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, {mouse: canvasmouse});
    World.add(world,[ground,leftWall,rightWall,ceilWall,mConstraint]);
    frameRate(60);
}

function removeGround() {
    World.remove(world,[ground]);
}

function addGround() {
    World.add(world,[ground]);
}

function generateRandomIndex() {
    randomIndexList = [];
    while(randomIndexList.length < 4){
        var randomIndex = Math.floor(Math.random() * 4) + 1;
        if(randomIndexList.indexOf(randomIndex) === -1) randomIndexList.push(randomIndex);
    }
}


function getRandomColor() {
    let colorsList = ["#ff915a","#57ccff","#6b4dff","#ffe05c"];
    randomColor = colorsList[randomIndexList[shapesCounter]-1];
    return(randomColor);
}

function countBodies(topLimit) {
    let count = 0;
    for(var i=0;i<shapesList.length;i++) {
        if(shapesList[i].body.position.y < topLimit) {
            count +=1;
        }
    }
    return count;
}

function draw() {
    background("#090d18"); 
    // let flag = false;
    // let count = 0;
    if(mouseDrawFlag) {
        strokeWeight(2);
        stroke(randomColor);   
        noFill();
        switch(shapesCounter) {
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
        }
    }
    for(var i=0;i<shapesList.length;i++) {
        shapesList[i].show();
        if(shapesList[i].body.bounds.max.y>height+50 && !mouseDraggedFlag && removeGroundFlag) {
            bodiesList.splice(i+4,1);
            world.bodies.splice(i+3,1);
            shapesList.splice(i,1);
            i-=1;
        }
    } 
    if(removeGroundFlag && countBodies((height/100)*60) <= 1 ) {
        removeGroundFlag = false;
        addGround();
    } 
}
function drawRectangle() {
    rect(startX,startY,shapeWidth,shapeHeight);
}

function drawCircle() {
    circleRadius = Math.sqrt(shapeWidth*shapeWidth + shapeHeight*shapeHeight)
    ellipse(startX,startY,circleRadius,circleRadius);
}
function drawTriangle() {
    vertexLeftX = Math.min(startX,clientX);
    vertexLeftY = startY;
    vertextopY = clientY;
    vertexRightX = Math.max(startX,clientX);
    vertexRightY = vertexLeftY;
    vertextopX = (vertexLeftX + vertexRightX)/2;
    triangle(vertexLeftX,vertexLeftY, vertextopX, vertextopY, vertexRightX, vertexRightY);
}  
function drawPentagon() {
    angleMode(DEGREES);
    beginShape();
    for(let a=0; a<=360; a+=72) {
        let xax = -(startX - clientX) * sin(a) + startX;
        let yax = -(startY - clientY) * cos(a) + startY;
        vertex(xax,yax);
    }
    endShape();
    angleMode(RADIANS);     
} 

function checkCollision() {
    collisionCheckFlag = false;
    let drawingObject = world.bodies[world.bodies.length - 1]
    for(let i=0;i<world.bodies.length-1;i++) {
        if(Matter.Collision.collides(drawingObject, world.bodies[i])) {
            collisionCheckFlag = true;
        }
    }
    if(collisionCheckFlag) {
        shapesCounter -= 1;
        bodiesList.pop();
        shapesList.pop();
        world.bodies.pop();
    }
}

function getShapeWidth() {
    return shapeWidth;
}
function getShapeHeight() {
    return shapeHeight;
}

function mouseDragged() { 
    mouseDraggedFlag = true;
    if(startX&&startY) {
        mouseDrawFlag = true;
        clientX = mouseX;
        clientY = mouseY;
        shapeWidth = mouseX - startX;
        shapeHeight = mouseY - startY;
    }
}

function mousePressedEvent() {
    mousePressedFlag = true;
    startX = mouseX;
    startY = mouseY;
    let position = {x:startX,y:startY};
    if(Matter.Query.point(bodiesList,position).length) {
        World.add(world,mConstraint);
        mouseDrawFlag = false;
        startX = 0;
        startY = 0;
    }
    else {
        World.remove(world,mConstraint);
    }
    if(!(Array.isArray(randomIndexList) && randomIndexList.length)) {
        generateRandomIndex();
    }
    if(!collisionCheckFlag) {
        randomColor = color(getRandomColor());
    }
    
}

function touchStarted() {
    mousePressedFlag = true;
    startX = mouseX;
    startY = mouseY;
    let position = {x:startX,y:startY};
    if(Matter.Query.point(bodiesList,position).length) {
        World.add(world,mConstraint);
        mouseDrawFlag = false;
        startX = 0;
        startY = 0;
    }
    else {
        World.remove(world,mConstraint);
    }
    if(!(Array.isArray(randomIndexList) && randomIndexList.length)) {
        generateRandomIndex();
    }
    if(!collisionCheckFlag) {
        randomColor = color(getRandomColor());
    }
}

function mouseMovedEvent() {
    let position = {x:mouseX,y:mouseY};
    mouseOverBodies = Matter.Query.point(bodiesList,position).length
}

function mouseReleased() {
    mouseDrawFlag = false;
    mousePressedFlag = false;
    mouseDraggedFlag = false;
    if(shapeWidth && shapeHeight) {
        switch(shapesCounter) {
            case 0:
                shapesList.push(new Rectangle(Math.min(startX,clientX),Math.min(startY,clientY),Math.abs(shapeWidth),Math.abs(shapeHeight),randomColor));
                bodiesList.push(shapesList[shapesList.length-1].body);
                checkCollision();
                break;
            case 1:
                shapesList.push(new Circle(startX,startY,circleRadius,randomColor));
                bodiesList.push(shapesList[shapesList.length-1].body);
                checkCollision();
                break;
            case 2:
                vertices = [ 
                    {x:vertexLeftX, y:vertexLeftY},
                    {x:vertextopX, y:vertextopY},
                    {x:vertexRightX, y:vertexRightY}
                ];
                shapesList.push(new Triangle(startX,startY,vertices,randomColor));
                bodiesList.push(shapesList[shapesList.length-1].body);
                checkCollision();
                break;
            case 3:
                angleMode(DEGREES);
                for(let a=0; a<360; a+=72) {
                    let xax = -(startX - clientX) * sin(a) + startX;
                    let yax = -(startY - clientY) * cos(a) + startY;
                    pentagonVertices.push({x:xax, y:yax});
                }
                shapesList.push(new Pentagon(startX,startY,pentagonVertices,randomColor));
                shapesCounter = -1;
                randomIndexList = [];
                pentagonVertices = [];
                angleMode(RADIANS); 
                bodiesList.push(shapesList[shapesList.length-1].body);
                checkCollision();    
                break;
          }
          if(countBodies((height/100)*30) >= 2) {
            removeGroundFlag = true;
            removeGround();
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


