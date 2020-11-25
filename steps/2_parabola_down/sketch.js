let parabolaCoordinates = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let focalLength = 50,
    parabolaWidth = 400;

  parabolaCoordinates = getParabolaCoordinates(focalLength, parabolaWidth);
};

function draw() {
  noFill();
  strokeWeight(1.5);
  drawLineFromCoordinates(parabolaCoordinates);
};

let getParabolaCoordinates = (focalLength, parabolaWidth) => {
  let coordinates = [];
  for (let x = -parabolaWidth / 2; x <= parabolaWidth / 2; x++) {
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

doubleClicked = () => {
  save("myCanvas.png");
};