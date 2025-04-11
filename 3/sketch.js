const totalFrames = 250;
let capturer;
const record = false;
let counter = 0;

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
  const a = map(percent, 0, 1, 0, 2 * PI);
  const step = 5;
  const amp = 6;
  clear();
  background('#84E0FF');

  noStroke();

  fill('#2CB244');

  rect(40, 200, 220, height);
  arc(width / 2, 200, 220, 100, PI, 2 * PI);
  rect(120, 20, 70, 200, 5, 5, 0, 0);
  stroke('#2AA240');
  rect(118, 28, 74, 30, 5, 5, 5, 5);

  noStroke();
  fill(172, 80, 172);

  beginShape();
  for (let i = 50; i <= 250; i += step) {
    angle = map(i, 50, 250, 0, PI);
    vertex(i, height / 1.7 + amp * sin(angle + a));
  }
  vertex(250, height);
  vertex(50, height);
  endShape(CLOSE);

  fill(128, 80, 128);
  beginShape();
  for (let i = 50; i <= 250; i += step) {
    angle = map(i, 50, 250, 0, PI);
    vertex(i, height / 1.7 + amp * 1.5 * sin(-angle + a));
  }
  vertex(250, height);
  vertex(50, height);
  endShape(CLOSE);

  fill(227, 227, 132, 255);
  rect(180, 300, 80, 300);
};

function setup() {
  createCanvas(300, 400);
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
