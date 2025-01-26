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

                    completeGame(result === 'draw' ? "It's a draw!" : `${result} wins!`);
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
        gameOver = false;
        let board = GameBoard.makeBoard();
        for (let i = 0; i < 9; i++) {
            board.appendChild(GameBoard.makeSquare(i));
        }
        document.body.appendChild(board);

        // confetti.reset()
    };

    return { getCurrentPlayer, switchPlayer, resetGame };
})();

const GameFlow = () => {
    GameController.resetGame();
    console.log("Welcome to Tic-Tac-Toe! Player 1 (X) goes first.");
};





const completeGame = (message) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.left = '0';
    overlay.style.backgroundColor = 'rgba(0,0,0,.75)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.textAlign = 'center';

    const completeMessage = document.createElement('h2');
        completeMessage.textContent = message;
        completeMessage.style.color = 'white';
        completeMessage.style.fontSize = '100px';
        completeMessage.style.fontFamily = 'monospace';


        overlay.appendChild(completeMessage);


    

    const restartBtn = document.createElement('button');

    restartBtn.textContent = "Restart";
    restartBtn.style.backgroundColor = 'transparent';
    restartBtn.style.color = 'white';
    restartBtn.style.border = '1px solid white';
    restartBtn.style.padding = '10px 30px';
    restartBtn.style.fontSize = '30px';

    

    overlay.appendChild(restartBtn);

    document.body.appendChild(overlay);

    triggerConfetti();

    restartBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        GameFlow();

    });


 };

 const triggerConfetti = () => {

    confetti({
        particleCount: 350,
        spread: 90,
        origin: { x: 0.05, y: 0.9 },
      });

      confetti({
        particleCount: 350,
        spread: 90,
        origin: { x: .95, y: 0.9 },
      });

      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 60,
          scalar: 1.2,
          shapes: ["star"],
        });
      
        confetti({
          ...defaults,
          particleCount: 20,
          scalar: 0.75,
          shapes: ["circle"],
        });
      }
      
      shoot();
      shoot();
      shoot();
 }

GameFlow();
