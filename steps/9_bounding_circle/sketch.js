let boundingRadius = 250;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  ellipse(0, 0, boundingRadius * 2);
};

doubleClicked = () => {
  save("myCanvas.png");
};