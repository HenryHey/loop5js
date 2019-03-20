/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 200;
let capturer;
const record = false;
let counter = 0;
let repeat = 5;
let angInc;
const col0 = 0;
const col1 = 255;

const startRecording = () => {
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

const render = (percent) => {
  percentAngle = map(percent, 0, 1, 0, TWO_PI);
  const windowW = width * 0.9;
  const windowH = height * 0.8;
  const borderR = 20;
  const n0 = map(noise(sin(percentAngle), cos(percentAngle)), 0, 1, -10, 10);
  const n1 = map(noise(cos(percentAngle), sin(percentAngle)), 0, 1, -5, 5);
  const windowX = (width - windowW) / 2 + n0;
  const windowY = (height - windowH) / 2 + n1;
  const max = 2 * PI;
  const mappedAngle = map(percent, 0, 1, 0, max);
  angInc = (percent === 0) ? random(1 / 4000, 1 / 7000) : angInc;
  background(col1);
  fill(col0);
  rect(windowX, windowY, windowW, windowH, borderR, borderR, borderR, borderR);
  fill(col1);
  stroke(col1);
  ellipse(3 * width / 4, height / 3, 100, 100);
  const h = 150;
  const angle0 = mappedAngle;

  for (let i = 0; i < width; i += 1) {
    const a0 = abs(sin(angle0 + i * angInc));
    if (a0 < 0.001) {
      rect(i - 5, -50 + height / 2 + h * a0, 10, 2 * h);
    }
    ellipse(i, height / 2 + h * a0, 10, 10);
  }
};

function setup() {
  createCanvas(640, 640);

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
