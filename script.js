const createTitle = (title) => {
    const titleElem = document.createElement('h1');
    titleElem.textContent = title;
    document.body.appendChild(titleElem);
};

const player1 = (() => {
    const name = "Player 1";
    const marker = "X";
    return {
        getName: () => name,
        getMarker: () => marker
    };
})();

const player2 = (() => {
    const name = "Player 2";
    const marker = "O";
    return {
        getName: () => name,
        getMarker: () => marker
    };
})();

const GameBoard = (() => {
    const gameBoard = Array(9).fill('');
    let gameOver = false;

    const makeBoard = () => {
        const boardUI = document.createElement('div');
        boardUI.style.display = 'grid';
        boardUI.classList.add('game-board');
        return boardUI;
    };

    const makeSquare = (squareNumber) => {
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('game-square');

        boardSquare.addEventListener('click', (e) => {
            if (gameOver) return; 

            const target = e.target;
            const currentMarker = GameController.getCurrentPlayer().getMarker();

            target.textContent = currentMarker;
            gameBoard[squareNumber] = currentMarker;

            let result = checkWinner();
            if (result) {
                gameOver = true;
                setTimeout(() => {
                    alert(result === 'draw' ? "It's a draw!" : `${result} wins!`);
                    GameController.resetGame();
                }, 100);
                return;
            }

            GameController.switchPlayer();
        }, { once: true });

        return boardSquare;
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

        return gameBoard.every(cell => cell !== '') ? 'draw' : null;
    };

    const resetBoard = () => {
        gameBoard.fill('');
        gameOver = false;
    };

    return { gameBoard, makeBoard, makeSquare, checkWinner, resetBoard };
})();

const GameController = (() => {
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const resetGame = () => {
        document.body.innerHTML = '';
        createTitle("Tic-Tac-Toe");
        GameBoard.resetBoard();
        let board = GameBoard.makeBoard();
        for (let i = 0; i < 9; i++) {
            board.appendChild(GameBoard.makeSquare(i));
        }
        document.body.appendChild(board);
    };

    return { getCurrentPlayer, switchPlayer, resetGame };
})();

const GameFlow = () => {
    GameController.resetGame();
    console.log("Welcome to Tic-Tac-Toe! Player 1 (X) goes first.");
};

GameFlow();
