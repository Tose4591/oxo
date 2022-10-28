const statusDisplay = document.querySelector('.gameStatus');
statusDisplay.innerHTML = "Next move: Player X";

let playerTurn = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isPc = false;

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseenter', cellHover));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseleave', cellHoverExit));

document.querySelector('#newGame').addEventListener('click', restartGame);
document.querySelector('#restartScore').addEventListener('click', restartScore);

const player1Score = document.querySelector('.player1');
const player2Score = document.querySelector('.player2');

document.querySelector('#twoPlayers').addEventListener('click', pvp);
document.querySelector('#vsComputer').addEventListener('click', vsPc);


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];


function changePlayer() {
    if (gameActive === true) {
        if (playerTurn == 'X') playerTurn = 'O';
        else playerTurn = 'X';
        statusDisplay.innerHTML = `Next move: Player ${playerTurn}`;
    }
}


function handleCellClick() {
    if (gameActive === true && isPc === true) {
        if (playerTurn == 'X') {
            const clickedCellIndex = parseInt(this.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "") return;

            updateCell(clickedCellIndex, playerTurn);
            checkResult();
            changePlayer();
        }
        if (playerTurn == 'O') {
            computerMove();
        }
    }
    else if (gameActive === true && isPc === false) {
        if (playerTurn == 'X') {
            const clickedCellIndex = parseInt(this.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "") return;

            updateCell(clickedCellIndex, playerTurn);
            checkResult();
            changePlayer();
        }
        if (playerTurn == 'O') {
            const clickedCellIndex = parseInt(this.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "") return;

            updateCell(clickedCellIndex, playerTurn);
            checkResult();
            changePlayer();
        }
    }

}

function updateCell(i, player) {
    gameState[i] = player;
    const clickedCell = document.querySelector(`[data-cell-index = "${i}"]`);
    clickedCell.classList.remove('hoveredCell');
    clickedCell.innerHTML = player;
    if (player == 'X') {
        clickedCell.classList.add('p1');
    }
    else {
        clickedCell.classList.add('p2');
    }

}

function checkResult() {

    for (let i = 0; i < 8; i++) {
        let winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a == b && b == c) {
            gameActive = false;
            winner = playerTurn;
            statusDisplay.innerHTML = `Winner is Player ${winner}`;
            if (winner == "X") {
                player1Score.innerHTML = parseInt(player1Score.textContent) + 1;
            }
            else {
                player2Score.innerHTML = parseInt(player2Score.textContent) + 1;
            }
            return;
        }
        let resultDraw = gameState.includes("");
        if (!resultDraw) {
            statusDisplay.innerHTML = "The match ended in a draw";
            gameActive = false;
        }


    }
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => { cell.innerHTML = ""; cell.classList.remove('p1', 'p2') });
    changePlayer();
    if (playerTurn == 'O' && isPc === true) {
        computerMove();
    }
}

function restartScore() {
    restartGame();
    player1Score.innerHTML = "0";
    player2Score.innerHTML = "0";
}



//---------------------izgled-----------------------
function cellHover() {
    const hoveredCellIndex = parseInt(this.getAttribute('data-cell-index'));
    if (gameState[hoveredCellIndex] !== "" || gameActive == false) return;
    const hoveredCell = document.querySelector(`[data-cell-index = "${hoveredCellIndex}"]`);
    hoveredCell.innerHTML = playerTurn;
    if (playerTurn == 'X') {
        hoveredCell.classList.add('p1', 'hoveredCell');
    }
    else {
        hoveredCell.classList.add('p2', 'hoveredCell');
    }
}

function cellHoverExit() {
    const exitCellIndex = parseInt(this.getAttribute('data-cell-index'));
    if (gameState[exitCellIndex] !== "" || gameActive == false) return;
    const exitCell = document.querySelector(`[data-cell-index = "${exitCellIndex}"]`);
    exitCell.innerHTML = '';
    exitCell.classList.remove('hoveredCell', 'p1', 'p2');
}

function changeScreen() {
    document.querySelector('#gameInner').classList.remove('hidden');
    document.querySelector('.chooseOpponent').classList.add('hidden');
    document.querySelector('.gameTitle').classList.add('hidden');
}

function pvp() {
    isPc = false;
    changeScreen();
}

function vsPc() {
    isPc = true;
    changeScreen();
}

function computerMove() {
    let i = Math.floor(Math.random() * 9);

    while (gameActive == true && gameState[i] !== "") {
        i = Math.floor(Math.random() * 9);
    }
    updateCell(i, playerTurn);
    checkResult();
    changePlayer();

}