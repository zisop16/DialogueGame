class Color {
  constructor(r, g, b, a) {
    this.a = a == null ? 255 : a;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  fill() {
    fill(this.r, this.g, this.b, this.a);
  }
}

class TextButton {
  constructor() {
    this.rectX = 100;
    this.rectY = 200;
    this.rectW = 100;
    this.rectH = 100;
    this.rectCR = 20;
    this.textSize = 20;
    this.textMargin = 10;
    this.text = "hi whats up\nmy broski";
    this.textColor = CYAN;
    this.rectColor = RED;
  }
  draw() {
    push();
    this.rectColor.fill();
    rect(this.rectX, this.rectY, this.rectW, this.rectH, this.rectCR);
    this.textColor.fill();
    textFont(SOFIA);
    textSize(this.textSize);
    textAlign(CENTER, TOP);
    text(this.text, this.rectX, this.rectY - this.rectH / 2 + this.textMargin);
    pop();
  }
}

const CYAN = new Color(0, 200, 200);
const RED = new Color(255, 0, 0);
