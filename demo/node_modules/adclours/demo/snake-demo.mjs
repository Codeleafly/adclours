// snake.mjs
// Terminal Snake Game using adclours (ESM)
// Run: node snake.mjs
// Make sure your package.json has { "type": "module" } and `npm i adclours`

import { color, title, line, box, log } from 'adclours';
import readline from 'readline';

const CELL_EMPTY = '  ';          // two spaces for nicer blocks
const CELL_SNAKE_HEAD = '██';
const CELL_SNAKE_BODY = '██';
const CELL_FOOD = '██';

const BOARD = {
  // You can tweak these; they auto-clamp to terminal if smaller
  width: 28,
  height: 16,
  marginTop: 2,
};

const COLORS = {
  head: (t) => color.bold.brightGreen(t),
  body: (t) => color.green(t),
  food: (t) => color.brightRed(t),
  wall: (t) => color.dim(t),
  hudKey: (t) => color.bold.cyan(t),
  hudVal: (t) => color.bold.yellow(t),
  hudText: (t) => color.gray(t),
};

const KEYS = {
  UP: ['w', '\u001b[A'],
  DOWN: ['s', '\u001b[B'],
  LEFT: ['a', '\u001b[D'],
  RIGHT: ['d', '\u001b[C'],
  PAUSE: ['p', 'P', ' '],
  QUIT: ['q', 'Q', '\u0003'],
  RESET: ['r', 'R'],
};

let state;

/** Utils */
function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0;0H');
}

function clampBoardToTerminal() {
  // Leave some room for HUD
  const maxWidth = Math.max(10, Math.floor((process.stdout.columns || 80) / 2) - 4);
  const maxHeight = Math.max(8, (process.stdout.rows || 24) - 10);
  BOARD.width = Math.min(BOARD.width, maxWidth);
  BOARD.height = Math.min(BOARD.height, maxHeight);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function posEq(a, b) {
  return a.x === b.x && a.y === b.y;
}

function cellInSnake(x, y, includeHead = true) {
  const start = includeHead ? 0 : 1;
  for (let i = start; i < state.snake.length; i++) {
    if (state.snake[i].x === x && state.snake[i].y === y) return true;
  }
  return false;
}

function placeFood() {
  let x, y;
  do {
    x = randInt(0, BOARD.width - 1);
    y = randInt(0, BOARD.height - 1);
  } while (cellInSnake(x, y, true));
  state.food = { x, y };
}

/** Game Lifecycle */
function initGame() {
  clampBoardToTerminal();
  const midX = Math.floor(BOARD.width / 2);
  const midY = Math.floor(BOARD.height / 2);

  state = {
    snake: [{ x: midX, y: midY }, { x: midX - 1, y: midY }, { x: midX - 2, y: midY }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    score: 0,
    best: state?.best ?? 0,
    tickMs: 140,
    paused: false,
    over: false,
    loopId: null,
    level: 1,
    eatenThisLevel: 0,
  };

  placeFood();
}

function startInput() {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  process.stdin.on('keypress', (_, key) => {
    const str = key?.sequence;

    if (KEYS.QUIT.includes(str)) {
      shutdown();
      return;
    }

    if (state.over && KEYS.RESET.includes(str)) {
      initGame();
      mainLoop();
      return;
    }

    if (KEYS.PAUSE.includes(str) && !state.over) {
      state.paused = !state.paused;
      if (!state.paused) mainLoop();
      else render(); // show paused overlay
      return;
    }

    if (state.over) return;

    if (KEYS.UP.includes(str) && state.dir.y !== 1) state.nextDir = { x: 0, y: -1 };
    else if (KEYS.DOWN.includes(str) && state.dir.y !== -1) state.nextDir = { x: 0, y: 1 };
    else if (KEYS.LEFT.includes(str) && state.dir.x !== 1) state.nextDir = { x: -1, y: 0 };
    else if (KEYS.RIGHT.includes(str) && state.dir.x !== -1) state.nextDir = { x: 1, y: 0 };
  });
}

function shutdown() {
  clearTimeout(state.loopId);
  clearScreen();
  console.log(
    box(
      `${color.bold.green('Thanks for playing SNAKE!')}\n${color.dim('Goodbye 👋')}`,
      { borderColor: 'brightBlue', style: 'double', padding: 1 }
    )
  );
  process.exit(0);
}

/** Game Tick */
function tick() {
  if (state.paused || state.over) return;

  // apply nextDir atomically per tick
  state.dir = state.nextDir;

  const head = state.snake[0];
  const newHead = { x: head.x + state.dir.x, y: head.y + state.dir.y };

  // collisions: wall
  if (
    newHead.x < 0 ||
    newHead.x >= BOARD.width ||
    newHead.y < 0 ||
    newHead.y >= BOARD.height
  ) {
    return gameOver();
  }

  // collisions: self
  if (cellInSnake(newHead.x, newHead.y, true)) {
    return gameOver();
  }

  // move
  state.snake.unshift(newHead);

  // eat?
  if (posEq(newHead, state.food)) {
    state.score += 10;
    state.eatenThisLevel++;
    if (state.score > state.best) state.best = state.score;

    // speed up every 5 foods
    if (state.eatenThisLevel % 5 === 0) {
      state.level++;
      state.tickMs = Math.max(60, state.tickMs - 12);
    }
    placeFood();
  } else {
    state.snake.pop(); // normal move (no growth)
  }
}

/** Rendering */
function renderHUD() {
  const w = BOARD.width * 2 + 4;
  const header =
    title(color.bold.cyan('TERMINAL SNAKE 🐍'), color.dim('adclours powered'), w) + '\n';

  const stats =
    `${COLORS.hudKey('Score')}: ${COLORS.hudVal(String(state.score).padStart(3, ' '))}   ` +
    `${COLORS.hudKey('Best')}: ${COLORS.hudVal(String(state.best).padStart(3, ' '))}   ` +
    `${COLORS.hudKey('Level')}: ${COLORS.hudVal(String(state.level))}   ` +
    `${COLORS.hudKey('Speed')}: ${COLORS.hudVal(state.tickMs + 'ms')}\n`;

  const help =
    `${COLORS.hudText('Controls:')} ` +
    `${COLORS.hudKey('W/A/S/D or Arrow Keys')}  ` +
    `${COLORS.hudKey('P')}=Pause  ` +
    `${COLORS.hudKey('R')}=Restart  ` +
    `${COLORS.hudKey('Q')}=Quit\n`;

  console.log(header);
  console.log(line(BOARD.width * 2 + 4, color.dim('PLAY')));
  console.log(stats);
  console.log(help);
}

function renderBoard() {
  const topBorder = COLORS.wall('┌' + '─'.repeat(BOARD.width * 2) + '┐');
  const bottomBorder = COLORS.wall('└' + '─'.repeat(BOARD.width * 2) + '┘');

  console.log(topBorder);

  for (let y = 0; y < BOARD.height; y++) {
    let row = COLORS.wall('│');
    for (let x = 0; x < BOARD.width; x++) {
      if (state.snake[0].x === x && state.snake[0].y === y) {
        row += COLORS.head(CELL_SNAKE_HEAD);
      } else if (cellInSnake(x, y, false)) {
        row += COLORS.body(CELL_SNAKE_BODY);
      } else if (state.food.x === x && state.food.y === y) {
        row += COLORS.food(CELL_FOOD);
      } else {
        // subtle board tint using a checker bg idea (optional)
        row += CELL_EMPTY;
      }
    }
    row += COLORS.wall('│');
    console.log(row);
  }
  console.log(bottomBorder);
}

function renderOverlays() {
  if (state.paused) {
    const msg = `${color.bold.yellow('PAUSED')}\n${color.dim('Press P to resume')}`;
    console.log(
      box(msg, { borderColor: 'brightYellow', style: 'double', padding: 1 })
    );
  }

  if (state.over) {
    const msg =
      `${color.bold.red('GAME OVER')}\n` +
      `${color.bold('Score:')} ${color.brightCyan(state.score + '')}\n` +
      `${color.dim('Press ')}${color.bold('R')}${color.dim(' to restart or ')}${color.bold('Q')}${color.dim(' to quit')}`;
    console.log(
      box(msg, { borderColor: 'brightRed', style: 'double', padding: 1 })
    );
  }
}

function render() {
  clearScreen();
  for (let i = 0; i < BOARD.marginTop; i++) console.log('');
  renderHUD();
  renderBoard();
  renderOverlays();
}

/** Loop with dynamic speed */
function mainLoop() {
  render();
  state.loopId = setTimeout(() => {
    tick();
    if (!state.paused && !state.over) mainLoop();
    else render(); // update paused/over overlay immediately
  }, state.tickMs);
}

function gameOver() {
  state.over = true;
  render();
  log.error('Snake crashed! Press R to play again.');
}

/** Boot */
initGame();
startInput();
mainLoop();
