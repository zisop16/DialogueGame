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
const CYAN = new Color(0, 200, 200);
const RED = new Color(255, 0, 0);
const DARK_RED = new Color(200, 20, 0);
const GREEN = new Color(0, 255, 0);
const BLACK = new Color(0, 0, 0);

let allClickables = [];
class Clickable {
  constructor() {
    this.click = false;
    this.clickEvaluated = false;
    this.unclick = false;
    this.unclickEvaluated = false;
    this.hover = false;
    this.hoverEvaluted = false;
    allClickables.push(this);
  }
  get Clicked() {
    if (!this.clickEvaluated) {
      this.click = this.Hovered && clicked;
      this.clickEvaluated = true;
    }
    return this.click;
  }
  get Unclicked() {
    if (!this.unlickEvaluated) {
      this.unclick = this.Hovered && unclicked;
      this.unclickEvaluated = true;
    }
    return this.unclick;
  }
  get Hovered() {
    if (!this.hoverEvaluated) {
      this.hover = this.hovered();
      this.hoverEvaluated = true;
    }
    return this.hover;
  }
  hovered() {
    throw "Must implement boolean hovered function in Clickable";
  }
  onclick() {
    // Should be implemented
  }
}
function resetClickables() {
  for (let clickable of allClickables) {
    clickable.click = false;
    clickable.clickEvaluated = false;
    clickable.unclick = false;
    clickable.unclickEvaluated = false;
    clickable.hover = false;
    clickable.hoverEvaluated = false;
  }
}

const HOVER_COLOR_MULTIPLIER = .8;
const AUTOMATIC_HEIGHT = "Automatic Height";
class TextButton extends Clickable {
  constructor(x, y, w, h, text, options) {
    super();
    // required
    if (x === undefined) {throw `TextButton was missing a required parameter: x`;}
    if (y === undefined) {throw `TextButton was missing a required parameter: y`;}
    if (w === undefined) {throw `TextButton was missing a required parameter: width`;}
    if (h === undefined) {throw `TextButton was missing a required parameter: height`;}
    if (text === undefined) {throw `TextButton was missing a required parameter: text`;}
    this.rectX = x;
    this.rectY = y;
    this.rectW = w;
    this.rectH = h;
    this.text = text;

    // options
    this.rectCR = 20;
    this.textSize = 15;
    this.textMargin = 10;
    this.textColor = CYAN;
    this.RectColor = DARK_RED;
    if (options) {
      if (options.rectCR !== undefined) {this.rectCR = options.rectCR;}
      if (options.textSize !== undefined) {this.textSize = options.textSize;}
      if (options.textMargin !== undefined) {this.textMargin = options.textMargin;}
      if (options.textColor !== undefined) {this.textColor = options.textColor;}
      if (options.rectColor !== undefined) {this.RectColor = options.rectColor;}
    }
    if (this.rectH === AUTOMATIC_HEIGHT) {
      this.rectH = this.necessaryHeight();
    }
    this.textEvaluated = false;
    this.fillColor = this.rectColor;
  }
  set RectColor(color) {
    this.rectColor = color;
    this.rectHoverColor = color.multiply(HOVER_COLOR_MULTIPLIER);
  }
  set RectW(w) {
    this.rectW = w;
    this.textEvaluated = false;
  }
  set TextMargin(size) {
    this.textMargin = size;
    this.textEvaluated = false;
  }
  set TextSize(size) {
    this.textSize = size;
    this.textEvaluated = false;
  }
  get AdjText() {
    if (!this.textEvaluated) {
      this.textEvaluated = true;
      this.adjText = adjustedText(this.text, this.rectW - this.textMargin * 2, this.textSize);
    }
    return this.adjText;
  }
  necessaryHeight() {
    let numLines = countChar(this.AdjText, "\n") + 1;
    return this.textSize * 1.5 * numLines + this.textMargin * 2;
  }
  mouseInteract() {
    if (!clickTargetFound && this.Hovered && !this.Clicked) {
      this.fillColor = this.rectHoverColor;
    }
    else {
      this.fillColor = this.rectColor;
    }
    if (!clickTargetFound && this.Unclicked) {
      this.onclick();
    }
    if (this.Hovered) {
      clickTargetFound = true;
    }
  }
  draw() {
    push();
    this.fillColor.fill();
    rect(this.rectX, this.rectY, this.rectW, this.rectH, this.rectCR);
    this.textColor.fill();
    textFont(SOFIA);
    textSize(this.textSize);
    text(this.AdjText, this.rectX, this.rectY - this.rectH / 2 + this.textMargin);
    pop();
  }
  hovered() {
    return pointInRect(this.rectX, this.rectY, this.rectW, this.rectH, {
      x: mouseX,
      y: mouseY
    });
  }
}
