/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 100;
let capturer;
const record = false;
let counter = 0;
let repeat = 1;

const startRecording = () => {
  // capturer = new CCapture({ format: 'gif', workersPath: '../node_modules/ccapture.js/src/' });
  capturer = new CCapture({ format: 'webm' });
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

const drawSquare = (x, y, pos, angle) => {
  resetMatrix();
  // translate(x + pos, y);
  translate(x, y);
  rotate(angle);
  rect(0, 0, width / 2, height / 2);
};

const render = (percent) => {
  if (percent < 0.5) {
    const angle = map(percent, 0, 0.5, PI, 3 * PI / 2);
    const pos = map(percent, 0, 0.5, 0, width);
    background(255);
    noStroke();
    fill(0);

    drawSquare(0, height, pos, angle);
    drawSquare(width / 2, height / 2, pos, angle);
    drawSquare(width, height, pos, angle);
  } else {
    const angle = map(percent, 0.5, 1, PI, 3 * PI / 2);
    const pos = map(percent, 0.5, 1, 0, width);
    background(0);
    noStroke();
    fill(255);

    drawSquare(width, height, pos, angle);
    drawSquare(width / 2, height / 2, pos, angle);
    drawSquare(0, height, pos, angle);
  }
};

function setup() {
  createCanvas(300, 300);

  if (record) startRecording();
}

function draw() {
  const percent = (record)
    ? float(counter) / totalFrames
    : float(counter % totalFrames) / totalFrames;

  render(percent);

  if (record) stopRecording();

  counter++;
}
