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

function adjustedText(initialText, width, fontSize) {
  if (fontSize * 1.5 > width) {
    throw `Font size: ${fontSize} too big for width: ${width}`
  }
  if (initialText === "") {return "";}
  push();
  textSize(fontSize);
  let newText = "";
  let lines = [""];
  let lineInd = 0;
  let shouldContinue = true;
  while (shouldContinue) {
    let wordInd = initialText.indexOf(' ');
    if (wordInd == -1) {
      wordInd = initialText.length;
      shouldContinue = false;
    }
    let currentWord = initialText.substring(0, wordInd);
    initialText = initialText.substring(wordInd + 1, initialText.length);
    if (textWidth(currentWord) > width) {
      let nextLine = "";
      let addRemaining = true;
      for (let i = 0; i < currentWord.length; i++) {
        let test = nextLine;
        test += currentWord.charAt(i);
        if (textWidth(test) > width) {
          if (lines[lineInd] === "") {
            lines[lineInd] = nextLine;
          }
          else {
            lines.push(nextLine);
            lineInd += 1;
          }
          nextLine = currentWord.charAt(i);
        }
        else {
          nextLine = test;
        }
      }
      lines.push(nextLine);
      lineInd += 1;
    }
    else {
      let currentLine = lines[lineInd];
      let addedText;
      if (currentLine === "") {
        addedText = currentWord;
      }
      else {
        addedText = ` ${currentWord}`;
      }
      currentLine += addedText;
      if (textWidth(currentLine) > width) {
        lines.push(`${currentWord}`)
        lineInd += 1;
      }
      else {
        lines[lineInd] += addedText;
      }
    }
  }
  for (let line of lines) {
    newText += `${line}\n`;
  }
  newText = newText.substring(0, newText.length - 1);
  pop();
  return newText;
}

class TextButton {
  constructor() {
    this.rectX = 100;
    this.rectY = 200;
    this.rectW = 200;
    this.rectH = 150;
    this.rectCR = 20;
    this.textSize = 20;
    this.textMargin = 10;
    this.text = "the text algorithmically fits within the box using a function";
    this.textColor = CYAN;
    this.rectColor = DARK_RED;
  }
  draw() {
    push();
    this.rectColor.fill();
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
}

const CYAN = new Color(0, 200, 200);
const RED = new Color(255, 0, 0);
const DARK_RED = new Color(200, 20, 0);
