/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 10;
let capturer;
const record = false;
let counter = 0;
let repeat = 1;
const cells = 20;
const grid = new Array(cells);
let squareSize;
let color1;
let color2;
let offset;

const startRecording = () => {
  capturer = new CCapture({ format: 'gif', workersPath: '../node_modules/ccapture.js/src/' });
  capturer.start();
};

const stopRecording = () => {
  capturer.capture(document.getElementById('defaultCanvas0'));
  if (counter === totalFrames - 1) {
    if (repeat > 0) {
      repeat--;
      counter = 0;
      return;
    }
    noLoop();
    capturer.stop();
    capturer.save();
  }
};

const animateCell = (i, j, percent) => {
  fill(color2);
  const w = map(percent, 0, 1, squareSize / 2, 0);
  const h = map(percent, 0, 1, 0, squareSize);

  const x1 = i * squareSize;
  const y1 = j * squareSize;
  const x2 = i * squareSize + squareSize;
  const y2 = j * squareSize;
  const x3 = (i + 1) * squareSize + w;
  const y3 = j * squareSize + h;
  const x4 = i * squareSize - w;
  const y4 = j * squareSize + h;

  quad(x1, y1, x2, y2, x3, y3, x4, y4);
};

const drawGrid = (percent) => {
  noStroke();

  for (let i = offset; i < cells - offset; i += 2) {
    for (let j = offset; j < cells - offset; j += 2) {
      if (grid[i][j] === 0) {
        fill(color1);
        rect(i * squareSize, j * squareSize, squareSize, squareSize);
      } else if (grid[i][j] === 1) {
        animateCell(i, j, percent);
      } else {
        fill(color2);
        rect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }
};

const resetGrid = () => {
  for (let i = offset; i < cells - offset; i++) {
    if (!grid[i]) grid[i] = new Array(cells);
    for (let j = offset; j < cells - offset; j++) {
      grid[i][j] = 0;
    }
  }
};

const randomInit = () => {
  console.log('Random');
  for (let i = 0; i < 5; i++) {
    const x = int(random(2, cells / 2)) * 2;
    const y = int(random(2, cells / 2)) * 2;
    console.log(x, y);
    grid[x][y] = 1;
  }
  grid[2][2] = 2;
};

const render = (percent) => {
  drawGrid(percent);
  // animateCell(5, 5, percent);
};

function setup() {
  createCanvas(400, 400);
  color1 = 255;
  color2 = 0;
  offset = 0;
  squareSize = width / cells;

  resetGrid();

  randomInit();

  if (record) startRecording();
}

function draw() {
  const percent = (record)
    ? float(counter) / totalFrames
    : float(counter % totalFrames) / totalFrames;

  // Reset grid at the end of the loop
  if (counter % totalFrames === 0) {
    finished = true;
    for (let i = offset; i < cells - offset; i += 2) {
      for (let j = offset; j < cells - offset; j += 2) {
        if (grid[i][j] !== 2) {
          finished = false;
        }

        if (grid[i][j] === 1) {
          grid[i][j] = 2;
        }
      }
    }

    if (finished) {
      resetGrid();
      randomInit();

      color1 = 0;
      color2 = 255;
    }
    for (let i = offset + 1; i < cells - offset - 1; i += 2) {
      for (let j = offset + 1; j < cells - offset - 1; j += 2) {
        console.log('expand: ', i, j, grid[i][j]);
        if (grid[i][j] !== 2) {
          if ((i > 1 && grid[i - 2][j] === 2)
            || (j > 1 && grid[i][j - 2] === 2)
            || (i < cells - 1 && grid[i + 2][j] === 2)
            || (j < cells - 1 && grid[i][j + 2] === 2)) {
            grid[i][j] = 1;
          }
        }
      }
    }
  }

  render(percent);

  if (record) stopRecording();

  counter++;
}
