
let screenDistance = 0.1; //determined from player's direction, usually right in front of player
let screenDistancew = 0.1; //determined from player's direction, usually right in front of player
let playerPos = [0, 0, 0, -200];
let scaler = 1000;

Point = function(x=null, y=null, z=null, w=null){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.dimension = (x!=null) + (y!=null) + (z!=null) + (w!=null);

    this.draw = function(){
        projectedPoint = project4d(this.x, this.y, this.z, this.w)
        projectedPoint2 = project3d(projectedPoint[0], projectedPoint[1] , projectedPoint[2])
        point(projectedPoint2[0] * scaler, projectedPoint2[1] * scaler);
    }
}

let data = []
for (var i = 0; i<2; i++){
    for (var j = 0; j<2; j++){
        for (var k = 0; k<2; k++){
            for (var l = 0; l<2; l++){
                data.push(new Point(i*200-100, j*200-100, k*200-100, l*200-100));
            }
        }
    }
}

function project2d(x, y){
    return [(x/screenDistance)*y, null, null, null]
}

function project3d(x, y, z){
    return [((x-playerPos[0])/(z-playerPos[2]))*screenDistance , 
            ((y-playerPos[1])/(z-playerPos[2]))*screenDistance,
            null, 
            null]
}

function project4d(x, y, z, w){
    return [((x-playerPos[0])/(w-playerPos[3]))*screenDistancew , 
            ((y-playerPos[1])/(w-playerPos[3]))*screenDistancew , 
            ((z-playerPos[2])/(w-playerPos[3]))*screenDistancew , 
            null]
}

function setup(){
    createCanvas(500,500);
    strokeWeight(5);
    stroke(255);
}

function draw(){
    background(0);
    translate(250, 250);
    for (var p in data){
        data[p].draw()
    }
}