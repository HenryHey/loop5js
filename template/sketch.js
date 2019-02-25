/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const totalFrames = 250;
let capturer;
const record = false;

const startRecording = () => {
  capturer = new CCapture({ format: 'gif', workersPath: '../node_modules/ccapture.js/src/' });
  capturer.start();
};

const stopRecording = () => {
  capturer.capture(document.getElementById('defaultCanvas0'));
  if (counter === totalFrames - 1) {
    noLoop();
    capturer.stop();
    capturer.save();
  }
};

const render = (percent) => {

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
