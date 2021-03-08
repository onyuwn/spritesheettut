var anim1 = new Image();
anim1.src = "sloppy1sheet.png";

var anim2 = new Image();
anim2.src = "rainsheet.png";

function startGame()
{
  gameArea.start(); //initializes reference to canvas in the html
  rainArea.start();
}

var gameArea = {
  canvas : document.getElementById("game"), //find element in html to reference in js
  start : function() {
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.context = this.canvas.getContext("2d"); //access drawing functions from context
    this.frameNo = 0;
    this.interval = setInterval(gameUpdate, 50); // approx 50fps-- calls gameUpdate method every 20ms
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); //white game background
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear every frame
  },
}

var rainArea = {
  canvas : document.getElementById("game2"), //find element in html to reference in js
  start : function() {
    this.canvas.width = 960;
    this.canvas.height = 540;
    this.context = this.canvas.getContext("2d"); //access drawing functions from context
    this.frameNo = 0;
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear every frame
  },
}

var frameX = 0;
var frameY = 0;
var frame = 0;
var isRaining = false;

function gameUpdate()
{
  gameArea.clear();
  frame++;
  gameArea.context.drawImage(anim1, frame * 450, 0, 450, 450, 0,0, 450,450);
  if(frame > 9)
  {
    frame = 0;
  }

  if(isRaining == true)
  {
    rainAnim();
  }
}

var canvasPos = getPosition(rainArea.canvas);
var mouseX = 0;
var mouseY = 0;

function rain(e)
{
  setMousePosition(e);
  isRaining = true;
  console.log(mouseX);
  console.log(mouseY);
}

function rainAnim()
{
  rainArea.clear();
  if(frameX == 4)
  {
    frameY++;
    frameX = 0;
  }
  frameX++;
  rainArea.context.drawImage(anim2, frameX * 450, frameY * 540, 450, 540, mouseX-100, mouseY, 225, 270);

  if(frameY * frameX == 24)
  {
    frameY = 0;
    frameX = 0;
    isRaining = false;
  }
  console.log("rain");
}

rainArea.canvas.addEventListener("click", rain, false);
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}
