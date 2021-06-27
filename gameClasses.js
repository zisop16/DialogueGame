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
  multiply(val) {
    return new Color(this.r * val, this.g * val, this.b * val, this.a);
  }
  toString() {
    return `${this.r}, ${this.g}, ${this.b}, ${this.a}`;
  }
}

allClickables = [];
class Clickable {
  constructor() {
    this.clicked = false;
    this.clickEvaluated = false;
    allClickables.push(this);
  }
  get Clicked() {
    if (!this.clickEvaluated) {
      this.clicked = this.hovered() && clicked;
      this.clickEvaluated = true;
    }
    return this.clicked;
  }
  hovered() {
    throw "Must implement boolean hovered function in Clickable";
  }
}
function resetClickables() {
  for (let clickable of allClickables) {
    clickable.clicked = false;
    clickable.clickEvaluated = false;
  }
}

const CYAN = new Color(0, 200, 200);
const RED = new Color(255, 0, 0);
const DARK_RED = new Color(200, 20, 0);

const HOVER_COLOR_MULTIPLIER = .9;
class TextButton extends Clickable {
  constructor() {
    super();
    this.rectX = 150;
    this.rectY = 200;
    this.rectW = 200;
    this.rectH = 200;
    this.rectCR = 20;
    this.textSize = 20;
    this.textMargin = 10;
    this.text = "the text algorithmically fits within the box using a function";
    this.textColor = CYAN;
    this.RectColor = DARK_RED;
  }
  set RectColor(color) {
    this.rectColor = color;
    this.rectHoverColor = color.multiply(HOVER_COLOR_MULTIPLIER);
  }
  onclick() {
    //Should be implemented in subclasses
  }
  draw() {
    push();
    let hovered = this.hovered();
    if (hovered) {
      this.rectHoverColor.fill();
    }
    else {
      this.rectColor.fill();
    }
    rect(this.rectX, this.rectY, this.rectW, this.rectH, this.rectCR);
    this.textColor.fill();
    textFont(SOFIA);
    textSize(this.textSize);
    textAlign(CENTER, TOP);
    let adjWidth = this.rectW - this.textMargin * 2;
    let adjText = adjustedText(this.text, adjWidth, this.textSize);
    text(adjText, this.rectX, this.rectY - this.rectH / 2 + this.textMargin);
    pop();
  }
  hovered() {
    return pointInRect(this.rectX, this.rectY, this.rectW, this.rectH, {
      x: mouseX,
      y: mouseY
    });
  }
}
