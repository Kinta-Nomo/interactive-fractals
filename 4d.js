
let screenDistancew = 1; //determined from player's direction, usually right in front of player

let zoom = 5;
let resizerw = 100; //resize the projected points

let playerPos = [0, 0, 0, -200];

let angles = [0, 0, 0, 0, 0, 0] 
let angleSpeeds = [0, 0.05, 0, 0, 0.05, 0];  


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


// Point = function(x=null, y=null, z=null, w=null){
Point = function(coordinate){
    this.origx = coordinate[0];
    this.origy = coordinate[1];
    this.origz = coordinate[2];
    this.origw = coordinate[3];
    this.x = coordinate[0];
    this.y = coordinate[1];
    this.z = coordinate[2];
    this.w = coordinate[3];
    // this.dimension = (x!=null) + (y!=null) + (z!=null) + (w!=null);

    this.draw = function(){
        projectedPoint = project4d(this.x, this.y, this.z, this.w)
        // d = ((projectedPoint[0]-playerPos[0])**2+(projectedPoint[1]-playerPos[1])**2+(projectedPoint[2]-playerPos[2])**2)**0.5
        // stroke(d*5)
        vertex(projectedPoint[0] * zoom, projectedPoint[1] * zoom, projectedPoint[2] * zoom)
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

function cube(vertices){
    data.push([new Point(vertices[0]), new Point(vertices[1]), new Point(vertices[2]), new Point(vertices[3])])
    data.push([new Point(vertices[2]), new Point(vertices[3]), new Point(vertices[4]), new Point(vertices[5])])
    data.push([new Point(vertices[4]), new Point(vertices[5]), new Point(vertices[6]), new Point(vertices[7])])
    data.push([new Point(vertices[0]), new Point(vertices[1]), new Point(vertices[6]), new Point(vertices[7])])
    data.push([new Point(vertices[1]), new Point(vertices[2]), new Point(vertices[5]), new Point(vertices[6])])
    data.push([new Point(vertices[0]), new Point(vertices[3]), new Point(vertices[4]), new Point(vertices[7])])
}3

function tesseract(x, y, z, w, len){
    cube([[x,y,z,w], [x+len,y,z,w], [x+len,y+len,z,w], [x,y+len,z,w], [x,y+len,z+len,w], [x+len,y+len,z+len,w], [x+len,y,z+len,w], [x,y,z+len,w]])
    cube([[x,y,z,w], [x,y+len,z,w], [x,y+len,z+len,w], [x,y,z+len,w], [x,y,z+len,w+len], [x,y+len,z+len,w+len], [x,y+len,z,w+len], [x,y,z,w+len]])
    cube([[x,y,z,w], [x,y,z+len,w], [x,y,z+len,w+len], [x,y,z,w+len], [x+len,y,z,w+len], [x+len,y,z+len,w+len], [x+len,y,z+len,w], [x+len,y,z,w]])
    cube([[x,y,z,w], [x,y,z,w+len], [x+len,y,z,w+len], [x+len,y,z,w], [x+len,y+len,z,w], [x+len,y+len,z,w+len], [x,y+len,z,w+len], [x,y+len,z,w]])
    x+=len;y+=len;z+=len;w+=len;
    len = -len
    cube([[x,y,z,w], [x+len,y,z,w], [x+len,y+len,z,w], [x,y+len,z,w], [x,y+len,z+len,w], [x+len,y+len,z+len,w], [x+len,y,z+len,w], [x,y,z+len,w]])
    cube([[x,y,z,w], [x,y+len,z,w], [x,y+len,z+len,w], [x,y,z+len,w], [x,y,z+len,w+len], [x,y+len,z+len,w+len], [x,y+len,z,w+len], [x,y,z,w+len]])
    cube([[x,y,z,w], [x,y,z+len,w], [x,y,z+len,w+len], [x,y,z,w+len], [x+len,y,z,w+len], [x+len,y,z+len,w+len], [x+len,y,z+len,w], [x+len,y,z,w]])
    cube([[x,y,z,w], [x,y,z,w+len], [x+len,y,z,w+len], [x+len,y,z,w], [x+len,y+len,z,w], [x+len,y+len,z,w+len], [x,y+len,z,w+len], [x,y+len,z,w]])

}

function cantor(x, y, z, w, len, depth){
    if (depth <= 0){
        tesseract(x,y,z,w,len)
    }else{
        for (var i = 0; i<2; i++){
            for (var j = 0; j<2; j++){
                for (var k = 0; k<2; k++){
                    for (var l = 0; l<2; l++){
                        cantor(x + (2*(len/3)*i), y + (2*(len/3)*j), z + (2*(len/3)*k), w + (2*(len/3)*l), len/3, depth-1)
                    }
                }
            }
        }
    }
}

cantor(-50, -50, -50, -50, 100, 1)
// tesseract(-50, -50, -50, -50, 100)


//=====projectors=====

function project4d(x, y, z, w){
    return [((x-playerPos[0])/(w-playerPos[3]))*screenDistancew * resizerw, 
            ((y-playerPos[1])/(w-playerPos[3]))*screenDistancew * resizerw, 
            ((z-playerPos[2])/(w-playerPos[3]))*screenDistancew * resizerw,
            null ]
}

//==========

function setup(){
    createCanvas(500,500, WEBGL);
    strokeWeight(1);
    stroke(255);
    // // noFill();
    // fill(255, 0, 255, 10);
    fill(255, 0, 0);
}

function draw(){
    background(0);
    // translate(250, 250);
    for (var a in angles){
        angles[a] += angleSpeeds[a];
    }
    for (var hyperobject in data){
        beginShape();
        for (var p in data[hyperobject]){
            data[hyperobject][p].rotate(angles[0], angles[1], angles[2], angles[3], angles[4], angles[5])
            data[hyperobject][p].draw()
        }
        endShape(CLOSE);
    }
    // debugger
    
    if(keyIsDown(16)){
        playerPos[1] += 5
    }if(keyIsDown(32)){
        playerPos[1] -= 5
    }
    
    if(keyIsDown(87)){
        playerPos[2] -= 5
    }if(keyIsDown(83)){
        playerPos[2] += 5
    }
    
    if(keyIsDown(68)){
        playerPos[0] += 5
    }if(keyIsDown(65)){
        playerPos[0] -= 5
    }

    if(keyIsDown(81)){
        playerPos[3] += 5
    }if(keyIsDown(69)){
        playerPos[3] -= 5
    }
}