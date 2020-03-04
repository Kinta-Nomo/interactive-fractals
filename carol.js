let angle = 0;
let color = 0;

let points = [[50,50], [-45,50], [-100, 0]];

function setup(){
    createCanvas(500,500);
    colorMode(HSB, 255);
 }

 function draw(){
    translate(250,250);
    noFill();
    background(255);

    strokeWeight(5);
    stroke(color, 255, 255);

    beginShape();
    for (var i in points){
        p = points[i];

        d = (p[0]**2 + p[1]**2)**0.5;

        console.log((p[0] < 0))
        if(p[0] > 0){
            a = Math.atan(p[1]/p[0]);
        }else if(p[0] < 0){
            a = Math.atan(p[1]/p[0]) + Math.PI;
        }

        //console.log(a)
        p[0] = Math.cos(a+0.01) * d
        p[1] = Math.sin(a+0.01) * d


        vertex(p[0],p[1])
    }
    endShape(CLOSE);

    angle += 0.1;

    if (color>255){
        color = 0;
    }
    color += 5;

 }