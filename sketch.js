let SOFIA;
let CANVAS;
let testRect;

function setup() {
  // Width and Height variables are automatically initialized
  // let width = 500;
  // let height = 500;

  CANVAS = createCanvas(1000, 800);
  CANVAS.parent("#GameBorder");
  SOFIA = loadFont('fonts/Sofia-Regular.otf');
  testRect = new TextButton();
  rectMode(CENTER);
}

function draw() {
  background(50, 50, 50);

  fill(255, 255, 0);
  textFont(SOFIA);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("hi", 300, 100);

  testRect.draw();

  fill(255, 255, 0);
  rect(50, 50, 50, 50);
}
