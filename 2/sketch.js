/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
let y;
let ballWidth;
const totalFrames = 250;
let counter = 0;
const record = true;
const colorSky = '#29ADFF';
const colorBody = '#FFA300';
const colorWall = '#AB5236';
let capturer;
let canvas;

function setup() {
  canvas = createCanvas(300, 300);
  y = height / 1.6;
  ballWidth = 80;
  if (record) {
    capturer = new CCapture({ format: 'gif', workersPath: '../node_modules/ccapture.js/src/' });
    capturer.start();
  }
}

function draw() {
  let percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    capturer.capture(document.getElementById('defaultCanvas0'));
    if (counter === totalFrames - 1) {
      noLoop();
      capturer.stop();
      capturer.save();
    }
  }
  counter++;
}

render = (percent) => {
  const eyeWidth = ballWidth / 3;
  let x;
  let leftEyeX;
  let rightEyeX;
  noStroke();

  background(colorSky);

  a = map(percent, 0, 1, 0, 4 * PI);
  if (percent < 0.5) {
    leftEyeX = width / 2 - eyeWidth / 2;
    rightEyeX = width / 2 + 3 * eyeWidth / 2;
  } else {
    leftEyeX = width / 2 - 3 * eyeWidth / 2;
    rightEyeX = width / 2 + eyeWidth / 2;
  }

  fill(colorBody);

  const topY = y + 70 * sin(a);
  circle(width / 2, topY, ballWidth);
  rect(width / 2 - ballWidth, topY, ballWidth * 2, height / 2);
  circle(width / 2, topY, ballWidth);

  fill(255);
  circle(width / 2 - eyeWidth, topY - 20, eyeWidth);
  circle(width / 2 + eyeWidth, topY - 20, eyeWidth);

  fill(100);
  circle(leftEyeX, topY - 20, eyeWidth / 2);
  circle(rightEyeX, topY - 20, eyeWidth / 2);

  fill(colorWall);
  rect(0, height / 2, width, height / 2);
};
