let x = [], 
  y = [], 
  a = [], 
  startingNum = 5;
let segNum = startingNum + 55;
let segLength = 55;

let dragonHead, dragonTail, dragonLegs, dragonBody, customCursor;
let onplan;
let video;
let bgMusic; // Arka plan müziği için değişken

for (let i = 0; i < segNum; i++) {
  x[i] = 0;
  y[i] = 0;
  a[i] = 0;
}

function preload() {
  dragonHead = loadImage("/kafa.png");
  dragonTail = loadImage("kuyruk.png");
  dragonLegs = loadImage("Kollar.png");
  dragonBody = loadImage("gövde.png");
  customCursor = loadImage("cursor.png");
  onplan = loadImage("onplan.png");
  video = createVideo("arkaplan.mp4");
  bgMusic = loadSound("ses.mp3"); // Arka plan müziği dosyasını yükle
}

function setup() {
  let canvasWidth = 1920; 
  let canvasHeight = 1080; 
  createCanvas(canvasWidth, canvasHeight);

  describe('G4210035 Ahmet KOSE Kodlama I - Final - MMORPG Game Login Screen');
  noCursor(); 

  video.loop();
  video.hide();

  bgMusic.loop(); // Müziği döngüye al
  bgMusic.setVolume(0.2); // Ses seviyesini %20 olarak ayarla
}

function draw() {
  image(video, 0, 0, width, height);

  dragSegment(0, mouseX, mouseY);

  for (let i = 0; i < x.length - 1; i++) {
    dragSegment(i + 1, x[i], y[i]);
  }

  tail(x[x.length - 1], y[y.length - 1], a[a.length - 1]);

  for (let i = 1; i < x.length - 1 - startingNum; i++) {
    drawBodySegment(x[x.length - 1 - i], y[y.length - 1 - i], a[a.length - 1 - i]);
    if (i == 20 || i == 70) {
      feet(x[x.length - 1 - i], y[y.length - 1 - i], a[a.length - 1 - i]);
    }
  }

  head(x[startingNum], y[startingNum], a[startingNum]);

  image(onplan, 0, 0, width, height);

  drawCustomCursor(mouseX, mouseY);
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  a[i] = angle;
}

function drawBodySegment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  scale(0.6);
  imageMode(CENTER);
  image(dragonBody, 0, 0);
  pop();
}

function head(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  scale(0.8);
  imageMode(CENTER);
  image(dragonHead, 0, 0);
  pop();
}

function feet(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  scale(0.8);
  imageMode(CENTER);
  image(dragonLegs, 0, 0);
  pop();
}

function tail(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  translate(-50, 0);
  scale(0.8);
  imageMode(CENTER);
  image(dragonTail, 0, 0);
  pop();
}

function drawCustomCursor(x, y) {
  push();
  translate(x, y);
  scale(0.4);
  imageMode(CENTER);
  image(customCursor, 0, 0);
  pop();
}
