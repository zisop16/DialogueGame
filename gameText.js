const SCREEN_UNCHANGED = -1;

PastDecisions = [];
DialoguesList = [];
function createDialogue(displayScreen, text, options) {
  let dialogue = {
    "displayScreen": displayScreen,
    "text": text,
    "options": options
  }
  DialoguesList.push(dialogue);
}
function createAllDialogue() {
  createDialogue(
    "0",
    "hi my name is susan",
  );
}
AssociationsList = [];
function createAssociation(displayScreen, text, optionName, targetFunction, options) {
  let association = {
    "displayScreen": displayScreen,
    "text": text,
    "optionName": optionName,
    "target": targetFunction,
    "options": options
  }
  AssociationsList.push(association);
}
function createAllAssociations() {
  createAssociation(
    "0",
    "t43ht9ht439uth349iutgn43ig34nigu43t43utj34th3ti3tbt43uibt43ui43utbutg3bng43in342ir32n32ibt43iutitbti43btg234t3h3t4iu3bt43ibtui43vtt43uitb43t",
    "bad",
    function() {
      return "1";
    }
  );

  createAssociation(
    "0",
    "do something else!!!",
    "good",
    function() {
      return "2";
    },
    {
      "rectColor": GREEN,
      "textColor": BLACK
    }
  );
  createAssociation(
    "0",
    "do something else!!!",
    "nhiu",
    function() {
      return "2";
    },
    {
      "rectColor": GREEN,
      "textColor": BLACK
    }
  );
  createAssociation(
    "0",
    "do something else!!!",
    "gvf",
    function() {
      return "2";
    },
    {
      "rectColor": GREEN,
      "textColor": BLACK
    }
  );
  createAssociation(
    "2",
    "bad ending",
    "sadness",
    function() {
      return SCREEN_UNCHANGED;
    }
  );
  createAssociation(
    "1",
    "you've reached the end...",
    "happiness",
    function() {
      return SCREEN_UNCHANGED;
    }
  );
  let seen = {};
  for (let association of AssociationsList) {
    let currName = association["optionName"];
    if (seen[currName]) {
      throw `Two options had the same option name: ${association["optionName"]}`;
    }
    seen[currName] = true;
  }
}
