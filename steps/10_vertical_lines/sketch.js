let boundingRadius = 250;
let valuesOfX = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let numberOfParabolas = 6,
    centerPadding = 50,
    sidePadding = 10;

  valuesOfX = getValuesOfXAtParabolasEndpoints(numberOfParabolas, boundingRadius, centerPadding, sidePadding);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  ellipse(0, 0, boundingRadius * 2);

  for (let x of valuesOfX) {
    line(x, -300, x, 300);
    line(-x, -300, -x, 300);
  }
};

let getValuesOfXAtParabolasEndpoints = (numberOfParabolas, boundingRadius, centerPadding, sidePadding) => {
  let valuesOfX = [],
    xInterspace = (boundingRadius - centerPadding - sidePadding) / (numberOfParabolas - 1);
  for (let i = 0; i < numberOfParabolas; i++) {
    valuesOfX.push(centerPadding + xInterspace * i);
  }
  return valuesOfX;
};

doubleClicked = () => {
  save("myCanvas.png");
};