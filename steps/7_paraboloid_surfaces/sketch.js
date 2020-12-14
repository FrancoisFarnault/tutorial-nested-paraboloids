let sectionsOfParaboloid = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let focalLength = 50,
    parabolaWidth = 400,
    pointsPerParabola = 9,
    distanceFromOrigin = 50,
    numberOfRotations = 20;
  let parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth, pointsPerParabola, distanceFromOrigin);

  sectionsOfParaboloid = getSectionsOfParaboloid(parabolaCoordinates, numberOfRotations);
};

function draw() {
  for (let i = 0; i < sectionsOfParaboloid.length - 1; i++) {
    drawTriangleStripFromTwoCurves(sectionsOfParaboloid[i], sectionsOfParaboloid[i + 1]);
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

let drawTriangleStripFromTwoCurves = (coordinates1, coordinates2) => {
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < coordinates1.length; i++) {
    vertex(coordinates1[i].x, coordinates1[i].y, coordinates1[i].z);
    vertex(coordinates2[i].x, coordinates2[i].y, coordinates2[i].z);
  }
  endShape();
};