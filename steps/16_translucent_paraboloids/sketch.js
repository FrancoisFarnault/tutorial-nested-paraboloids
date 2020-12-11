let nestedParaboloidCoordinates = [],
  gradient = [],
  rotationSpeed = 0.005,
  angle = 0;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.drawingContext.disable(canvas.drawingContext.DEPTH_TEST);
  // https://github.com/processing/p5.js/issues/3736
  blendMode(MULTIPLY);

  let boundingRadius = 250,
    numberOfParabolas = 6,
    centerPadding = 50,
    sidePadding = 10,
    vertexInterspace = 15,
    pointsPerParabola = 30,
    numberOfRotations = 30;
  let valuesOfX = getValuesOfXAtParabolasEndpoints(numberOfParabolas, boundingRadius, centerPadding, sidePadding),
    endPoints = getParabolasEndPoints(valuesOfX, boundingRadius),
    vertices = getParabolasVertices(numberOfParabolas, vertexInterspace);
  let nestedParabolasCoordinates = getNestedParabolasCoordinates(numberOfParabolas, endPoints, pointsPerParabola, vertices);

  nestedParaboloidCoordinates = getNestedParaboloidCoordinates(nestedParabolasCoordinates, numberOfRotations);

  let firstColor = color(100, 150, 230, 0),
    lastColor = color(235, 235, 250, 0),
    numberOfColors = numberOfParabolas,
    transitionSpeed = 2.5;

  gradient = getInterpolatedColors(firstColor, lastColor, numberOfColors, transitionSpeed);
};

function draw() {
  angle += rotationSpeed;
  rotateX(angle);
  rotateZ(angle * 0.1);

  background("white");
  noStroke();

  for (let i = 0; i < nestedParaboloidCoordinates.length; i++) {

    let paraboloidSections = nestedParaboloidCoordinates[i];

    for (let j = 0; j < paraboloidSections.length - 1; j++) {
      fill(gradient[i]);
      drawTriangleStripFromTwoCurves(paraboloidSections[j], paraboloidSections[j + 1]);
    }
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

let getNestedParabolasCoordinates = (numberOfParabolas, endPoints, pointsPerParabola, vertices) => {
  endPoints.reverse();
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

let getNestedParaboloidCoordinates = (nestedParabolasCoordinates, numberOfRotations) => {
  let coordinates = [];
  for (let parabolaCoordinates of nestedParabolasCoordinates) {
    let paraboloidCoordinates = getSectionsOfParaboloid(parabolaCoordinates, numberOfRotations);
    coordinates.push(paraboloidCoordinates);
  }
  return coordinates;
};

let getSectionsOfParaboloid = (parabolaCoordinates, numberOfRotations) => {
  let sections = [];
  for (let point of parabolaCoordinates) {
    let section = getCylindricalCoordinates(point, numberOfRotations);
    sections.push(section);
  }
  return sections;
};

let getCylindricalCoordinates = (point, numberOfRotations) => {
  let coordinates = [],
    x = point.x,
    radius = point.y,
    angleIncrement = TWO_PI / numberOfRotations;
  for (let i = angularPosition = 0; i <= numberOfRotations; i++, angularPosition += angleIncrement) {
    let y = radius * cos(angularPosition),
      z = radius * sin(angularPosition);
    coordinates.push(createVector(x, y, z));
  }
  return coordinates;
};

let getInterpolatedColors = (firstColor, lastColor, numberOfColors, transitionSpeed) => {
  let gradient = [];
  for (let i = 0; i < numberOfColors; i++) {

    let interpolationFactor = ((Math.pow(i, 1 / transitionSpeed) * 100 / (Math.pow(numberOfColors - 1, 1 / transitionSpeed))) / 100);
    interpolationFactor.toFixed(2);

    let intermediateColor = lerpColor(firstColor, lastColor, interpolationFactor);
    gradient.push(intermediateColor);
  }
  return gradient;
};

let drawTriangleStripFromTwoCurves = (coordinates1, coordinates2) => {
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < coordinates1.length; i++) {
    vertex(coordinates1[i].x, coordinates1[i].y, coordinates1[i].z);
    vertex(coordinates2[i].x, coordinates2[i].y, coordinates2[i].z);
  }
  endShape();
};

doubleClicked = () => {
  save("myCanvas.png");
};