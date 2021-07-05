let SOFIA;
let CANVAS;
let gameState;
let clickTargetFound;

/**
 * Contains the currently selected optionList from textBoxes
 * Should look like [
 *  textbox1,
 *  textbox2,
 * ]
 * @type {Array}
 */
let optionList;
let reversedOptionList;
let dialogueList;
/**
 * Contains all textboxes which will be displayed
 * Should look like {
 *  "0": [
 *    textbox1,
 *    textbox2,
 *  ],
 *  "j": [
 *    textbox3,
 *    textbox4,
 *  ],
 * }
 *
 * @type {Object}
 */
let optionTextBoxes = {};
let dialogueTextBoxes = {};

let loggedIn = false;
let progress = [];

let LOGINBUTTON;
let shouldLogin = false;

let clicked = false;
let unclicked = false;
function mousePressed() {
  clicked = true;
}
function mouseReleased() {
  clicked = false;
  unclicked = true;
}
function setGameState(val) {
  if (val === SCREEN_UNCHANGED) {return;}
  gameState = val;
  optionList = optionTextBoxes[gameState] ? optionTextBoxes[gameState] : [];
  reversedOptionList = optionList.map((x) => x).reverse();
  dialogueList = dialogueTextBoxes[gameState] ? dialogueTextBoxes[gameState] : [];
}

function setup() {
  // Width and Height variables are automatically initialized
  // let width = 1200;
  // let height = 700;

  CANVAS = createCanvas(1200, 700);
  CANVAS.parent("#GameBorder");
  SOFIA = loadFont('fonts/Sofia-Regular.otf');
  rectMode(CENTER);
  textAlign(CENTER, TOP);
  blendMode(BLEND);

  LOGINBUTTON = document.querySelector("#LoginButton");
  LOGINBUTTON.onclick = () => {
    shouldLogin = true;
  };
  createAllAssociations();
  createAllDialogue();
  resetVariables();

  const BOX_WIDTH = 190;
  for (let association of AssociationsList) {
    let displayScreen = association["displayScreen"];
    let text = association["text"];
    let target = association["target"];
    let options = association["options"];
    let optionName = association["optionName"];
    let currList = optionTextBoxes[displayScreen] = optionTextBoxes[displayScreen] ? optionTextBoxes[displayScreen] : [];
    let optionsTopY = height / 2;
    let currTextBox = new TextButton(0, 0, BOX_WIDTH, AUTOMATIC_HEIGHT, text, options);
    currTextBox.onclick = function() {
      setGameState(target());
      progress.push(optionName);
    }
    currTextBox.rectY = optionsTopY + currTextBox.rectH / 2;
    currList.push(currTextBox);
  }
  for (let dialogue of DialoguesList) {
    let displayScreen = dialogue["displayScreen"];
    let text = dialogue["text"];
    let options = dialogue["options"];
    let currList = dialogueTextBoxes[displayScreen] = dialogueTextBoxes[displayScreen] ? dialogueTextBoxes[displayScreen] : [];
    let hi = 50;
    let currDialogue = new TextButton(0, 0, BOX_WIDTH, AUTOMATIC_HEIGHT, text, options);
    currDialogue.rectY = hi + currDialogue.rectH / 2;
    currList.push(currDialogue);
  }
  function centerXValues(boxList) {
    const centerX = width / 2;
    const spacing = 50;
    let even = boxList.length % 2 == 0;
    if (even) {
      let leftBox = true;
      let spaces = .5;
      for (let box of boxList) {
        let xShift = spaces * (BOX_WIDTH + spacing);
        if ((xShift + BOX_WIDTH / 2) >= (width / 2)) {
          throw `Too many textboxes: ${boxList.length} attempted to be fit into a window resulting in length: ${xShift * 2 + BOX_WIDTH}`;
        }
        if (leftBox) {
          box.rectX = centerX - xShift;
          leftBox = false;
        }
        else {
          box.rectX = centerX + xShift;
          leftBox = true;
          spaces += 1;
        }
      }
    }
    else {
      let leftBox = true;
      let spaces = 1;
      let firstBox =  true;
      for (let box of boxList) {
        if (firstBox) {
          box.rectX = centerX;
          firstBox = false;
        }
        else {
          let xShift = (spacing + BOX_WIDTH) * spaces;
          if ((xShift + BOX_WIDTH / 2) >= (width / 2)) {
            throw `Too many Textboxes: ${boxList.length} attempted to be fit into a window resulting in length: ${xShift * 2 + BOX_WIDTH}`;
          }
          if (leftBox) {
            box.rectX = centerX - xShift;
            leftBox = false;
          }
          else {
            box.rectX = centerX + xShift;
            spaces += 1;
            leftBox = true;
          }
        }
      }
    }

  }
  for (let key of Object.keys(optionTextBoxes)) {
    let currList = optionTextBoxes[key];
    centerXValues(currList);
  }
  for (let key of Object.keys(dialogueTextBoxes)) {
    let currList = dialogueTextBoxes[key];
    centerXValues(currList);
  }
  setGameState("0");
}

function draw() {
  if (shouldLogin) {
    login();
    shouldLogin = false;
  }
  background(50, 50, 50);
  //console.log(optionList);
  //console.log(textBoxes);
  for (let box of reversedOptionList) {
    box.mouseInteract();
  }
  for (let box of dialogueList) {
    box.draw();
  }
  for (let box of optionList) {
    box.draw();
  }


  resetVariables();
}

function resetVariables() {
  unclicked = false;
  clickTargetFound = false;
  resetClickables();
}
