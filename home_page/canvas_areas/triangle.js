class Triangle {
    constructor(x,y,vertices,randomColor) {
        this.x = x;
        this.y = y;
        this.vertices = vertices;
        this.randomColor = randomColor;
        var options = {
            constraintImpulse: { x: 0, y: 0, angle: 0.005 },
            restitution: 0.65,
        }
        this.body = Bodies.fromVertices((this.vertices[0].x+this.vertices[2].x)/2,(this.vertices[0].y+this.vertices[1].y)/2,this.vertices, options);
        console.log(this.body);
        World.add(world,this.body);
        this.show();
    }
    show() {
        var pos = this.body.vertices;
        push();
        stroke(this.randomColor);
        triangle(pos[0].x,pos[0].y,pos[1].x,pos[1].y,pos[2].x,pos[2].y);
        pop();
    }
}