const ContainerEl = document.querySelector(".container");
const playerTxt = document.querySelector(".message");
let resetBtn = document.getElementById("restartGame");
let cells = document.querySelectorAll(".cell");

const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = X_TXT;
let spaces = Array(9).fill(null);

let winnerId = getComputedStyle(document.body).getPropertyValue("--bg-color-dark");

// START GAME
const StartGame = () => {
  cells.forEach((cell) => cell.addEventListener("click", cellsClicked));
};

// CELL CLICKED
function cellsClicked(e) {
  const id = e.target.id;

  // check id
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // WINNER LOGIC
    if (playerHasWon() != false) {
      playerTxt.innerHTML = ` <h2 class="message">Congratulation Player: ${currentPlayer}</h2>`;
      winnerId = playerHasWon();

      winnerId.map((cell) => (cells[cell].style.backgroundColor = "#38EF7D"));

      ContainerEl.classList.add("success");
    }
    currentPlayer = currentPlayer === X_TXT ? O_TXT : X_TXT;
  }
}

// WINNING VARIANTS
const winningVariants = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PLAYER WIN
function playerHasWon() {
  for (const condition of winningVariants) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

// RESET THE GAME
resetBtn.addEventListener("click", restartGame);

function restartGame() {
  spaces.fill(null);

  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.backgroundColor = "";
  });

  playerTxt.innerHTML = "Tic Tac Toe";
  currentPlayer = O_TXT;
  ContainerEl.classList.remove("success");
}

// GLOBAL RESET APP
function handleReset() {
  document.getElementById("globalReset").addEventListener("click", function () {
    location.reload();
  });
}
handleReset();

StartGame();
