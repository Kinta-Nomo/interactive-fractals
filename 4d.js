
let original = [[-100, -100, -100, 100],
[100, -100, -100, 100],
[100, 100, -100, 100],
[-100, 100, -100, 100],

[-100, -100, 100, 100],
[100, -100, 100, 100],
[100, 100, 100, 100],
[-100, 100, 100, 100],

[-100, -100, -100, -100],
[100, -100, -100, -100],
[100, 100, -100, -100],
[-100, 100, -100, -100],

[-100, -100, 100, -100],
[100, -100, 100, -100],
[100, 100, 100, -100],
[-100, 100, 100, -100]];

let screenDepth = 100; //points to z
let wDepth = 100; //points to w

let rotationOrigin = [0, 0, 0];

function setup() {
    createCanvas(600, 600);
    background(0);
}

function project(value1, value2) {
    //projected point on the plane (2D)
    return (screenDepth / value2) * value1;
}

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

let axy = 0;
let axz = 0;
let axw = 0;
let ayz = 0;
let ayw = 0;
let azw = 0;

let angle = 0
function draw() {
    background(0);
    translate(300, 300);

    strokeWeight(5);
    newCoordinate = [];
    nextOriginal = [];
    for (var i in original) {

        var x = original[i][0];
        var y = original[i][1];
        var z = original[i][2];
        var W = original[i][3];

        //=====rotating in 3 axis=====

        var rot = rotation4xy(x,y,z,W, axy);
        var rot2 = rotation4xz(rot[0], rot[1], rot[2], rot[3], axz)
        var rot3 = rotation4xw(rot2[0], rot2[1], rot2[2], rot2[3], axw)
        var rot4 = rotation4yz(rot3[0], rot3[1], rot3[2], rot3[3], ayz)
        var rot5 = rotation4yw(rot4[0], rot4[1], rot4[2], rot4[3], ayw)
        var rot6 = rotation4zw(rot5[0], rot5[1], rot5[2], rot5[3], azw)
        nextOriginal.push(rot6)

        //============================

        var w = 1 / (wDepth - rot6[3]);
        var np = [[rot6[0] * w], [rot6[1] * w], [rot6[2] * w]];
        newCoordinate.push([np[0][0], np[1][0], np[2][0] + 250]);

        point(project(newCoordinate[i][0], newCoordinate[i][2]) * 100, project(newCoordinate[i][1], newCoordinate[i][2]) * 100);

    }
    // console.log(nextOriginal[0][0])
    original = nextOriginal;

    //plotting projected 3d
    // stroke(255, 0, 0);
    // for (var i in newCoordinate) {
    //     point(newCoordinate[i][0] * 100, newCoordinate[i][1] * 100);
    // }

    // for (var i in nextOriginal){
    //     p = nextOriginal[i]
    //     // console.log(((p[0])**2 + (p[1])**2 + (p[2])**2 + (p[3])**2)**0.5);
    //     nextOriginal[i] = ((p[0])**2 + (p[1])**2 + (p[2])**2 + (p[3])**2)**0.5
    //     // console.log(((p[0])**2 + (p[1])**2 + (p[2])**2 + (p[3])**2)**0.5);
    // }

    //plotting double projected 3d
    strokeWeight(2);
    stroke(0, 0, 255);
    // for (var i = 0; i < original.length; i++) {
        for (var i in newCoordinate){
            // strokeWeight(nextOriginal[i]);
            // console.log(nextOriginal[i])
            point(project(newCoordinate[i][0], newCoordinate[i][2]) * 100,
                     project(newCoordinate[i][1], newCoordinate[i][2]) * 100);
        }
        
    // }
    angle += 0.02;

}