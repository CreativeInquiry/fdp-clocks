//tale
//9/16/2020 Abstract Clock

let w = 50;
let angle = 0;
let offset = 0;
let hu = 0.0;
let hue = 0.0;
let down = false;
let bgb = (0, 10, 0);
let bgw = "white";
let bg;
let nbg;
let change = 0.01;

function colorBox(even) {
  if (!even) {
    fill(nbg);
    stroke(bg);
  } else {
    stroke(nbg);
    if (down) hu -= change;
    else hu += change;
    fill(hu, 200, 255);
    if (hu >= 255 || hu <= 0) {
      down = !down;
    }
  }
}

function noColor(bgcolor) {
  fill(bgcolor);
  stroke(bgcolor);
}

function createBox(x, y) {
  push();
  translate(0, y, 0);
  translate(x, 0, 0);
  rotateY(millis() * 0.0001 + offset);
  box(w);
  pop();
  offset += 0.0005;
}

function createTop(x,y) {
  push();
  translate(x, 0, 0);
  rotateX(-1 * frameCount * y);
  box(w);
  pop();
}

function setup() {
  createCanvas(800, 600, WEBGL);
  colorMode(HSB);

}

function draw() {
  if(hour()>=8&&hour()<=17){
    bg = bgw;
    nbg = bgb;
  }else {
    bg = bgb;
    nbg = bgw;
  }
  background(bg);
  stroke(nbg);
  strokeWeight(3);

  //div bar 
  push();
  fill(nbg);
  translate(-width / 2-5, -95);
  rect(0, 0, width+10, 20);
  pop();

  //white dot
  push();
  fill(bg);
  noStroke();
  translate(300, -85);
  ellipse(0, 0, 10, 10);
  translate(-360, 0);
  ellipse(0, 0, 10, 10);
  pop();

  //bottom
  push();
  //1
  translate(-300, 70, 0);
  var even = false;
  let a = angle + offset;
  // a 
  if (Math.floor(hour() / 10) == 0) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(0, -100);
  }

  //b
  if (hour() % 5 == 0) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, -100);
  }

  //c
  if (Math.floor(minute() / 10) == 0 || Math.floor(minute() / 10) == 5) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, -100);
  }

  //d
  if (minute() % 5 == 0) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, -100);
  }

  //e
  if (Math.floor(second() / 10) == 0 || Math.floor(second() / 10) == 5) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, -100);
  }

  //f
  if (second() % 5 == 0) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, -100);
  }


  //2
  //a
  if (Math.floor(hour() / 10) == 2) {
    colorBox(even);
    createBox(0, -50);
  }

  //b
  if (hour() % 5 == 0 || hour() % 5 == 1) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, -50);
  }

  //c
  if (Math.floor(minute() / 10) == 0 || Math.floor(minute() / 10) == 1 ||
    Math.floor(minute() / 10) == 5) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, -50);
  }

  //d
  if (minute() % 5 == 0 || minute() % 5 == 1) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, -50);
  }

  //e
  if (Math.floor(second() / 10) == 0 || Math.floor(second() / 10) == 1 ||
    Math.floor(second() / 10) == 5) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, -50);
  }

  //f
  if (second() % 5 == 0 || second() % 5 == 1) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, -50);
  }



  //3

  //b
  if (hour() % 5 == 1 || hour() % 5 == 2) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, 0);
  }

  //c
  if (Math.floor(minute() / 10) == 1 || Math.floor(minute() / 10) == 2) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, 0);
  }

  //d
  if (minute() % 5 == 1 || minute() % 5 == 2) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, 0);
  }

  //e
  if (Math.floor(second() / 10) == 1 || Math.floor(second() / 10) == 2) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, 0);
  }

  //f
  if (second() % 5 == 1 || second() % 5 == 2) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, 0);
  }


  //4

  //b
  if (Math.floor(hour() / 10) == 2 || Math.floor(hour() / 10) == 3) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, 50);
  }

  //c
  if (Math.floor(minute() / 10) == 2 || Math.floor(minute() / 10) == 3) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, 50);
  }

  //d
  if (minute() % 5 == 2 || minute() % 5 == 3) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, 50);
  }

  //e
  if (Math.floor(second() / 10) == 2 || Math.floor(second() / 10) == 3) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, 50);
  }

  //f
  if (second() % 5 == 2 || second() % 5 == 3) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, 50);
  }

  //5
  // a 
  if (Math.floor(hour() / 10) == 0) {
    colorBox(even);
    createBox(0, 100);
  }

  //b
  if (hour() % 5 == 3 || hour() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, 100);
  }

  //c
  if (Math.floor(minute() / 10) == 3 || Math.floor(minute() / 10) == 4) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, 100);
  }

  //d
  if (minute() % 5 == 3 || minute() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, 100);
  }

  //e
  if (Math.floor(second() / 10) == 3 || Math.floor(second() / 10) == 4) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, 100);
  }

  //f
  if (second() % 5 == 3 || second() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, 100);
  }


  //6
  // a 
  if (Math.floor(hour() / 10) == 0 || Math.floor(hour() / 10) == 1) {
    colorBox(even);
    createBox(0, 150);
  }

  //b
  if (hour() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(120, 150);
  }

  //c
  if (Math.floor(minute() / 10) == 4) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(240, 150);
  }

  //d
  if (minute() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(360, 150);
  }

  //e
  if (Math.floor(second() / 10) == 4) {
    noColor(bgb);
  } else {
    colorBox(even);
    createBox(480, 150);
  }

  //f
  if (second() % 5 == 4) {
    noColor(bgb);
  } else {
    colorBox(!even);
    createBox(600, 150);
  }





  //top
  //a
  translate(0, -300, 0);
  push();
  stroke(nbg);
  if (down) hue -= 0.1;
  else hue += 0.1;
  fill(200 - hue, 200, 100);
  if (hue >= 255 || hue <= 0) {
    down = !down;
  }
  createTop(0,0.01);
  pop();

  
  //b
  push();
     fill(nbg);
    stroke(bg);
  if(hour()%10>=5) translate(0,80,0);
  createTop(120,0.03);
  pop();


  //c
  push();
  stroke(nbg);
  if (down) hue -= 0.1;
  else hue += 0.1;
  fill(200 - hue, 200, 70);
  if (hue >= 255 || hue <= 0) {
    down = !down;
  }
  if(minute()>=50) translate(0,80,0);
  createTop(240,0.05);
  pop();

  
  //d
  push();
    fill(nbg);
    stroke(bg);
  if(minute()%10>=5) translate(0,80,0);
  createTop(360,0.07);
  pop();

  
  //e
  push();
  stroke(nbg);
  if (down) hue -= 0.1;
  else hue += 0.1;
  fill(200 - hue, 200, 50);
  if (hue >= 255 || hue <= 0) {
    down = !down;
  }
  if(second()>=50) translate(0,80,0);
  createTop(480,0.09);
  pop();

  
  //f
  push();
    fill(nbg);
    stroke(bg);
  if(second()%10>=5) translate(0,80,0);
  createTop(600,0.1);
  pop();


}