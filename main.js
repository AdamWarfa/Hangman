"use strict";
window.addEventListener("load", initApp);

let hiddenWord = "tomat";
let hiddenLine = "_";

function initApp() {
  generateAlphabet();
  document.querySelector("#word-form").addEventListener("submit", setHiddenWord);
  //   document.querySelector("#guess-form").addEventListener("submit", guessLetter);
}

function generateAlphabet() {
  document.querySelector("#letters").insertAdjacentHTML(
    "beforeend",
    /*HTML*/ `
<input id="letter-button-A" class="letter-buttons" type="button" value="A" onclick="guessLetter('A')">
<input id="letter-button-B" class="letter-buttons" type="button" value="B" onclick="guessLetter('B')">
<input id="letter-button-C" class="letter-buttons" type="button" value="C" onclick="guessLetter('C')">
<input id="letter-button-D" class="letter-buttons" type="button" value="D" onclick="guessLetter('D')">
<input id="letter-button-E" class="letter-buttons" type="button" value="E" onclick="guessLetter('E')">
<input id="letter-button-F" class="letter-buttons" type="button" value="F" onclick="guessLetter('F')">
<input id="letter-button-G" class="letter-buttons" type="button" value="G" onclick="guessLetter('G')">
<input id="letter-button-H" class="letter-buttons" type="button" value="H" onclick="guessLetter('H')">
<input id="letter-button-I" class="letter-buttons" type="button" value="I" onclick="guessLetter('I')">
<input id="letter-button-J" class="letter-buttons" type="button" value="J" onclick="guessLetter('J')">
<input id="letter-button-K" class="letter-buttons" type="button" value="K" onclick="guessLetter('K')">
<input id="letter-button-L" class="letter-buttons" type="button" value="L" onclick="guessLetter('L')">
<input id="letter-button-M" class="letter-buttons" type="button" value="M" onclick="guessLetter('M')">
<input id="letter-button-N" class="letter-buttons" type="button" value="N" onclick="guessLetter('N')">
<input id="letter-button-O" class="letter-buttons" type="button" value="O" onclick="guessLetter('O')">
<input id="letter-button-P" class="letter-buttons" type="button" value="P" onclick="guessLetter('P')">
<input id="letter-button-Q" class="letter-buttons" type="button" value="Q" onclick="guessLetter('Q')">
<input id="letter-button-R" class="letter-buttons" type="button" value="R" onclick="guessLetter('R')">
<input id="letter-button-S" class="letter-buttons" type="button" value="S" onclick="guessLetter('S')">
<input id="letter-button-T" class="letter-buttons" type="button" value="T" onclick="guessLetter('T')">
<input id="letter-button-U" class="letter-buttons" type="button" value="U" onclick="guessLetter('U')">
<input id="letter-button-V" class="letter-buttons" type="button" value="V" onclick="guessLetter('V')">
<input id="letter-button-W" class="letter-buttons" type="button" value="W" onclick="guessLetter('W')">
<input id="letter-button-X" class="letter-buttons" type="button" value="X" onclick="guessLetter('X')">
<input id="letter-button-Y" class="letter-buttons" type="button" value="Y" onclick="guessLetter('Y')">
<input id="letter-button-Z" class="letter-buttons" type="button" value="Z" onclick="guessLetter('Z')">

  `
  );
}

function setHiddenWord(event) {
  document.querySelector("#guess-line").innerHTML = "";
  event.preventDefault();
  hiddenWord = document.querySelector("#hiddenWordValue").value.toUpperCase();
  console.log(hiddenWord);

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

function win() {
  alert("YOU WON!!");
}
