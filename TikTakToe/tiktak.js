const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restart = document.getElementById("restart");
const title = document.getElementById("title");
let circleTurn;

// Symbole
const X_CLASS = "pizza"; // Pizza-Symbol
const CIRCLE_CLASS = "circle"; // Kreis

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Spiel starten
startGame();

restart.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  hideWinMessage();
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    showWinMessage();
    setTimeout(() => {
      startGame();
    }, 5000); // Spiel nach 5 Sekunden zurücksetzen
    return;
  }
  if (isDraw()) {
    setTimeout(() => alert("Unentschieden!"), 10);
    return;
  }
  swapTurns();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// Gewinn-Nachricht anzeigen
function showWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.classList.add("win-message");
  winMessage.innerHTML = `
    <p>WIN!</p>
    <p>WIN!</p>
    <p>WIN!</p>
  `;
  document.body.appendChild(winMessage);
  setTimeout(() => {
    winMessage.classList.add("fade-out");
  }, 4000); // Nach 4 Sekunden ausblenden
  setTimeout(() => {
    document.body.removeChild(winMessage);
  }, 5000); // Nach 5 Sekunden entfernen
}

// Gewinn-Nachricht ausblenden
function hideWinMessage() {
  const winMessage = document.querySelector(".win-message");
  if (winMessage) {
    document.body.removeChild(winMessage);
  }
}
