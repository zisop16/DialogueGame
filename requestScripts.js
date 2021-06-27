const STORAGE_API = "https://sw13yxaqu2.execute-api.us-east-2.amazonaws.com/DialogueGame/game";

function login() {
  let username = document.querySelector("#Username").value;
  let res = getInfo(username);
  let errorDiv = document.querySelector("#UsernameErrorContainer");
  if (res["Error"]) {
    let err = res["Error"];
    if (err.includes("is not registered")) {
      let res = createUser(username);
    }
    else {
      console.log(err);
      let errorElem = document.createElement("p");
      let errorText = document.createTextNode("Error: Username was invalid");
      errorDiv.innerHTML = "";
      errorElem.style.fontSize = "120%";
      errorElem.style.color = "red";
      errorElem.style.fontWeight = "bold";
      errorElem.appendChild(errorText);
      errorDiv.appendChild(errorElem);
    }

  }
  else {
    errorDiv.innerHTML = "";
    let gameData = res["Info"]["Decisions"];
  }
}

const NEW_USER_DECISIONS = "-1";
function createUser(username) {
  let paramsObj = {
    "Username": username,
    "Decisions": NEW_USER_DECISIONS
  };
  return postInfo(STORAGE_API, paramsObj);
}

function postInfo(url, paramsObj) {
  var http = new XMLHttpRequest();
  let params = JSON.stringify(paramsObj);

  http.open('POST', url, false);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.send(params);
  return JSON.parse(http.responseText);
}

function getInfo(username) {
  return getFrom(STORAGE_API + `?Username=${username}`)
}

function getFrom(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}
