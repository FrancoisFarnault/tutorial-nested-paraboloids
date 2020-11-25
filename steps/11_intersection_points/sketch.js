let boundingRadius = 250;
let endPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let numberOfParabolas = 6,
    centerPadding = 50,
    sidePadding = 10;
  let valuesOfX = getValuesOfXAtParabolasEndpoints(numberOfParabolas, boundingRadius, centerPadding, sidePadding);

  endPoints = getParabolasEndPoints(valuesOfX, boundingRadius);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  ellipse(0, 0, boundingRadius * 2);
  line(-300, 0, 300, 0);
  fill("black");
  for (let endPoint of endPoints) {
    line(endPoint.x, -300, endPoint.x, 300);
    line(-endPoint.x, -300, -endPoint.x, 300);
    ellipse(endPoint.x, endPoint.y, 10);
    ellipse(-endPoint.x, endPoint.y, 10);
    ellipse(endPoint.x, -endPoint.y, 10);
    ellipse(-endPoint.x, -endPoint.y, 10);
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

let getParabolasEndPoints = (valuesOfX, boundingRadius) => {
  let parabolasEndPoints = [];
  for (let x of valuesOfX) {
    let y = sqrt(pow(boundingRadius, 2) - pow(x, 2));
    parabolasEndPoints.push(createVector(x, y));
  }
  return parabolasEndPoints;
};

doubleClicked = () => {
  save("myCanvas.png");
};