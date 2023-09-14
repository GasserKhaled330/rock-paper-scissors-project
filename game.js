const readline = require("node:readline/promises");

const VALID_MOVES = {
  r: {
    name: "Rock",
    winsAgainst: "s",
  },
  p: {
    name: "Paper",
    winsAgainst: "r",
  },
  s: {
    name: "Scissors",
    winsAgainst: "p",
  },
};

const GameStatus = {
  WIN: 1,
  LOSE: -1,
  TIE: 0,
};

let wins = 0;
let losses = 0;
let ties = 0;

function printHelp() {
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIndex];
}

function getWinner(move1, move2) {
  if (move1 === move2) {
    return GameStatus.TIE;
  } else if (VALID_MOVES[move1].winsAgainst === move2) {
    return GameStatus.WIN;
  } else {
    return GameStatus.LOSE;
  }
}

function processMove(cmd, cpu) {
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  if (getWinner(cmd, cpu) === GameStatus.TIE) {
    console.log("You tie.\n");
    ties++;
  } else if (getWinner(cmd, cpu) === GameStatus.WIN) {
    console.log("You win!\n");
    wins++;
  } else {
    console.log("You lose...\n");
    losses++;
  }
}

function processInputCommand(cmd) {
  if (cmd === "h") {
    console.log("\nHelp:\n");
    printHelp();
  } else if (VALID_MOVES[cmd]) {
    const cpu = getCPUMove();
    processMove(cmd, cpu);
  } else {
    console.log("\nInvalid command.\n");
    printHelp();
  }
}

/******************************* MAIN FUNCTION *******************************/
async function promptInput() {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);

  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let cmd = await r1.question("> ");

  cmd = cmd.trim().toLowerCase();

  if (cmd === "q") {
    r1.close();
    return;
  } else {
    processInputCommand(cmd);
  }
  r1.close();
  promptInput();
}

function initializeGame() {
  console.log("\nWelcome to Rock/Paper/Scissors Game\n");
  printHelp();
  promptInput();
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== "undefined" && require.main === module) {
  initializeGame();
}

module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput,
};
