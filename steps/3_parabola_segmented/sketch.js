let parabolaCoordinates = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let focalLength = 50,
    parabolaWidth = 400,
    pointsPerParabola = 9;

  parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth, pointsPerParabola);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  drawLineFromCoordinates(parabolaCoordinates);

  fill("black");
  for (let parabolaPoint of parabolaCoordinates) {
    ellipse(parabolaPoint.x, parabolaPoint.y, 10);
  }
};

let getParabolaCoordinates = (focalLength, parabolaWidth, pointsPerParabola) => {
  let coordinates = [],
    xIncrement = parabolaWidth / (pointsPerParabola - 1);
  for (let i = 0, x = -parabolaWidth / 2; i < pointsPerParabola; i++, x += xIncrement) {
    let y = pow(x, 2) / (4 * focalLength);
    coordinates.push(createVector(x, y));
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