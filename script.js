// function Gameboard() {
//     const rows = 3;
//     const columns = 3;
//     const gameBoard = [];

//     for(i = 0; i < rows; i++) {
//         gameBoard[i] = [];
//         for(j = 0; j < columns; j++) {
//             gameBoard[i].push(cellArea());
//         }
//     }

//     const retBoard = () => gameBoard;
// };





// const marker = (column , player) => {

//     const freeCell = gameBoard.filter((row) => row[column].getValue() === 0).map((row) => row[column]);

//     if(!freeCell.length) {return};
    
//     const cell = cellArea();

// }





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
    const placeMarker = (row, col, marker) => {
        if (board[row][col] === 0) {
            board[row][col] = marker;
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
            return null;

        }
        
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
            if (!isNaN(move) && move >= 1 && move <= 9) break;
            console.log("Invalid input. Please enter a number between 1 and 9.");
        }
        return move;
    };

    const playMove = (cell) => {
        const row = Math.floor((cell - 1) / 3);
        const col = (cell - 1) % 3;
        const currentPlayer = getCurrentPlayer();

        if (GameBoard.placeMarker(row, col, currentPlayer.getMarker())) {
            console.log(`Placed ${currentPlayer.getMarker()} at (${row}, ${col})`);
            movesMade++;
        } else {
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

        const winner = GameBoard.checkWinner();
        
        // if (GameController.playMove(move)) {
        //     if (winner) {
        //         console.table(GameBoard.getBoard());
        //         console.log(`Game over! ${winner} wins!`);
        //         return;
        //     }
        // };
        
        if (!winner) playTurn();
        if (winner) {
            console.table(GameBoard.getBoard());
            console.log(`Game over! ${winner} wins!`);
            return;
        };

    };

    playTurn();



    // for (let i = 0; i < 9; i++) {
        
    //     console.log(`Current Turn: ${GameController.getCurrentPlayer().getName()}`);
    //     let move = GameController.nextMove();
    //     GameController.playMove(move);
    //     console.table(GameBoard.getBoard());        
    // }

    // console.log("Game over!");


};

GameFlow();

