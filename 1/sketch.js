let y, inc, ballWidth;
let maxX, minX;
const totalFrames = 150;
let counter = 0;
const record = true;

function setup() {
  createCanvas(400, 200);
	x = width/2;
	y = height/2;
	inc = 2;
	ballWidth = 50
	maxX = width - ballWidth*1.2;
	minX = ballWidth*1.2;
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
    save("output/gif-" + nf(counter, 3) + ".png");
    if (counter == totalFrames - 1) {
      noLoop();
    }
  }
  counter++;
}

render = (percent) => {
  let x;
  if (percent < 0.5) {
    x = map(percent, 0, 0.5, minX, maxX);
  } else {
    x = map(percent, 0.5, 1, maxX, minX);
  }
  clear();
	noStroke();
	
	fill(128);
  const shadowX = map(x, minX, maxX, -10, 10); 
	circle(x+shadowX,y+10,ballWidth);
	
	fill(140,200,140);
	circle(x,y,ballWidth);
}