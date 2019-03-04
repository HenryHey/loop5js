/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 500;
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


function setup() {
  createCanvas(640, 640);
  if (record) startRecording();
}

const render = (percent) => {
  const pos = map(percent, 0, 1, 0, 2 * PI);
  const hue = int(map(percent, 0, 1, 0, 255));
  background(20);
  noStroke();
  const NUM_CIRCLES = 32;
  for (let i = 0; i < NUM_CIRCLES; i++) {
    const hAngle = map(i, 0, NUM_CIRCLES, 0, 2 * PI);
    const h = int(map(cos(pos), -1, 1, 0, 255));
    const c = color(`hsba(${h}, 80%, 80%, 0.2)`);
    fill(c);

    ellipse(
      width / 2 - width / 4 * sin(pos + i * PI / 4.0) * sin(hAngle),
      width / 2 - width / 4 * sin(pos + i * PI / 4.0) * cos(hAngle),
      width / 3,
    );
  }
};

function draw() {
  const percent = (record)
    ? float(counter) / totalFrames
    : float(counter % totalFrames) / totalFrames;

  render(percent);

  if (record) stopRecording();

  counter++;
}
