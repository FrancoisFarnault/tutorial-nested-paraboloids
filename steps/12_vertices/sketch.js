let boundingRadius = 250,
  numberOfParabolas = 6;
let endPoints = [],
  vertices = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let centerPadding = 50,
    sidePadding = 10,
    vertexInterspace = 15;
  let valuesOfX = getValuesOfXAtParabolasEndpoints(numberOfParabolas, boundingRadius, centerPadding, sidePadding);

  endPoints = getParabolasEndPoints(valuesOfX, boundingRadius);
  vertices = getParabolasVertices(numberOfParabolas, vertexInterspace);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  ellipse(0, 0, boundingRadius * 2);

  fill("black");
  for (let i = 0; i < numberOfParabolas; i++) {
    ellipse(endPoints[i].x, endPoints[i].y, 10);
    ellipse(-endPoints[i].x, endPoints[i].y, 10);
    ellipse(vertices[i].x, vertices[i].y, 10);
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

let getParabolasVertices = (numberOfParabolas, vertexInterspace) => {
  let vertices = [];
  for (let i = 1; i <= numberOfParabolas; i++) {
    let y = vertexInterspace * i;
    vertices.push(createVector(0, y));
  }
  return vertices;
};

doubleClicked = () => {
  save("myCanvas.png");
};