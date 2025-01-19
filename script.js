




const player1 = (function () {
    const name = "player1Name";
    const marker = "X";
    return {
        getName: () => name, 
        getMarker: () => marker
    };
})();

const player2 = (function () {
    const name = "player2Name";
    const marker = "O";
    return {
        getName: () => name, 
        getMarker: () => marker
    };
})();

const GameBoard = (function () {
    const board = Array(3).fill(null).map(() => Array(3).fill(0));

    const getBoard = () => board;
    const placeMarker = (col, row, marker) => {
        if (board[col][row] === 0) {
            board[col][row] = marker;
            return true;
        }
        return false;
    };

    const checkWinner = () => { 

        const winPatterns = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const markerA = board[a[0]][a[1]];
            const markerB = board[b[0]][b[1]];
            const markerC = board[c[0]][c[1]];

            if (markerA !== 0 && markerA === markerB && markerB === markerC){
                return markerA;
            }
        }
        return null;
        
    };
    return { getBoard, placeMarker, checkWinner };
})();


const GameController = (function () {
    let movesMade = 0;

    const getCurrentPlayer = () => (movesMade % 2 === 0 ? player1 : player2);

    const nextMove = () => {
        let move;
        while (true) {
            move = Number(prompt("Enter a grid cell (1-9): "));

            if (!isNaN(move) || (move >= 1 && move <= 9)) break;
            console.log("Invalid input. Please enter a number between 1 and 9.");
        }
        return move;
    };

    const playMove = (cell) => {
        const col = Math.floor((cell - 1) / 3);
        const row = (cell - 1) % 3;
        const currentPlayer = getCurrentPlayer();

        if (GameBoard.placeMarker(col, row, currentPlayer.getMarker())) {

            console.log(`Placed ${currentPlayer.getMarker()} at (${row}, ${col})`);
            movesMade++;

        } else if (GameBoard.placeMarker(col, row, currentPlayer.getMarker()) !== 0  && !GameBoard.checkWinner()) {

            console.log("Can't place there! That spot is already taken.");

        }
    };

    return { nextMove, playMove, getCurrentPlayer, getMovesMade: () => movesMade };
})();



const GameFlow = function () {
    console.log("Welcome to Tic-Tac-Toe!");
    console.log("Player 1 (X) goes first. Enter a number (1-9) to place your marker.");

    const playTurn = () => {
        console.table(GameBoard.getBoard());

        if (GameController.getMovesMade() >= 9) {
            console.log("It's a draw!");
            return;
        }

        console.log(`Current Turn: ${GameController.getCurrentPlayer().getName()}`);


        let move = GameController.nextMove();
        
        if (GameController.playMove(move)) {
            const winner = GameBoard.checkWinner();
            if (winner !== null) {
                console.table(GameBoard.getBoard());
                console.log(`Game over! ${winner} wins!`);
                return;
            }
        };

        playTurn();

    };

    playTurn();

};

GameFlow();

