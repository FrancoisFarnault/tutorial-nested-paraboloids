let boundingRadius = 250,
  numberOfParabolas = 6;
let endpoints = [],
  vertices = [],
  nestedParabolasCoordinates = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let centerPadding = 50,
    sidePadding = 10,
    vertexInterspace = 15,
    pointsPerParabola = 9;
  let valuesOfX = getValuesOfXAtParabolasEndpoints(numberOfParabolas, boundingRadius, centerPadding, sidePadding);

  endPoints = getParabolasEndPoints(valuesOfX, boundingRadius);
  vertices = getParabolasVertices(numberOfParabolas, vertexInterspace);
  nestedParabolasCoordinates = getNestedParabolasCoordinates(numberOfParabolas, endPoints, pointsPerParabola, vertices);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  for (let parabolaCoordinates of nestedParabolasCoordinates) {
    drawLineFromCoordinates(parabolaCoordinates);
  }

  // ellipse(0, 0, boundingRadius * 2);

  // fill("black");
  // for (let i = 0; i < numberOfParabolas; i++) {
  //   ellipse(endPoints[i].x, endPoints[i].y, 10);
  //   ellipse(-endPoints[i].x, endPoints[i].y, 10);
  //   ellipse(vertices[i].x, vertices[i].y, 10);
  // }
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

let getNestedParabolasCoordinates = (numberOfParabolas, endPoints, pointsPerParabola, vertices) => {
  vertices.reverse();
  let coordinates = [];
  for (let i = 0; i < numberOfParabolas; i++) {
    let distanceFromOrigin = vertices[i].y,
      focalLength = getFocalLengthFromPointAndDistanceFromOrigin(endPoints[i], distanceFromOrigin),
      parabolaWidth = endPoints[i].x * 2;
    let parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth, pointsPerParabola, distanceFromOrigin);
    coordinates.push(parabolaCoordinates);
  }
  return coordinates;
};

let getParabolaCoordinates = (focalLength, parabolaWidth, pointsPerParabola, distanceFromOrigin) => {
  let coordinates = [],
    xIncrement = parabolaWidth / (pointsPerParabola - 1);
  for (let i = 0, x = -parabolaWidth / 2; i < pointsPerParabola; i++, x += xIncrement) {
    let y = pow(x, 2) / (4 * focalLength) + distanceFromOrigin;
    coordinates.push(createVector(x, y));
  }
  return coordinates;
};

let getFocalLengthFromPointAndDistanceFromOrigin = (point, distanceFromOrigin) => {
  return -pow(point.x, 2) / (4 * (distanceFromOrigin - point.y));
};

let drawLineFromCoordinates = (coordinates) => {
  beginShape();
  for (let point of coordinates) {
    vertex(point.x, point.y);
  }
  endShape();
};

doubleClicked = () => {
  save("myCanvas.png");
};