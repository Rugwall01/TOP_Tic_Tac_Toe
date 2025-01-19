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
    const columns = 3;
    const rows = 3;
    const gameBoard = [];
    for(let i = 0; i < columns; i++) {
        let column = [];
        for(let j = 0; j < rows; j++) {
            column.push(0);
        }
        gameBoard.push(column)
    }
    return gameBoard;

})();


const GameController = (function () {

    const globalControls = (function () {
        let movesMade = 0;
        const addMove = function () {
            movesMade++;
        }
        const getMoves = function () {
            return movesMade;
        }
        return {addMove, getMoves};

    })();


    const Player = function() {
        return (globalControls.getMoves() % 2 === 0) ? player1 : player2;

    };


    const PlaceMarker = function (cell) {

        const row = Math.floor((cell - 1) / 3);
        const col = (cell - 1) % 3;


        const place = function () {
            if (GameBoard[row][col] === 0) {
            GameBoard[row][col] = Player().marker;
            console.log(`Placed ${Player().marker} at (${row}, ${col})`);
            }else { 
            console.log("Can't place there! That spot is already taken.");
            
            };
        };
        return {place};
        

    };

    const NextMove = function () {

        let nextMove;
        while (true) {
            nextMove = Number(prompt("Enter a grid cell (1-9): "));
            if (!isNaN(nextMove) && nextMove >= 1 && nextMove <= 9) break;
            console.log("Invalid input. Please enter a number between 1 and 9.");
        }
        
        return {nextMove};
    }

    return {globalControls, Player, PlaceMarker, NextMove};

})();


const GameFlow = function () {

    console.log("Welcome to Tic-Tac-Toe!");
    console.log("Player 1 (X) goes first. Enter a number (1-9) to place your marker.");
    
   

    for (let i = 0; i < 9; i++){
    let nextMove = GameController.NextMove();
    GameController.PlaceMarker(nextMove.nextMove).place();
    GameController.globalControls.addMove();
    console.table(GameBoard);
    
    };
    console.log("Game over!")
    

};




// gridCell.addEventListener("click", (e) => {
//     GameController.PlaceMarker(e.target).place;
// });

GameFlow();
