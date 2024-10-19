
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const modeToggleBtn = document.getElementById("mode-toggle");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let againstComputer = false;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6] 
];

const playerXWins = () => `Player X wins!`;
const playerOWins = () => `Player O wins!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusText.textContent = currentPlayerTurn();

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
modeToggleBtn.addEventListener("click", toggleMode);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute("data-index");

    if (board[cellIndex] !== "" || !isGameActive) return;

    updateCell(cell, cellIndex);
    checkForWinner();

    if (againstComputer && currentPlayer === "O" && isGameActive) {
        computerMove();
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = currentPlayer === "X" ? playerXWins() : playerOWins();
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = drawMessage();
        isGameActive = false;
        return;
    }

    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = currentPlayerTurn();
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = currentPlayerTurn();
    cells.forEach(cell => (cell.textContent = ""));
}

function toggleMode() {
    againstComputer = !againstComputer;
    modeToggleBtn.textContent = againstComputer
        ? "Switch to Player vs Player"
        : "Switch to Player vs Computer";
    restartGame();
}

function computerMove() {
    let availableCells = [];
    board.forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];
    const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);

    updateCell(cell, cellIndex);
    checkForWinner();
}
