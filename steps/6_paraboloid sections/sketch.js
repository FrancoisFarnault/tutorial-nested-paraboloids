let parabolaCoordinates = [],
  sectionsOfParaboloid = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let focalLength = 50,
    parabolaWidth = 400,
    pointsPerParabola = 9,
    distanceFromOrigin = 50,
    numberOfRotations = 20;

  parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth, pointsPerParabola, distanceFromOrigin);
  sectionsOfParaboloid = getSectionsOfParaboloid(parabolaCoordinates, numberOfRotations);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  drawLineFromCoordinates(parabolaCoordinates);

  for (let section of sectionsOfParaboloid) {
    drawLineFromCoordinates(section);
  }
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

let drawLineFromCoordinates = (coordinates) => {
  beginShape();
  for (let point of coordinates) {
    vertex(point.x, point.y, point.z);
  }
  endShape();
};

doubleClicked = () => {
  save("myCanvas.png");
};