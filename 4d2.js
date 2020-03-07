
let screenDistance = 0.1; //determined from player's direction, usually right in front of player
let playerPos = [0, 0, -200];
let scaler = 1000;

let angles = [0, 0, 0, 0, 0, 0]


function rotation4zw(x, y, z, w, a){
    return [x,
        y,
        z * Math.cos(a) + (w * -Math.sin(a)),
        z * Math.sin(a) + (w * Math.cos(a))];
}
function rotation4xy(x, y, z, w, a){
    return [x * Math.cos(a) + y * (-Math.sin(a)),
        x * Math.sin(a) + y * Math.cos(a),
        z,
        w];
}
function rotation4yz(x, y, z, w, a){
    return [x,
            y * Math.cos(a) + z * (-Math.sin(a)),
            y * Math.sin(a) + z * Math.cos(a),
            w];
}
function rotation4xz(x, y, z, w, a){
    return [x * Math.cos(a) + z * (-Math.sin(a)),
            y,
            x * Math.sin(a) + z * Math.cos(a),
            w];
}
function rotation4yw(x, y, z, w, a){
    return [x,
            y * Math.cos(a) + w * (-Math.sin(a)),
            z,
            y * Math.sin(a) + w * Math.cos(a)];
}
function rotation4xw(x, y, z, w, a){
    return [x * Math.cos(a) + w * (-Math.sin(a)),
            y,
            z,
            x * Math.sin(a) + w * Math.cos(a)];
}


Point = function(x=null, y=null, z=null, w=null){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.dimension = (x!=null) + (y!=null) + (z!=null) + (w!=null);

    this.draw = function(){
        projectedPoint = project3d(this.x, this.y, this.z)
        dist = ((this.x-playerPos[0])**2+(this.y-playerPos[1])**2+(this.z-playerPos[2])**2)**0.5
        strokeWeight(1000/dist)
        point(projectedPoint[0] * scaler, projectedPoint[1] * scaler);
    }

    this.rotate = function(axy, axz, axw, ayz, ayw, azw){
        rotated1 = rotation4xy(this.x, this.y, this.z, this.w, axy)
        rotated2 = rotation4yz(rotated1[0], rotated1[1], rotated1[2], rotated1[3], axz)
        rotated3 = rotation4xz(rotated2[0], rotated2[1], rotated2[2], rotated2[3], axw)
        rotated4 = rotation4yz(rotated1[0], rotated1[1], rotated1[2], rotated1[3], axz)
        rotated5 = rotation4xz(rotated2[0], rotated2[1], rotated2[2], rotated2[3], axw)
        rotated6 = rotation4xz(rotated2[0], rotated2[1], rotated2[2], rotated2[3], axw)
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
    return [(x/screenDistance)*y, null, null, null]
}

function project3d(x, y, z){
    return [((x-playerPos[0])/(z-playerPos[2]))*screenDistance , ((y-playerPos[1])/(z-playerPos[2]))*screenDistance, null, null]
}

function project4d(x, y, z, w){
    return [(x/screenDistance)*w , (y/screenDistance)*w , (z/screenDistance)*w, null]
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
        data[p].rotate(angles[0], angles[1], angles[2], angles[3])
        data[p].draw()
    }
}