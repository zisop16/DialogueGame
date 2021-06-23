let SOFIA;
let CANVAS;
let testRect;

let LOGINBUTTON;
let shouldLogin = false;

function setup() {
  // Width and Height variables are automatically initialized
  // let width = 1000;
  // let height = 800;

  CANVAS = createCanvas(1000, 800);
  CANVAS.parent("#GameBorder");
  SOFIA = loadFont('fonts/Sofia-Regular.otf');
  testRect = new TextButton();
  rectMode(CENTER);

  LOGINBUTTON = document.querySelector("#LoginButton");
  LOGINBUTTON.onclick = () => {
    shouldLogin = true;
  };
}

function draw() {
  if (shouldLogin) {
    login();
    shouldLogin = false;
  }
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
