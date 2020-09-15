const fs = require("fs");
const path = require('path');
const {remote} = require('electron');

let folder = path.join(__dirname,"sketches")
let SKETCH_PATHS = fs.readdirSync(folder).map(file=>path.join(folder,file)).filter(file => {
  var stat = fs.statSync(file);
  return !stat.isFile();
}).map(x=>path.join(x,"index.html")).sort();

var SKETCH_NAMES = SKETCH_PATHS.map(x=>x.split("sketches/")[1].split("/")[0]);

let SKETCH_IDX = 0;

let ifr_style = "overflow:hidden;pointer-events:none;position:absolute;";
let body_style = "margin:0px; overflow:hidden; background:black;";

document.body.style = body_style;

let ifr = document.getElementById("ifr");
ifr.style=ifr_style;

let lbl = document.getElementById("lbl");
let transitioning = false;




var SETTINGS = {
  SHOW_LABEL : false,
  FADE_SPEED : 32,
  TIMEOUT : 1000/*millis per sec*/ * 60 /*secs per min*/ * 3 /*mins*/,
  FRAME_X:0,
  FRAME_Y:0,
  FRAME_W:800,
  FRAME_H:600,
  FRAME_STYLE:"",
  BODY_STYLE:"",
  BG_COLOR:[0,0,0],
  START_FULLSCREEN:false,
}

function loadSettings(){
  Object.assign(SETTINGS,JSON.parse(fs.readFileSync("settings.json").toString()));
  updateStyle();
  ifr.width = SETTINGS.FRAME_W;
  ifr.height = SETTINGS.FRAME_H;
  if (SETTINGS.START_FULLSCREEN){
    var win = remote.getCurrentWindow();
    win.setFullScreen(true);
  }
}

function saveSettings(){
  fs.writeFileSync("settings.json",JSON.stringify(SETTINGS,null,2));
}

try{
  loadSettings();
}catch(e){
  console.log("no settings.json loaded.");
}

function loadSketch(){
  ifr.src=SKETCH_PATHS[SKETCH_IDX];
  ifr.onload = function(){
    ifr.contentDocument.body.style="margin:0px;overflow:hidden;";
  }
}

function setLabelText(){
  lbl.innerText = "clock by "+SKETCH_NAMES[SKETCH_IDX];
}

function nextSketch(){
  toSketch((SKETCH_IDX+1)%SKETCH_PATHS.length);
}
function prevSketch(){
  toSketch((SKETCH_PATHS.length+SKETCH_IDX-1)%SKETCH_PATHS.length);
}
function toSketch(new_idx){
  if (transitioning){
    return false;
  }
  transitioning = true;
  var n = SETTINGS.FADE_SPEED;
  var dt = 10;
  var to = 500;
  var tt = 4000;
  for (let i = 0; i < n; i++){
    setTimeout(function(){
      ifr.style.opacity = 1-(i+1)/n;
    },i*dt);
  }
  setTimeout(function(){
    SKETCH_IDX = new_idx;
    ifr.src=SKETCH_PATHS[SKETCH_IDX];
    setLabelText();
    ifr.onload = function(){
      ifr.contentDocument.body.style="margin:0px;overflow:hidden;";
      for (let i = 0; i < n; i++){
        setTimeout(function(){
          ifr.style.opacity = (i+1)/n;
        },i*dt);
      }
      if (SETTINGS.SHOW_LABEL){
        for (let i = 0; i < n; i++){
          setTimeout(function(){
            lbl.style.opacity = (i+1)/n;
          },to+i*dt);
        }
        for (let i = 0; i < n; i++){
          setTimeout(function(){
            lbl.style.opacity = 1-(i+1)/n;
          },tt+i*dt);
        }
      }
      setTimeout(function(){
        transitioning = false;
      },tt*(!!SETTINGS.SHOW_LABEL)+(n+1)*dt);
    }
  },(n+1)*dt);
  return true;
}


loadSketch();
let rto = setTimeout(runner,SETTINGS.TIMEOUT);
function runner(){
  nextSketch();
  rto = setTimeout(runner,SETTINGS.TIMEOUT);
}


function updateStyle(){
  ifr.style = ifr_style + `;left:${SETTINGS.FRAME_X}px;top:${SETTINGS.FRAME_Y}px;`+SETTINGS.FRAME_STYLE;
  document.body.style = body_style+`;background:rgb(${SETTINGS.BG_COLOR.join(",")});`+SETTINGS.BODY_STYLE;
}

var SKETCH = SKETCH_NAMES[0];
const gui = new dat.GUI();
gui.add(SETTINGS,'SHOW_LABEL');
gui.add(SETTINGS,'TIMEOUT',1000,1800000).onChange(function(value){
  clearTimeout(rto);
  rto = setTimeout(runner,TIMEOUT);
});
gui.add(SETTINGS,'FADE_SPEED',1,200);
gui.add(SETTINGS,'FRAME_X',0,screen.width).onChange(updateStyle);
gui.add(SETTINGS,'FRAME_Y',0,screen.height).onChange(updateStyle);
gui.add(SETTINGS,'FRAME_W',0,screen.width).onChange(function(value){
  ifr.width = value;
});
gui.add(SETTINGS,'FRAME_H',0,screen.height).onChange(function(value){
  ifr.height = value;
});
gui.addColor(SETTINGS,'BG_COLOR').onChange(updateStyle);
gui.add(SETTINGS,'FRAME_STYLE').onChange(updateStyle);
gui.add(SETTINGS,'BODY_STYLE').onChange(updateStyle);

gui.add(window,'SKETCH',SKETCH_NAMES).onChange(function (value){
  toSketch(SKETCH_NAMES.indexOf(value));
})

function fullscreen(){
  var win = remote.getCurrentWindow();
  win.setFullScreen(!win.isFullScreen());
}

gui.add(window,'fullscreen');
gui.add(window,'loadSettings');
gui.add(window,'saveSettings');

gui.add(window,'prevSketch');
gui.add(window,'nextSketch');

dat.GUI.toggleHide();

window.onkeydown = function(e){
  if (e.key.toLowerCase() == 'f'){
    fullscreen();
  }else if (e.keyCode == 37) {
     // left arrow
     prevSketch();
  }
  else if (e.keyCode == 39) {
     // right arrow
     nextSketch();
  }
}
