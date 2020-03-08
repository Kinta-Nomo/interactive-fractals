
let screenDistance = 0.1; //determined from player's direction, usually right in front of player

let screenDistancez = 0.1; //determined from player's direction, usually right in front of player

let playerPos = [0, -200, -200];
let playerPos2 = [0, 0, -200];
let scaler = 1000;
let reSizer = 1000;

let angles = [0, 0, 0]


function rotation4xy(x, y, z, a){
    return [x * Math.cos(a) + y * (-Math.sin(a)),
        x * Math.sin(a) + y * Math.cos(a),
        z];
}
function rotation4xz(x, y, z, a){
    return [x * Math.cos(a) + z * (-Math.sin(a)),
            y,
            x * Math.sin(a) + z * Math.cos(a)];
}
function rotation4yz(x, y, z, a){
    return [x,
            y * Math.cos(a) + z * (-Math.sin(a)),
            y * Math.sin(a) + z * Math.cos(a)];
}

Point = function(x=null, y=null, z=null){
    this.x = x;
    this.y = y;
    this.z = z;

    this.draw = function(){
        dist = ((this.x-playerPos[0])**2+(this.y-playerPos[1])**2+(this.z-playerPos[2])**2)**0.5
        strokeWeight(1000/dist);
        stroke(255);
        projectedPoint = project3d(this.x, this.y, this.z)
        point(projectedPoint[0] * reSizer, projectedPoint[1] * reSizer);
        
        stroke(255, 0, 0);
        projectedPoint2 = project2d(projectedPoint[0]*reSizer, projectedPoint[1]*reSizer)
        point(projectedPoint2[0] * scaler, 0);
    }

    this.rotate = function(axy, axz, ayz){
        rotated1 = rotation4xy(this.x, this.y, this.z, axy)
        rotated2 = rotation4xz(rotated1[0], rotated1[1], rotated1[2], axz)
        rotated3= rotation4yz(rotated2[0], rotated2[1], rotated2[2], ayz)
        this.x = rotated3[0];
        this.y = rotated3[1];
        this.z = rotated3[2];
    }
}

let data = []
for (var i = 0; i<2; i++){
    for (var j = 0; j<2; j++){
        for (var k = 0; k<2; k++){
            data.push(new Point(i*200-100, j*200-100, k*200-100));
        }
    }
}

function project2d(x, y){
    return [((x-playerPos[0])/(y-playerPos[1]))*screenDistance, null, null]
}

function project3d(x, y, z){
    return [((x-playerPos2[0])/(z-playerPos2[2]))*screenDistancez , 
            ((y-playerPos2[1])/(z-playerPos2[2]))*screenDistancez, 
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
        data[p].rotate(angles[0], angles[1], angles[2])
        data[p].draw()
    }

    if(keyIsDown(16)){
        playerPos[0] += 1
    }if(keyIsDown(32)){
        playerPos[0] -= 1
    }
}