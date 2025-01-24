const player1 = (function () {
    const name = "Player 1";
    const marker = "X";
    return {
        getName: () => name,
        getMarker: () => marker
    };
})();

const player2 = (function () {
    const name = "Player 2";
    const marker = "O";
    return {
        getName: () => name,
        getMarker: () => marker
    };
})();

const GameBoard = (function () {
    const gameBoard = Array(9).fill('');

    const getBoard = () => gameBoard;

    const placeMarker = (cell, marker) => {
        if (gameBoard[cell - 1] === '') {
            gameBoard[cell - 1] = marker;
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (gameBoard.every((cell) => cell !== '')) {
            return 'draw';
        }

        return null;
    };

    return { getBoard, placeMarker, checkWinner };
})();

const GameController = (function () {
    let currentPlayer = player1;
    let movesMade = 0;

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playMove = (cell) => {
        if (GameBoard.placeMarker(cell, currentPlayer.getMarker())) {
            movesMade++;
            return true;
        }
        return false;
    };

    return { getCurrentPlayer, switchPlayer, playMove, getMovesMade: () => movesMade };
})();

const GameFlow = function () {
    console.log("Welcome to Tic-Tac-Toe!");
    console.log("Player 1 (X) goes first. Enter a number (1-9) to place your marker.");

    const playTurn = () => {
        console.table(GameBoard.getBoard());
        // console.table(GameBoard.getBoard().slice(0, 3));
        // console.table(GameBoard.getBoard().slice(3, 6));
        // console.table(GameBoard.getBoard().slice(6, 9));

        let move = Number(prompt(`${GameController.getCurrentPlayer().getName()}, enter a grid cell (1-9):`));
        while (isNaN(move) || move < 1 || move > 9 || !GameBoard.placeMarker(move, GameController.getCurrentPlayer().getMarker())) {
            move = Number(prompt("Invalid input or spot taken. Enter a valid grid cell (1-9):"));
        }

        GameController.playMove(move);

        let result = GameBoard.checkWinner();
        if (result) {
            console.table(GameBoard.getBoard());
            if (result === 'draw') {
                console.log("It's a draw!");
            } else {
                console.log(`Game over! ${result} wins!`);
            }
            return;
        }

        GameController.switchPlayer();
        playTurn();
    };

    playTurn();
};

GameFlow();