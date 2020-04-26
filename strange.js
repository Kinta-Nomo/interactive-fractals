
const dimension = 1000;

function setup(){
    createCanvas(dimension*2, dimension);
    background(0);
}

let dt = 1;
let x = 1;
let y = 1;

let a = 0.65343;
let b = 0.7345345;

let newx;
let newy;

let pointerX = a;
let pointerY = b;

let path = [];
let scaler = 80;

const speed = 1000;
let color = [255, 20, 5, 10];
let background_color = [0, 0, 0];

function draw(){
    translate(dimension/2, dimension/2)

    strokeWeight(1);
    stroke(color[0], color[1], color[2], color[3])
    for (let i = 0; i < speed; i++){
        newx = (Math.sin(x*y/b)*y + Math.cos(a*x-y)) * dt;
        newy = (x + Math.sin(y)/b) * dt;

        x = newx;
        y = newy;

        point(x*scaler, y*scaler);
    }
    
    stroke(255);
    strokeWeight(10);
    fill(0);
    rect(dimension/2, -dimension/2, dimension, dimension);


    fill(255);
    textSize(dimension*0.024);
    noStroke();
    text("a: " + String(a), dimension - dimension/2 + (dimension*0.1), -dimension/2 + (dimension*0.1));
    text("b: " + String(b), dimension - dimension/2 + (dimension*0.1), -dimension/2 + (dimension*0.125));
    
    const curserX = pointerX - dimension/2;
    const curserY = pointerY - dimension/2;

    // drwaing the crossmark
    stroke(255);
    strokeWeight(2);
    line(curserX - (dimension*0.01), curserY - (dimension*0.01), curserX + (dimension*0.01), curserY + (dimension*0.01));
    line(curserX + (dimension*0.01), curserY - (dimension*0.01), curserX - (dimension*0.01), curserY + (dimension*0.01));
    
    // drawing the cursur
    noStroke();
    
    fill(255, 0, 0);
    triangle(curserX, curserY, curserX + (dimension*0.03), curserY + (dimension*0.01), curserX + (dimension*0.01), curserY + (dimension*0.01));
    triangle(curserX, curserY, curserX + (dimension*0.01), curserY + (dimension*0.03), curserX + (dimension*0.01), curserY + (dimension*0.01));
    // ellipse(pointerX - dimension/2, pointerY - dimension/2, 20);



    if (mouseIsDown) {
        if (mouseX > dimension+(dimension*0.02)){
            pointerX = mouseX
            pointerY = mouseY
        }
    }
    // console.log(background_color);

}

let mouseIsDown = false;

function mousePressed(){
    if (mouseX > dimension+20){
        mouseIsDown = true;
    }
}

function mouseReleased(){
    if (mouseIsDown) {
        if (mouseX > dimension+20){
            a = (mouseX-dimension*1.5)/dimension*2;
            b = (mouseY-dimension/2)/dimension*2;
            
            stroke(255);
            strokeWeight(10);
            fill(background_color[0], background_color[1], background_color[2]);
            rect(-dimension/2, -dimension/2, dimension, dimension);

            background_color = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
            color = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255), 10];
            
            stroke(255);
            strokeWeight(10);
            fill(background_color[0], background_color[1], background_color[2]);
            rect(-dimension/2, -dimension/2, dimension, dimension);
        }
        mouseIsDown = false;    
    }
}
