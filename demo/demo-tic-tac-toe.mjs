import { color, box, log, title, asciiArt, line, gradient, animate, table, blend } from 'adclours';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let currentPlayer = 'X';
let gameMode = ''; // 'PvP' or 'PvAI'
let aiLevel = ''; // 'easy', 'medium', 'impossible'
let gameOver = false;

// ANSI escape code to set background color (e.g., #1A1A1A)
const setBackground = (hexColor) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    process.stdout.write(`\x1B[48;2;${r};${g};${b}m`);
};

const clear = () => {
    process.stdout.write('\x1B[2J\x1B[0f');
    // Set a subtle dark background for the whole terminal
    setBackground('#1A1A1A');
};

const resetTerminal = () => {
    process.stdout.write('\x1B[0m'); // Reset all styles and background
    clear();
};

const printBoard = () => {
    const playerXColor = color.bold.hex('#00FFFF'); // Bright Cyan
    const playerOColor = color.bold.hex('#FF69B4'); // Hot Pink
    const neutralColor = color.dim;

    const formattedBoard = board.map(cell => {
        if (cell === 'X') return playerXColor(cell);
        if (cell === 'O') return playerOColor(cell);
        return neutralColor(cell);
    });

    const boardContent = `
            ${formattedBoard[0]}  |  ${formattedBoard[1]}  |  ${formattedBoard[2]}
         ${line(13, color.gray('-'))}
            ${formattedBoard[3]}  |  ${formattedBoard[4]}  |  ${formattedBoard[5]}
         ${line(13, color.gray('-'))}
            ${formattedBoard[6]}  |  ${formattedBoard[7]}  |  ${formattedBoard[8]}
    `;

    const boxStyle = {
        borderColor: currentPlayer === 'X' ? 'cyan' : 'hotpink',
        style: 'double',
        padding: 2
    };
    console.log(box(boardContent, boxStyle));
};

const checkWinner = (currentBoard, player) => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player;
    });
};

const checkDraw = (currentBoard) => {
    return currentBoard.every(cell => ['X', 'O'].includes(cell));
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const handlePlayerMove = async () => {
    return new Promise((resolve) => {
        const prompt = color.yellow.bold(`\nPlayer ${currentPlayer}, enter your move (1-9): `);
        rl.question(prompt, (input) => {
            const move = parseInt(input) - 1;
            if (move >= 0 && move <= 8 && !['X', 'O'].includes(board[move])) {
                board[move] = currentPlayer;
                resolve();
            } else {
                log.error('Invalid move. Please try again.');
                handlePlayerMove().then(resolve);
            }
        });
    });
};

// --- AI Logic (Minimax) ---
const findBestMove = (currentBoard) => {
    const availableMoves = currentBoard.filter(cell => !['X', 'O'].includes(cell)).map(cell => parseInt(cell) - 1);

    // Impossible AI (Minimax)
    if (aiLevel === 'impossible') {
        const minimax = (tempBoard, isMaximizingPlayer) => {
            if (checkWinner(tempBoard, 'O')) return { score: 10 };
            if (checkWinner(tempBoard, 'X')) return { score: -10 };
            if (checkDraw(tempBoard)) return { score: 0 };

            const moves = tempBoard.filter(cell => !['X', 'O'].includes(cell)).map(cell => parseInt(cell) - 1);
            if (isMaximizingPlayer) {
                let bestScore = -Infinity;
                let bestMove;
                for (const move of moves) {
                    const newBoard = [...tempBoard];
                    newBoard[move] = 'O';
                    const score = minimax(newBoard, false).score;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = move;
                    }
                }
                return { score: bestScore, move: bestMove };
            } else {
                let bestScore = Infinity;
                let bestMove;
                for (const move of moves) {
                    const newBoard = [...tempBoard];
                    newBoard[move] = 'X';
                    const score = minimax(newBoard, true).score;
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = move;
                    }
                }
                return { score: bestScore, move: bestMove };
            }
        };
        return minimax(currentBoard, true).move;
    }

    // Medium AI
    if (aiLevel === 'medium') {
        // 1. Check for a winning move
        for (const move of availableMoves) {
            const tempBoard = [...currentBoard];
            tempBoard[move] = 'O';
            if (checkWinner(tempBoard, 'O')) return move;
        }
        // 2. Block the player's winning move
        for (const move of availableMoves) {
            const tempBoard = [...currentBoard];
            tempBoard[move] = 'X';
            if (checkWinner(tempBoard, 'X')) return move;
        }
    }

    // Easy & Fallback (Random move)
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const handleAIMove = () => {
    log.info(color.dim('AI is making a move...'));
    const move = findBestMove(board);
    if (move !== undefined) {
        board[move] = currentPlayer;
    }
};

const resetGame = () => {
    board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    currentPlayer = 'X';
    gameOver = false;
};

const startGame = async () => {
    clear();
    console.log(gradient(asciiArt('TIC TAC TOE'), '#8A2BE2', '#4169E1'));
    console.log(title(color.bold.cyan('CLI Game'), 'by Smart Tell Line', 80));
    console.log(line(80, color.dim('START')));

    while (!gameOver) {
        clear();
        console.log(gradient(asciiArt('TIC TAC TOE'), '#8A2BE2', '#4169E1'));
        if (gameMode === 'PvAI') {
            log.info(`AI Level: ${color.bold.yellow(aiLevel.toUpperCase())}`);
        }
        log.info(`Current Player: ${color.bold(currentPlayer)}`);
        printBoard();

        if (gameMode === 'PvP' || (gameMode === 'PvAI' && currentPlayer === 'X')) {
            await handlePlayerMove();
        } else if (gameMode === 'PvAI' && currentPlayer === 'O') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            handleAIMove();
        }

        if (checkWinner(board, 'X')) {
            const winMessage = gameMode === 'PvP' ? `Player ${color.cyan('X')} WINS!` : 'YOU WIN!';
            animate(color.brightCyan.bold(winMessage), { effect: 'pulse', duration: 4000 });
            gameOver = true;
            printBoard();
        } else if (checkWinner(board, 'O')) {
            const winMessage = gameMode === 'PvP' ? `Player ${color.hotpink('O')} WINS!` : 'AI WINS!';
            animate(color.hotpink.bold(winMessage), { effect: 'pulse', duration: 4000 });
            gameOver = true;
            printBoard();
        } else if (checkDraw(board)) {
            log.warn('It\'s a DRAW!');
            gameOver = true;
            printBoard();
        } else {
            switchPlayer();
        }

        if (gameOver) {
            const questionTable = table([
                ['Do you want to play again?'],
                [
                    color.green('[ Y ]') + 'es' + '  |  ' + color.red('[ N ]') + 'o'
                ]
            ], {
                align: ['center'],
                border: true
            });
            console.log('\n' + questionTable);

            rl.question(color.blue.bold('Enter your choice: '), (answer) => {
                if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                    resetGame();
                    mainMenu();
                } else {
                    log.success('Thanks for playing! Exiting...');
                    resetTerminal();
                    rl.close();
                }
            });
        }
    }
};

const selectAILevel = () => {
    clear();
    console.log(gradient(asciiArt('TIC TAC TOE'), '#8A2BE2', '#4169E1'));
    console.log(title(color.bold.yellow('SELECT AI LEVEL'), 'Choose your challenge', 80));
    console.log(line(80, color.dim('---')));

    console.log(color.green('1. Easy (Random moves)'));
    console.log(color.magenta('2. Medium (Blocks and wins)'));
    console.log(color.red('3. Impossible (Unbeatable)'));
    console.log(line(80, color.dim('---')));

    rl.question(color.blue.bold('Enter your choice (1, 2, or 3): '), (choice) => {
        if (choice === '1') {
            aiLevel = 'easy';
            startGame();
        } else if (choice === '2') {
            aiLevel = 'medium';
            startGame();
        } else if (choice === '3') {
            aiLevel = 'impossible';
            startGame();
        } else {
            log.error('Invalid choice. Please enter 1, 2, or 3.');
            selectAILevel();
        }
    });
};

const mainMenu = () => {
    clear();
    console.log(gradient(asciiArt('TIC TAC TOE'), '#8A2BE2', '#4169E1'));
    console.log(title(color.bold.green('MAIN MENU'), 'Select your game mode', 80));
    console.log(line(80, color.dim('---')));

    console.log(color.yellow('1. Player vs Player'));
    console.log(color.cyan('2. Player vs AI'));
    console.log(line(80, color.dim('---')));

    rl.question(color.blue.bold('Enter your choice (1 or 2): '), (choice) => {
        if (choice === '1') {
            gameMode = 'PvP';
            startGame();
        } else if (choice === '2') {
            gameMode = 'PvAI';
            selectAILevel();
        } else {
            log.error('Invalid choice. Please enter 1 or 2.');
            mainMenu();
        }
    });
};

// Start the application
mainMenu();
