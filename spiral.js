

let vertices = [];

let size = 2;
let nextSize = 2;
let radiusFactor = 3;
let maxDepth = 3;
let motherSize = 100;

let circleDistance = 0;
let nextCircleDistance = 0;

let showCircle = true;
let showPath = true;

function updateSpirograph(){
    vertices = [];
    size = nextSize;
    circleDistance = nextCircleDistance;
    console.log(motherSize)
    mom = new Circle(200,200, motherSize, maxDepth);
    mom.createChild();
}

Circle = function(x, y, r, depth){
  this.x = x;
  this.y = y;
  this.radius = r;
  this.angle = 0;
  this.pa = 0;
  this.depth = depth;

  this.child = []

  this.draw = function(){
    ellipse(this.x, this.y, this.radius*2);
    for (var i in this.child){
      this.child[i].draw();
    }
  }

  this.createChild = function(){
    if (this.depth > 0){
      for (var i = 0; i<size; i++){
        angle = Math.PI*2/size
        this.child.push(new Circle(this.x+Math.cos(angle*i)*this.radius, this.y+Math.sin(angle*i)*radius, this.radius/radiusFactor, this.depth-1))
        this.child[this.child.length-1].createChild();
      }
    }
  }

  this.rotateChild = function(){
    for (var i in this.child){
      angle = Math.PI*2/size
      this.child[i].x = (this.x + (Math.cos(angle*i + this.angle + this.pa)*(this.radius+this.child[i].radius+(circleDistance * (this.radius/motherSize)))))
      this.child[i].y = (this.y + (Math.sin(angle*i + this.angle + this.pa)*(this.radius+this.child[i].radius+(circleDistance * (this.radius/motherSize)))))
      this.child[i].angle += 0.01
      this.child[i].pa = this.angle + angle*i + this.pa
      this.child[i].rotateChild()
      if (this.depth == 1){
        if (mom.angle < (Math.PI*2)/size){  
            vertices.push([this.child[i].x, this.child[i].y])
        }
      }
    }
    this.angle += 0.01;
  }
}

let mom;
function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("sketch-holder")
  mom = new Circle(200,200, motherSize, 2);
  mom.createChild();
}

function draw() {
  background(220);
  strokeWeight(2);

  if (showPath){
    for (var i in vertices){
       vert = vertices[i];
       set(vert[0], vert[1] , 0)
    }
    updatePixels();
  }
  
  noFill();
  strokeWeight(5);
  if (showCircle){
    mom.draw();
  }
  mom.rotateChild();
}
