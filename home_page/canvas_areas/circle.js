class Circle {
    constructor(x,y,radius,randomColor) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.randomColor = randomColor;
        var options = {
            constraintImpulse: { x: 0, y: 0, angle: 0.01 },
            restitution: 0.65,
            friction: 0.05
        }
        this.body = Bodies.circle(this.x,this.y,radius/2,options);
        World.add(world,this.body);
        this.show();
    }
    show() {
        var pos = this.body.position;
        push();
        stroke(this.randomColor);
        translate(pos.x,pos.y);
        rectMode(CENTER);
        ellipse(0,0,this.radius-4,this.radius-4);
        pop();
    }
}