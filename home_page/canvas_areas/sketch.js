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
let timer = 0;

let animationCompletionFlag = false;
let state = 1;
let animationX = 0;
let animationY = 0;

let animationStartPosX = innerWidth/2 + innerWidth/4,
    animationStartPosY = innerHeight/4;

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

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == "Y") { // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis == "X") { // Left to right gradient
      for (let j = x; j <= x + w; j++) {
        var inter2 = map(j, x, x + w, 0, 1);
        var d = lerpColor(c1, c2, inter2);
        stroke(d);
        line(j, y, j, y + h);
      }
    }
}

function drawCursor(shapeWidth,shapeHeight) {
    let color1 = color("#0063f4");
    let color2 = color("#00d0b0");
    setGradient(animationStartPosX-9+shapeWidth,animationStartPosY+1+shapeHeight,20,1,color1,color2,'X');
    setGradient(animationStartPosX+1+shapeWidth,animationStartPosY-9+shapeHeight,1,20,color1,color2,'Y');
}

function shapeCalculation() {
    shapeWidth = animationX;
    shapeHeight = animationY;
}

function animationPositive() {
    animationX += 1.5;
    animationY += 1.5;
}

function animationNegative() {
    animationX -= 1.5;
    animationY -= 1.5;
}

function animationShapes() {
    if(state == 1) {
        drawCursor(shapeWidth,shapeHeight);
        strokeWeight(2);
        stroke(color("#ff915a"));   
        noFill()
        drawRectangle();
        animationPositive();
        shapeCalculation();
    }
    if(state == 2) {
        shapesList.push(new Rectangle(animationStartPosX,animationStartPosY,shapeWidth,shapeHeight,color("#ff915a")));
        bodiesList.push(shapesList[shapesList.length-1].body);
        state = 3;
    }
    if(state == 3) {
        animationNegative();
        shapeCalculation();
        drawCursor(shapeWidth,shapeHeight);
    }
    if(state == 4) {
        drawCursor(shapeWidth,shapeHeight);
        strokeWeight(2);
        stroke(color("#57ccff"));   
        noFill()
        drawCircle();
        animationPositive();
        shapeCalculation();
    }
    if(state == 5) {
        shapesList.push(new Circle(animationStartPosX,animationStartPosY,circleRadius,color("#57ccff")));
        bodiesList.push(shapesList[shapesList.length-1].body);
        state = 6;
    }
    if(state == 6) {
        animationNegative();
        shapeCalculation();
        drawCursor(shapeWidth,shapeHeight);
    }
    if(state == 7) {
        drawCursor(shapeWidth,shapeHeight);
        strokeWeight(2);
        stroke(color("#6b4dff"));   
        noFill()
        drawTriangle();
        animationPositive();
        shapeCalculation();
        clientX = startX+shapeWidth;
        clientY = startY+shapeHeight;
    }
    if(state == 8) {
        vertices = [ 
            {x:vertexLeftX, y:vertexLeftY},
            {x:vertextopX, y:vertextopY},
            {x:vertexRightX, y:vertexRightY}
        ];
        shapesList.push(new Triangle(startX,startY,vertices,color("#6b4dff")));
        bodiesList.push(shapesList[shapesList.length-1].body);
        state = 9;
    }
    if(state == 9) {
        animationNegative();
        shapeCalculation();
        drawCursor(shapeWidth,shapeHeight);
        clientX = startX;
        clientY = startY;
    }
    if(state == 10) {
        drawCursor(shapeWidth,shapeHeight);
        strokeWeight(2);
        stroke(color("#ffe05c"));   
        noFill()
        drawPentagon();
        animationPositive();
        shapeCalculation();
        clientX = startX+shapeWidth;
        clientY = startY+shapeHeight;
    }
    if(state == 11) {
        angleMode(DEGREES);
        for(let a=0; a<360; a+=72) {
            let xax = -(startX - clientX) * sin(a) + startX;
            let yax = -(startY - clientY) * cos(a) + startY;
            pentagonVertices.push({x:xax, y:yax});
        }
        shapesList.push(new Pentagon(startX,startY,pentagonVertices,color("#ffe05c")));
        bodiesList.push(shapesList[shapesList.length-1].body);
        pentagonVertices = [];
        angleMode(RADIANS);
        state = 12;
    }
    if(state == 12) {
        shapeWidth = 0;
        shapeHeight = 0;
        startX = 0;
        startY = 0;
        clientX = 0;
        clientY = 0;
        animationCompletionFlag = true;
    }

    if(state == 1 && shapeWidth >= 80) {
        state = 2;
    }
    if(state == 3 && shapeWidth <= 0) {
        state = 4;
    }
    if(state == 4 && shapeWidth >= 120) {
        state = 5;
    }
    if(state == 6 && shapeWidth <= 0) {
        state = 7;
    }
    if(state == 7 && shapeWidth >= 100) {
        state = 8;
    }
    if(state == 9 && shapeWidth <= 0) {
        state = 10;
    }
    if(state == 10 && shapeWidth >= 15) {
        state = 11;
    }

}

function draw() {
    background("#090d18"); 
    if(animationCompletionFlag) {
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
    }
    else {
        startX = animationStartPosX;
        startY = animationStartPosY;
        if(timer >= 290) {
            animationShapes();
        }
        timer+=1;
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
    if(removeGroundFlag && countBodies((height/100)*60) >= 0 && countBodies((height/100)*60) <= 1) {
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
    if(startX&&startY&&animationCompletionFlag) {
        mouseDrawFlag = true;
        clientX = mouseX;
        clientY = mouseY;
        shapeWidth = mouseX - startX;
        shapeHeight = mouseY - startY;
    }
}

function mousePressedEvent() {
    if(animationCompletionFlag) {
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
}

function mouseMovedEvent() {
    let position = {x:mouseX,y:mouseY};
    mouseOverBodies = Matter.Query.point(bodiesList,position).length
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

function mouseReleased() {
    mouseDrawFlag = false;
    mousePressedFlag = false;
    mouseDraggedFlag = false;
    if(shapeWidth && shapeHeight && animationCompletionFlag) {
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
                pentagonVertices = [];
                angleMode(RADIANS); 
                bodiesList.push(shapesList[shapesList.length-1].body);
                checkCollision();    
                if(!collisionCheckFlag) {
                    randomIndexList = [];
                    shapesCounter = -1;
                }
                break;
          }
          if(countBodies((height/100)*30) >= 2) {
            removeGroundFlag = true;
            removeGround();
        }
        shapesCounter += 1; 

        startX = 0;
        startY = 0;
        clientX = 0;
        clientY = 0;
        shapeWidth = 0;
        shapeHeight = 0;
    }
}