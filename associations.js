const END_SCREEN = -1;

AssociationsList = [];
function createAssociation(name, text, targetFunction) {
  let association = {
    "name": name,
    "text": text,
    "target": targetFunction,
  }
  AssociationsList += association;
}
createAssociation(
  "0",
  "the text algorithmically fits within the box using a function",
  function() {
    return "1";
  }
);
createAssociation(
  "1",
  "you've reached the end...",
  function() {
    return END_SCREEN;
  }
);
