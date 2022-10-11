class Rectangle {
    constructor(x,y,width,height,randomColor) {
        this.x = x+(width/2);
        this.y = y+(height/2);
        this.width = width;
        this.height = height;
        this.randomColor = randomColor;
        var options = {
            constraintImpulse: { x: 0, y: 0, angle: 0.005 },
            restitution: 0.65
        }
        this.body = Bodies.rectangle(this.x,this.y,width,height,options);
        World.add(world,this.body);
        this.show();
    }
    show() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        stroke(this.randomColor);
        translate(pos.x,pos.y);
        rotate(angle)
        rectMode(CENTER);
        rect(0,0,this.width-4,this.height-4);
        pop();
    }
}