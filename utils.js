function pointInRect(x, y, w, h, p) {
  let leftX = x - w/2;
  let topY = y - h/2;
  let rightX = x + w/2;
  let botY = y + h/2;
  let xBounds = p.x >= leftX && p.x <= rightX;
  let yBounds = p.y >= topY && p.y <= botY;
  return xBounds && yBounds;
}

function countChar(text, char) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === char) {
      count++;
    }
  }
  return count;
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
