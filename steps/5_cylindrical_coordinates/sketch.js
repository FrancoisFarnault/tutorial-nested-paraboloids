let circleCoordinates = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let point = createVector(200, 250),
    numberOfRotations = 20;

  circleCoordinates = getCylindricalCoordinates(point, numberOfRotations);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  drawLineFromCoordinates(circleCoordinates);
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