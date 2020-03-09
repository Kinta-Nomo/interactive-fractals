
let screenDistance = 1; //determined from player's direction, usually right in front of player

let screenDistancew = 1; //determined from player's direction, usually right in front of player


let scaler = 5;
let resizer = 100; //resize the projected points
let resizerw = 100; //resize the projected points

// let playerPos = [0, -200];
let playerPos2 = [0, 0, -200];
let playerPos3 = [0, 0, 0, -200];

let angles = [0, 0, 0, 0, 0, 0] 
let angleSpeeds = [0, 0, 0, 0, 0, 0];  


function rotation4xy(x, y, z, w, a){
    return [x * Math.cos(a) + y * (-Math.sin(a)),
        x * Math.sin(a) + y * Math.cos(a),
        z,
        w];
}
function rotation4xz(x, y, z, w, a){
    return [x * Math.cos(a) + z * (-Math.sin(a)),
            y,
            x * Math.sin(a) + z * Math.cos(a),
            w];
}
function rotation4xw(x, y, z, w, a){
    return [x * Math.cos(a) + w * (-Math.sin(a)),
            y,
            z,
            x * Math.sin(a) + w * Math.cos(a)];
}
function rotation4yz(x, y, z, w, a){
    return [x,
            y * Math.cos(a) + z * (-Math.sin(a)),
            y * Math.sin(a) + z * Math.cos(a),
            w];
}
function rotation4yw(x, y, z, w, a){
    return [x,
            y * Math.cos(a) + w * (-Math.sin(a)),
            z,
            y * Math.sin(a) + w * Math.cos(a)];
}
function rotation4zw(x, y, z, w, a){
    return [x,
        y,
        z * Math.cos(a) + (w * -Math.sin(a)),
        z * Math.sin(a) + (w * Math.cos(a))];
}


Point = function(x=null, y=null, z=null, w=null){
    this.origx = x;
    this.origy = y;
    this.origz = z;
    this.origw = w;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.dimension = (x!=null) + (y!=null) + (z!=null) + (w!=null);

    this.draw = function(){
        projectedPoint = project4d(this.x, this.y, this.z, this.w)
        // console.log(projectedPoint)
        projectedPoint2 = project3d(projectedPoint[0], projectedPoint[1], projectedPoint[2])
        // dist3d = ((this.x-playerPos3[0])**2+(this.y-playerPos3[1])**2+(this.z-playerPos3[2])**2)**0.5;
        // stroke(2550/dist3d);
        dist = ((this.x-playerPos3[0])**2+(this.y-playerPos3[1])**2+(this.z-playerPos3[2])**2+(this.w-playerPos3[3])**2)**0.5
        strokeWeight(1000/dist);
        point(projectedPoint2[0]*scaler, projectedPoint2[1]*scaler);
    }

    this.rotate = function(axy, axz, axw, ayz, ayw, azw){
        rotated1 = rotation4xy(this.origx, this.origy, this.origz, this.origw, axy)
        rotated2 = rotation4xz(rotated1[0], rotated1[1], rotated1[2], rotated1[3], axz)
        rotated3 = rotation4xw(rotated2[0], rotated2[1], rotated2[2], rotated2[3], axw)
        rotated4 = rotation4yz(rotated3[0], rotated3[1], rotated3[2], rotated3[3], ayz)
        rotated5 = rotation4yw(rotated4[0], rotated4[1], rotated4[2], rotated4[3], ayw)
        rotated6 = rotation4zw(rotated5[0], rotated5[1], rotated5[2], rotated5[3], azw)
        this.x = rotated6[0];
        this.y = rotated6[1];
        this.z = rotated6[2];
        this.w = rotated6[3];
    }
}

let data = []
// for (var i = 0; i<2; i++){
//     for (var j = 0; j<2; j++){
//         for (var k = 0; k<2; k++){
//             // data.push(new Point(i*200-100, j*200-100, k*200-100));
//             for (var l = 0; l<2; l++){
//                 data.push(new Point(i*200-100, j*200-100, k*200-100, l*200-100));
//             }
//         }
//     }
// }


function sponge(x, y, z, w, len, depth){
    if (depth <= 0){
        for (var i = 0; i<2; i++){
            for (var j = 0; j<2; j++){
                for (var k = 0; k<2; k++){
                    for (var l = 0; l<2; l++){
                        data.push(new Point(x + (len*i), y + (len*j), z + (len*k), w + (len*l)));
                    }
                }
            }
        }
    }else{
        for (var i = 0; i<2; i++){
            for (var j = 0; j<2; j++){
                for (var k = 0; k<2; k++){
                    for (var l = 0; l<2; l++){
                        sponge(x + (2*(len/3)*i), y + (2*(len/3)*j), z + (2*(len/3)*k), w + (2*(len/3)*l), len/3, depth-1)
                    }
                }
            }
        }
    }
}

sponge(-50, -50, -50, -50, 100, 3)

//=====projectors=====
function project2d(x, y){
    return [((x-playerPos[0])/(y-playerPos[1]))*screenDistance, null, null]
}

function project3d(x, y, z){
    return [((x-playerPos2[0])/(z-playerPos2[2]))*screenDistance * resizer, 
            ((y-playerPos2[1])/(z-playerPos2[2]))*screenDistance * resizer, 
            null, 
            null]
}

function project4d(x, y, z, w){
    return [((x-playerPos3[0])/(w-playerPos3[3]))*screenDistancew * resizerw, 
            ((y-playerPos3[1])/(w-playerPos3[3]))*screenDistancew * resizerw, 
            ((z-playerPos3[2])/(w-playerPos3[3]))*screenDistancew * resizerw,
            null ]
}
//==========

function setup(){
    createCanvas(500,500);
    strokeWeight(5);
    stroke(255);
}

function draw(){
    background(0);
    translate(250, 250);
    for (var a in angles){
        angles[a] += angleSpeeds[a];
    }
    for (var p in data){
        data[p].rotate(angles[0], angles[1], angles[2], angles[3], angles[4], angles[5])
        data[p].draw()
    }

    
    if(keyIsDown(16)){
        playerPos2[1] += 5
    }if(keyIsDown(32)){
        playerPos2[1] -= 5
    }
    
    if(keyIsDown(87)){
        playerPos2[2] += 5
    }if(keyIsDown(83)){
        playerPos2[2] -= 5
    }
    
    if(keyIsDown(68)){
        playerPos2[0] += 5
    }if(keyIsDown(65)){
        playerPos2[0] -= 5
    }

    if(keyIsDown(81)){
        playerPos3[3] += 5
    }if(keyIsDown(69)){
        playerPos3[3] -= 5
    }
}