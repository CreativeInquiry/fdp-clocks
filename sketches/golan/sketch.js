// Banded Clock by Golan Levin
// Design By Numbers version, March 1999
// Processing version, February 2007
// p5.js version, September 2015

//================================================
// noprotect

var prevX = 0;
var prevY = 0;
var clickX = 0;
var clickY = 0;

var NCOLORS = 256;
var colorArray = [];
var S, M, H;
var Scolors = [];
var Mcolors = [];
var Hcolors = [];
var ys0, ys1;
var ym0, ym1;
var yh0, yh1;

var Soffset = 0;
var Hoffset = 0;
var Moffset = 0;
var Svel = 0;
var Hvel = 0;
var Mvel = 0;
var damp = 0.94;

var mil, sec, minut, hou;
var milError = 0;
var canvasWidth;
var canvasHeight;

//================================================
function setup() {

  createCanvas(800, 600);
  canvasWidth = width;
  canvasHeight = height;

  for (var i = 0; i < NCOLORS; i++) {
    colorArray[i] = color(i, i, i);
  }

  ys0 = 0;
  ys1 = canvasHeight / 3;
  ym0 = ys1 + 1;
  ym1 = canvasHeight * 2 / 3;
  yh0 = ym1 + 1;
  yh1 = canvasHeight;
}

function draw() {
  updateClock();
  drawClock();
}

//--------------------------------------------------------------------------
function updateClock() {

  findMillisError();

  mil = (millis() - milError) % 1000;
  sec = second();
  minut = minute();
  hou = hour();

  S = (sec * 1000.0 + mil) / 1000.0;
  M = (minut * 60.0 + S) / 60.0;
  H = (hou * 60.0 + M) / 60.0;
  
  Svel += 0.001*(noise(millis()/3500.0)-0.5);
  Mvel += 0.001*(noise(millis()/4700.0)-0.5);
  Hvel += 0.001*(noise(millis()/6100.0)-0.5);

  Soffset += Svel;
  Moffset += Mvel;
  Hoffset += Hvel;

  Svel *= damp;
  Mvel *= damp;
  Hvel *= damp;

  var p;
  var ps, pm, ph;
  for (var i = 0; i < canvasWidth; i++) {
    p = i / canvasWidth;
    ps = p * S + Soffset;
    pm = p * M + Moffset;
    ph = p * H + Hoffset;
    Scolors[i] = wave(GMOD(ps, 1.0));
    Mcolors[i] = wave(GMOD(pm, 1.0));
    Hcolors[i] = wave(GMOD(ph, 1.0));
  }
}

//--------------------------------------------------------------------------
function drawClock() {
  for (var x = 0; x < canvasWidth; x++) {
    stroke(colorArray[Scolors[x]]);
    line(x, ys0, x, ys1);
    stroke(colorArray[Mcolors[x]]);
    line(x, ym0, x, ym1);
    stroke(colorArray[Hcolors[x]]);
    line(x, yh0, x, yh1);
  }
}

function drawClock() {
  for (var x = 0; x < canvasWidth; x++) {
    stroke(colorArray[Scolors[x]]);
    line(x, ys0, x, ys1);
    stroke(colorArray[Mcolors[x]]);
    line(x, ym0, x, ym1);
    stroke(colorArray[Hcolors[x]]);
    line(x, yh0, x, yh1);
  }
}

//--------------------------------------------------------------------------
// Utilities

function findMillisError() {
  var sec2 = second();
  if (sec2 > sec) {
    milError = millis() % 1000;
  }
}

//------------------
function GMOD(A, B) {
  return (A - (floor(A / B) * B));
}

//------------------
function wave(a) {
  // inexpensive ramp function, 
  // but not as nice as true sine wave (below)
  var val = 0;
  var cscale = 2.0 * 255.0;
  if (a < 0.5) {
    val = round(a * cscale);
  } else {
    val = round((1.0 - a) * cscale);
  }
  return val;
}

//------------------
function sinWave(a) {
  // expensive trigonometric function, but nicer looking
  var sina = (1.0 + sin(TWO_PI * a)) * 255.0 / 2.0;
  var val = round(sina);
  return val;
}

//--------------------------------------------------------------------------
// Interaction methods

function mousePressed() {
  prevX = mouseX;
  prevY = mouseY;
  clickX = mouseX;
  clickY = mouseY;
}

function mouseDragged() {
  // Allow bands to be shifted around, for "fun"
  var accel = (prevX - mouseX) * 0.004;
  if ((clickY >= ys0) && (clickY < ys1)) {
    Svel += accel;
  } else if ((clickY >= ym0) && (clickY < ym1)) {
    Mvel += accel;
  } else if ((clickY >= yh0) && (clickY < yh1)) {
    Hvel += accel;
  }
  prevX = mouseX;
  prevY = mouseY;
}