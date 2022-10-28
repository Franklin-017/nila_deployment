class Pentagon {
    constructor(x,y,vertices,randomColor) {
        this.x = x;
        this.y = y;
        this.vertices = vertices;
        this.randomColor = randomColor;
        var options = {
            constraintImpulse: { x: 0, y: 0, angle: 0.005 },
            restitution: 0.65
        }
        this.body = Bodies.fromVertices(this.x,this.y,this.vertices,options);
        World.add(world,this.body);
        this.show();
    }
    show() {
        var pos = this.body.vertices;
        push();
        stroke(this.randomColor);
        angleMode(DEGREES);
        beginShape();
        for(let a=0; a<5; a+=1) {
            vertex(pos[a].x,pos[a].y);
        }
        vertex(pos[0].x,pos[0].y);
        endShape();
        angleMode(RADIANS);  
        pop();
    }

}