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
    const placeMarker = function (cell){
        GameBoard.splice(cell, marker);
        return GameBoard[cell];
    }
    return {name, marker, placeMarker};

})();

const player2 = (function () {
    const name = "player2Name";
    const marker = "O";
    const placeMarker = function (cell){
        GameBoard.splice(cell, marker);
        return GameBoard[cell];
    }
    return {name, marker, placeMarker};

})();


const GameBoard = (function () {
    const columns = 3;
    const rows = 3;
    const gameBoard = [];
    for(i = 0; i < columns; i++) {
        columns[i] = [];
        for(j = 0; j < rows; j++) {
            columns[i][j].push(0);
        }
    }
    return gameBoard

})();


const GameController = (function () {

    const globalControls = (function () {
        const movesMade = 0;
        const addMove = function () {
            movesMade += 1;
        }

    })();


    const Player = function() {
        if (globalControls.movesMade === 0) return player1;
        if ((globalControls.movesMade % 2) === 0) return player1;
        if ((globalControls.movesMade % 2) !== 0) return player2;

    }


    const PlaceMarker = function (cell) {
        const pMarker = Player.marker;
        const target = GameBoard[cell];
        const place = function () {
            target === 0 ? target.splice(cell, pMarker) : console.log("Can't place there!!");
        };

    };

    return {globalControls, Player, PlaceMarker};

})();




gridCell.addEventListener("click", (e) => {
    GameController.PlaceMarker(e.target);
})