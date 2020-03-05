//semicollon, indentation difference from repl, optimization*



var range = 200;
var iteration = 50;
var zoom = 100
var centerx = 0
var centery = 0

var picture = []
for (var i = 0; i<range*2; i++){
  picture.push([])
  for (var j = 0; j<range*2; j++){
    picture[i].push(0);
  }
}

function setup(){
  createCanvas(500,500);
  background(240);
  strokeWeight(3);
  colorMode(HSB);
  drawMandelbrot(0, 0);
  updateMandelbrot();
}

//page responce==================================
function switchFractal(index){
    background(240);
    currentFractal = fractals[index];
    zoom = 100
    centerx = 0
    centery = 0
    drawMandelbrot(0, 0);
    updateMandelbrot();
}


function changeC(index){
    background(240);
    currentFractal = fractals[index];
    zoom = 100
    centerx = 0
    centery = 0
    drawMandelbrot(0, 0);
}


//fractal functions ==================================================


function mandelbrot(cr, ci, zr, zi, iterations){
    zr = cr
    zi = ci
    for (var i = 0; i<iterations; i++){
      newzr = zr**2 - zi**2 + cr
      newzi = 2*zr*zi + ci
      zr = newzr
      zi = newzi
      if (zr**2 + zi**2 > 4){
        return color(i*9,255,255)
      }
    }
    return color(0, 0, 0)
}

  
var julia_cr = -0.79;
var julia_ci = 0.15;

function julia(cr, ci, zr, zi, iterations){
  zr = cr;
  zi = ci;
  for (var i = 0; i<iterations; i++){
    newzr = zr**2 - zi**2 + julia_cr
    newzi = 2*zr*zi + julia_ci
    zr = newzr
    zi = newzi
    if ((zr**2 + zi**2)**0.5 > 2){
      return color(i*9,255,255)
    }
  }
  return color(0, 0, 0)
}

function sunken(cr, ci, zr, zi, iterations){
  zr = cr
  zi = ci
  for (var i = 0; i<iterations; i++){
    zr = Math.abs(zr);
    zi = Math.abs(zi);
    newzr = zr**2 - zi**2 + cr
    newzi = 2*zr*zi + ci
    zr = newzr
    zi = newzi
    if ((zr**2 + zi**2)**0.5 > 2){
      return color(i*9,255,255)
    }
  }
  return color(0, 0, 0)
}

var fractals = [mandelbrot, julia, sunken];
var currentFractal = fractals[0];

//====================================================================



function drawMandelbrot(x, y){
  for (var i = -range; i < range; i++){
    for (var j = -range; j < range; j++){
      colour = currentFractal(x + (i)/zoom, y + (j)/zoom, 0, 0, iteration)
      picture[i+range][j+range] = colour
      //stroke(color[0], color[1], color[2]);
      //point(i, j)
      //set(i+250, j+250, colour);
    }
  }
  //updatePixels();
}

function updateMandelbrot(){
  for (var i = 0; i < range*2; i++){
    for (var j = 0; j < range*2; j++){
        set(i + 50, j + 50, picture[i][j]);
    }
  }
  updatePixels();
  //console.log("ran")
}


function draw(){
  if (isDown){
    for (var i = 0; i < range*2; i++){
      for (var j = 0; j < range*2; j++){
        set(i+50, j+50, picture[i][j]);
      }
    }
    updatePixels();
    //console.log("ran")
  }
} 


function mouseDragged(){
  difference = [mouseX-prevPos[0], mouseY-prevPos[1]];
  centerx -= difference[0]/zoom;

  if (difference[0] > 0){
    picture = picture.slice(0, (range*2)-difference[0]);

    //for newly generated points, calculate for all
    for (i = 0; i<difference[0]; i++){
      picture.splice(i,0,[])
      for (j = -range; j<range; j++){
        picture[i].push(currentFractal(centerx + (i-200)/zoom, centery + (j)/zoom, 0, 0, iteration))
      }
    }
  }else if (difference[0] < 0){

    picture = picture.slice(-difference[0], range*2)
    
    //for newly generated points, calculate for all
    for (i = 0; i>difference[0]; i--){
      picture.splice(picture.length+i,0,[]);
      for (j = -range; j<range; j++){
        picture[picture.length-1+i].push(currentFractal(centerx + (i+200)/zoom, centery + (j)/zoom, 0, 0, iteration))
      }
    }
  }


  prevPos = [mouseX, mouseY];
  
}

isDown = 0
prevPos = []
innitialPos = []

function mousePressed(){
  prevPos = [mouseX, mouseY];
  innitialPos = [mouseX, mouseY];
  isDown = true
}

function mouseReleased(){
  isDown = false
  // console.log(13)
  // //zoom*=2
  // //translate(250,250)  
  // drawMandelbrot(mouseX-width/2, mouseY-height/2);
}


function mouseWheel(event) {
  if (event.delta > 0){
    zoom /= 1.1
    drawMandelbrot(centerx, centery);
    updateMandelbrot();
  }else if(event.delta < 0){
    zoom *= 1.1
    drawMandelbrot(centerx, centery);
    updateMandelbrot();
  }
}