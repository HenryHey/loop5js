/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 500;
let capturer;
const record = false;
let counter = 0;
let repeat = 1;

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
  const angle = map(percent, 0, 1, 0, TWO_PI);
  background(250);
  noStroke();

  const row = 60;
  const size = width / 20;

  for (let i = 0; i < row - 5; i++) {
    const angleI = map(i, 0, row, 0, TWO_PI);
    for (let j = 0; j < row - 5; j++) {
      const angleJ = map(j, 0, row, 0, TWO_PI);
      fill(10 * (sin(-angle + angleJ) + cos(-angle + angleI)));

      ellipse(
        i * width / row + size,
        j * height / row + size,
        5 + size * (sin(-angle + angleJ) + cos(-angle + angleI)),
      );
    }
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
