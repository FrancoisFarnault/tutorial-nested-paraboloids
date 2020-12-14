let nestedParaboloidsCoordinates = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let number0fParaboloids = 6,
    pointsPerParabola = 9,
    numberOfRotations = 20;

  nestedParaboloidsCoordinates = getNestedParaboloidsCoordinates(number0fParaboloids, numberOfRotations, pointsPerParabola);
};

function draw() {
  for (let paraboloid of nestedParaboloidsCoordinates) {
    for (let i = 0; i < paraboloid.length - 1; i++) {
      drawTriangleStripFromTwoCurves(paraboloid[i], paraboloid[i + 1]);
    }
  }
};

let getNestedParaboloidsCoordinates = (number0fParaboloids, numberOfRotations, pointsPerParabola) => {
  let coordinates = [];
  let focalLength = 300,
    parabolaWidth = 500,
    distanceFromOrigin = 10;

  for (let i = 0; i < number0fParaboloids; i++) {
    let parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth, pointsPerParabola, distanceFromOrigin),
      paraboloidCoordinates = getSectionsOfParaboloid(parabolaCoordinates, numberOfRotations);
    coordinates.push(paraboloidCoordinates);

    focalLength -= 50;
    parabolaWidth -= 60;
    distanceFromOrigin += 20;
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

let drawTriangleStripFromTwoCurves = (coordinates1, coordinates2) => {
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < coordinates1.length; i++) {
    vertex(coordinates1[i].x, coordinates1[i].y, coordinates1[i].z);
    vertex(coordinates2[i].x, coordinates2[i].y, coordinates2[i].z);
  }
  endShape();
};