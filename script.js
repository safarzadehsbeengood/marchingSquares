var cnv;
let grid;
let rows, cols;
let w = 5;
let xoff, yoff;
let zoff = 0;
var noiseView, lineView;

function setup() {
  colorMode(HSB);
  cnv = createCanvas(windowWidth-100, windowHeight-100);
  cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
  textSize(6);
  rows = height / w;
  cols = width / w;
  grid = [];
  noiseView = createCheckbox("noise", true);
  noiseView.class("checkbox");
  noiseView.position(windowWidth/2+30);
  lineView = createCheckbox("lines", true);
  lineView.class("checkbox");
  lineView.position(windowWidth/2-30);
  for (let i = 0; i <= rows+1; i++) {
    grid[i] = [];
    for (let j = 0; j <= cols+1; j++) {
      grid[i].push(random(2));
    }
  }
  // noiseDetail(8, 0.7);
}

function getCase(grid, i, j) {
  const tl = floor(grid[i][j]) * 8;
  const tr = floor(grid[i][j+1]) * 4;
  const bl = floor(grid[i+1][j]);
  const br = floor(grid[i+1][j+1]) * 2;
  return tl + tr + bl + br;
}

function makeLine(grid, i, j) {
  const a = createVector((i*w)+w/2, (j*w));
  const b = createVector((i*w)+w, (j*w)+w/2);
  const c = createVector((i*w)+w/2, (j*w)+w);
  const d = createVector((i*w), (j*w)+w/2);
  const res = getCase(grid, j, i);
  // text(res.toFixed(2), i*w, j*w);
  const lineColor = color(map(i*w, 0, width, 0, 300), 100, 100);
  textSize(20);
  noStroke();
  fill(lineColor);
  // text(lineColor, 10, 30);
  stroke(lineColor);
  strokeWeight(1);
  switch (res) {
  case 0:
    return;
  case 1:
    line(c.x, c.y, d.x, d.y);
    break;
  case 2:
    line(c.x, c.y, b.x, b.y);
    break;
  case 3:
    line(d.x, d.y, b.x, b.y);
    break;
  case 4:
    line(a.x, a.y, b.x, b.y);
    break;
  case 5: 
    line(a.x, a.y, d.x ,d.y);
    line(b.x, b.y, c.x, c.y);
    break;
  case 6: 
    line(a.x, a.y, c.x, c.y);
    break;
  case 7: 
    line(a.x, a.y, d.x, d.y);
    break;
  case 8: 
    line(a.x, a.y, d.x, d.y);
    break;
  case 9: 
    line(a.x, a.y, c.x, c.y);
    break;
  case 10: 
    line(a.x, a.y, b.x, b.y);
    line(c.x, c.y, d.x, d.y);
    break;
  case 11: 
    line(a.x, a.y, b.x, b.y);
    break;
  case 12: 
    line(b.x, b.y ,d.x, d.y);
    break;
  case 13: 
    line(b.x, b.y, c.x, c.y);
    break;
  case 14: 
    line(c.x, c.y, d.x, d.y);
    break;
  case 15: 
    return;
  default:
    return;
  }
}

function draw() {
  background(0);
  xoff = 0;
  for (let i = 0; i <= cols; i++) {
    xoff += 0.1;
    yoff = 0;
    for (let j = 0; j <= rows; j++) {
      yoff += 0.1;
      grid[j][i] = map(noise(yoff, xoff, zoff), 0, 1, 0, 2);
      // grid[j][i] = random(0, 2);
      // text(grid[j][i].toFixed(3), i*w, j*w);
    }
  }
  zoff += 0.003;
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      if (noiseView.checked()) {
        let state = grid[j][i];
        // stroke((state-1)*-100);
        noStroke();
        fill(map(i*w, 0, width, 0, 300), 100, (state-1)*-100);
        square(i*w, j*w, w);
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (lineView.checked()) {
        makeLine(grid, i, j);
      }
    }
  }
  noFill();
  stroke(255);
  rect(0, 0, width, height);
}