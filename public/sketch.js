let tiles = [];
const COLS = 7;
const ROWS = 6;
let RES = 0;
let XPADDING = 0;
let YPADDING = 0;
let COLOR;
let CURR_PLAYER = 1;

function setup() {
  createCanvas(640, 480);
  RES = width / 10;
  XPADDING = RES;
  YPADDING = RES;
  COLOR = {
    1: color(255, 0, 0),
    0: color(0, 0, 255)
  };

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let newTile = new Tile(x, y);
      tiles.push(newTile);
    }
  }

  mouseListeners.push({
    type: 'mousePressed',
    fn: function () {
      if (this.isDoubleClick) {}
      let [xpos, ypos] = cartesian2pos(mouseX, mouseY);
      let tile = Tile.getTileByPos(xpos, ypos);
      if (tile != undefined) {
        success = tile.click();
        if (success == true) {
          CURR_PLAYER = ((CURR_PLAYER + 1) % 2);
        }
        else console.log('cannot');
      }
    }
  });

  fr = createP();
}

function draw() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].render();
  }
  fr.html(frameRate());
}

function cartesian2pos(x, y) {
  let xpos = Math.floor((x - XPADDING) / RES);
  let ypos = Math.floor((y - YPADDING) / RES);
  return [xpos, ypos];
}

function pos2cartesian(xpos, ypos) {
  let x = xpos * RES + XPADDING;
  let y = ypos * RES + YPADDING;
  return [x, y];
}




// ############################
// #### UTIL: MOUSE EVENTS ####
// ############################

var doubleClickMS = 0;
var isDoubleClick = false;
var isMouseDrag = false;
mouseListeners = [];
var mousePressed = function () {
  this.isDoubleClick = (floor(millis() - doubleClickMS) <= 500 ? true : false); //for some reason this.isDoubleClick is passed to the functions without problems
  doubleClickMS = millis(); //resets doubleclick timer

  mouseEventCallHandlers('mousePressed', arguments);
  this.isMouseDrag = false;
};
var mouseClicked = function () {
  mouseEventCallHandlers('mouseClicked', arguments);
  this.isMouseDrag = false;
};
var mouseReleased = function () {
  mouseEventCallHandlers('mouseReleased', arguments);
  this.isMouseDrag = false;
};
var mouseDragged = function () {
  this.isMouseDrag = true;
  mouseEventCallHandlers('mouseDragged', arguments);
};
var mouseEventCallHandlers = function (type, arguments) {
  mouseListeners.forEach(function (elt) {
    if (elt.type == type) elt.fn.apply(this, arguments);
  });
};
