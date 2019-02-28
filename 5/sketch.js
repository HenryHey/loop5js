/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 120;
let capturer;
const record = false;
let counter = 0;
let repeat = 10;
let x;
let y;
let maxBallSize;

const startRecording = () => {
  capturer = new CCapture({ format: 'webm', frameRate: 30 });
  capturer.start();
};

const stopRecording = () => {
  capturer.capture(document.getElementById('defaultCanvas0'));
  if (counter === totalFrames - 1) {
    if (repeat > 0) {
      repeat--;
      counter = 0;
      x = random(maxBallSize, width - maxBallSize);
      y = random(height / 4, height - height / 4);
      return;
    }
    noLoop();
    capturer.stop();
    capturer.save();
  }
};

const ballCycle = (x0, y0, percent) => {
  const angle = map(percent, 0, 1, 0, 2 * PI);
  let ellipseW = 0;
  const ballSize = map(y0, height / 4, height - height / 4, 5, maxBallSize);
  const holeW = ballSize * 1.5;

  if (percent <= 0.1) {
    ellipseW = map(percent, 0, 0.1, 0, holeW);
  }
  if (percent > 0.1 && percent <= 0.5) {
    ellipseW = holeW;
  }
  if (percent > 0.5 && percent < 0.55) {
    ellipseW = map(percent, 0.5, 0.55, holeW, 0);
  }

  // const ellipseFactor = map(y0, height / 4, height - height / 4, 0.8, 2);
  // ellipseW *= ellipseFactor;
  // ellipseW *= 1.2;

  const heightFactor = map(y0, height / 4, height - height / 4, 1, 2);
  background(255);
  noStroke();

  fill(0);
  if (percent < 0.5) {
    let xDef = 1;
    if (percent < 0.25) {
      xDef = map(percent, 0, 0.25, 0.8, 1.1);
      yDef = map(percent, 0, 0.25, 1.2, 0.8);
    } else {
      xDef = map(percent, 0.25, 0.5, 1.1, 0.8);
      yDef = map(percent, 0.25, 0.5, 0.8, 1.2);
    }
    ellipse(x0, y0 + height / 4 * heightFactor * sin(-angle), ballSize * xDef, ballSize * yDef);
  }


  fill(0);
  if (ellipseW > 0.05) {
    const ellipseH = ellipseW / 6;
    ellipse(x0, y0, ellipseW, ellipseH);
    if (percent > 0.4) {
      fill(255);
      rect(x0 - ellipseW / 2, y0 + ellipseH / 2, ellipseW, ellipseW);
    }
  }
};

const render = (percent) => {
  if (percent === 0) {
    x = random(maxBallSize, width - maxBallSize);
    y = random(height / 4, height - height / 4);
  }

  const halfPerc = map(percent, 0, 1, 0, 0.6);
  ballCycle(x, y, halfPerc);
};

function setup() {
  createCanvas(640, 640);

  maxBallSize = width / 4;
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
