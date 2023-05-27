"use strict";
window.addEventListener("load", initApp);

let hiddenWord;
let hiddenLine = "_";
let lives;
const alphabet = "`abcdefghijklmnopqrstuvwxyz";

function initApp() {
  document.querySelector("#one-player-btn").addEventListener("click", singlePlayerMode);
  document.querySelector("#two-player-btn").addEventListener("click", multiPlayerMode);
}

async function singlePlayerMode() {
  document.querySelector("#player-modes").classList.add("hidden");
  document.querySelector("#word-form").classList.add("hidden");
  document.querySelector("#fake-canvas").classList.remove("hidden");

  let hiddenWordSingle = await getHiddenWordOnline("https://random-word-api.herokuapp.com/word");
  hiddenWord = hiddenWordSingle.toUpperCase();
  console.log(hiddenWord);

  generateAlphabet(alphabet);
  generateGuessLine();
}

function multiPlayerMode() {
  document.querySelector("#player-modes").classList.add("hidden");
  document.querySelector("#fake-canvas").classList.remove("hidden");

  generateAlphabet(alphabet);
  document.querySelector("#word-form").addEventListener("submit", setHiddenWord);
}

function generateAlphabet(a) {
  let letterValue;
  for (let i = 0; i < 26; i++) {
    letterValue = String.fromCharCode(a.charCodeAt(i) + 1).toUpperCase();
    console.log(letterValue);
    document.querySelector("#letters").insertAdjacentHTML(
      "beforeend",
      /*HTML*/ `
<input class="letter-buttons" type="button" value=${letterValue} onclick="guessLetter('${letterValue}')">
`
    );
  }
}

async function getHiddenWordOnline(url) {
  const response = await fetch(url);
  const data = await response.json();
  const dataString = data.toString();
  return dataString;
}

function setHiddenWord(event) {
  document.querySelector("#guess-line").innerHTML = "";
  event.preventDefault();
  hiddenWord = document.querySelector("#hiddenWordValue").value.toUpperCase();
  console.log(hiddenWord);

  lives = hiddenWord.length + 3;
  document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;

  generateGuessLine();
}

function generateGuessLine() {
  hiddenLine = "_";
  for (let i = 0; i < hiddenWord.length - 1; i++) {
    hiddenLine = hiddenLine + "_";
  }
  console.log(hiddenLine);

  document.querySelector("#guess-line").insertAdjacentHTML(
    "beforeend",
    /*HTML*/ `
<h1 id="guess-word">${hiddenLine}</h1>
  `
  );
}

function guessLetter(letter) {
  //   event.preventDefault();
  //   let currentGuess = document.querySelector("#guessLetterValue").value;

  let currentGuess = letter.toUpperCase();
  console.log(currentGuess);

  if (hiddenWord.includes(currentGuess)) {
    console.log("Correct");

    let guessIndexes = [];
    for (let i = 0; i < hiddenWord.length; i++) {
      if (hiddenWord[i] === currentGuess) {
        guessIndexes.push(i);
      }
    }
    console.log(guessIndexes);

    let updatedLine = "";
    for (let i = 0; i < hiddenWord.length; i++) {
      if (guessIndexes.includes(i)) {
        updatedLine += currentGuess;
      } else {
        updatedLine += hiddenLine[i];
      }
    }
    hiddenLine = updatedLine;
    console.log(hiddenLine);

    updateGuessLine();
  } else {
    console.log("Wrong");
    lives = lives - 1;
    document.querySelector("#lives-display").textContent = `LIVES: ${lives}`;
    if (lives == 0) {
      gameOver();
    }
  }
}

function updateGuessLine() {
  document.querySelector("#guess-line").innerHTML = "";

  document.querySelector("#guess-line").insertAdjacentHTML(
    "beforeend",
    /*HTML*/ `
<h1 id="guess-word">${hiddenLine}</h1>
  `
  );

  if (hiddenLine === hiddenWord) {
    setTimeout(win, 100);
  }
}

function gameOver() {
  document.querySelector("#game-over-word").textContent = `The correct word was '${hiddenWord}'`;
  document.querySelector("#fake-canvas").classList.add("hidden");
  document.querySelector("#game-over-screen").classList.remove("hidden");
}

function win() {
  alert("YOU WON!!");
}
