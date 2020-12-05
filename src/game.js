const message = () => document.getElementById('message');
const optionsMark = () => document.getElementsByClassName('mark-options');
const getName = () => document.getElementById('player-name').value;
const div = () => document.getElementById('score');
const reset = () => document.getElementById('reset');
const container = () => document.getElementById('container');
const { body } = document;
const spots = () => document.getElementsByClassName('spot');

const gameMatch = (() => {
  const players = [];
  const shift = '';
  let playing = false;

  const makeAvailableMarks = (cb) => {
    const spots = cb();
    for (let i = 0; i < spots.length; i += 1) {
      // eslint-disable-next-line no-use-before-define
      spots[i].addEventListener('click', () => { gameBoard.mark(spots[i]); });
    }
  };

  const playGame = () => {
    // eslint-disable-next-line no-use-before-define
    gameBoard.message().innerHTML = `${gameMatch.shift.namePlayer} make a move`;
  };

  const displayScore = (cb, players) => {
    cb().innerHTML = '<p class="col-12 text-center bg-info text-white m-0">SCORE<p>';
    for (let i = 0; i < players.length; i += 1) {
      cb().innerHTML += `<div class="col-6 p-2 bg-info text-white text-center">
                         <p>${players[i].namePlayer}</p>
                         <p>${players[i].score}</p>
                       </div>`;
    }
  };

  const switchPlayingVar = () => { gameMatch.playing = !gameMatch.playing; };

  const startGame = (playingCB, resetBoardArg, displayBoardCB, scoreCB, startCB, letmarksCB) => {
    playingCB();
    // eslint-disable-next-line no-use-before-define
    resetBoardArg();
    // eslint-disable-next-line no-use-before-define
    displayBoardCB();
    scoreCB(div, players);
    startCB(players[0]);
    letmarksCB(spots);
  };

  return {
    players,
    shift,
    playGame,
    playing,
    displayScore,
    startGame,
    makeAvailableMarks,
    switchPlayingVar,
  };
})();

const gameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];
  const resetBoardArr = () => { board = ['', '', '', '', '', '', '', '', ''] };
  const tile = ['X', 'O'];
  const message = () => document.getElementById('message');

  const changeDivsColors = (myBoard) => {
    let indexes = [];
    if (myBoard[0] === myBoard[1] && myBoard[1] === myBoard[2] && myBoard[0] !== '') {
      indexes = [0, 1, 2];
    }
    if (myBoard[3] === myBoard[4] && myBoard[4] === myBoard[5] && myBoard[3] !== '') {
      indexes = [3, 4, 5];
    }
    if (myBoard[6] === myBoard[7] && myBoard[7] === myBoard[8] && myBoard[6] !== '') {
      indexes = [6, 7, 8];
    }
    if (myBoard[0] === myBoard[3] && myBoard[3] === myBoard[6] && myBoard[0] !== '') {
      indexes = [0, 3, 6];
    }
    if (myBoard[1] === myBoard[4] && myBoard[4] === myBoard[7] && myBoard[1] !== '') {
      indexes = [1, 4, 7];
    }
    if (myBoard[2] === myBoard[5] && myBoard[5] === myBoard[8] && myBoard[2] !== '') {
      indexes = [2, 5, 8];
    }
    if (myBoard[0] === myBoard[4] && myBoard[4] === myBoard[8] && myBoard[0] !== '') {
      indexes = [0, 4, 8];
    }
    if (myBoard[2] === myBoard[4] && myBoard[4] === myBoard[6] && myBoard[2] !== '') {
      indexes = [2, 4, 6];
    }

    for (let i = 0; i < indexes.length; i += 1) {
      document.getElementById(indexes[i]).className += ' bg-success';
    }
  };

  const resetBoard = (myReset) => {
    // eslint-disable-next-line no-use-before-define
    board = ['', '', '', '', '', '', '', '', ''];
    // eslint-disable-next-line no-use-before-define
    displayBoard();
    // eslint-disable-next-line no-use-before-define
    const button = document.getElementById('button-reset');
    myReset().removeChild(button);
    gameMatch.makeAvailableMarks(spots);
    gameMatch.playing = true;
    gameMatch.playGame();
  };

  const displayReset = () => {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', 'button-reset');
    button.className = 'bg-info text-white p-4 border-0 rounded my-2';
    button.addEventListener('click', () => { resetBoard(reset); });
    button.innerHTML = 'Reset';
    reset().appendChild(button);
  };

  const displayBoard = () => {
    container().innerHTML = '';
    for (let i = 0; i < 9; i += 1) {
      container().innerHTML += `<div data-number="${i}" id="${i}" class="spot border border-warning d-flex justify-content-center align-items-center text-white font-weight-bold">${board[i]}</div>`;
    }
  };

  const check = (player) => {
    if (
      (board[0] === board[1] && board[1] === board[2] && board[0] !== '')
      || (board[3] === board[4] && board[4] === board[5] && board[3] !== '')
      || (board[6] === board[7] && board[7] === board[8] && board[6] !== '')
      || (board[0] === board[3] && board[3] === board[6] && board[0] !== '')
      || (board[1] === board[4] && board[4] === board[7] && board[1] !== '')
      || (board[2] === board[5] && board[5] === board[8] && board[2] !== '')
      || (board[0] === board[4] && board[4] === board[8] && board[0] !== '')
      || (board[2] === board[4] && board[4] === board[6] && board[2] !== '')
    ) {
      message().innerHTML = `${player.namePlayer} won!!`;
      player.score += 1;
      gameMatch.playing = false;
      gameMatch.displayScore(div, gameMatch.players);
      changeDivsColors(board);
      displayReset();
    } else if (!board.includes('')) {
      message().innerHTML = 'We need another round to find a winner!!';
      displayReset();
    } else {
      // eslint-disable-next-line max-len
      gameMatch.shift = gameMatch.shift === gameMatch.players[0] ? gameMatch.players[1] : gameMatch.players[0];
      gameMatch.playGame();
    }
  };

  const mark = (tag) => {
    if (!gameMatch.playing) {
      console.log('playing is false', gameMatch.playing);
      return;
    }

    if (tag.innerHTML !== '') {
      message().innerHTML = 'Choose another space';
    } else {
      board[tag.dataset.number] = gameMatch.shift.markPlayer;
      tag.innerHTML = board[tag.dataset.number];
      check(gameMatch.shift);
    }
  };

  return {
    mark,
    check,
    displayBoard,
    tile,
    message,
    resetBoard,
    board,
    resetBoardArr,
    changeDivsColors,
  };
})();

const player = (name, mark) => {
  const namePlayer = name;
  const markPlayer = mark;
  // eslint-disable-next-line prefer-const
  let score = 0;
  const getName = () => namePlayer;

  return {
    namePlayer,
    markPlayer,
    getName,
    score,
  };
};

export {
  gameBoard,
  player,
  gameMatch,
  message,
  optionsMark,
  getName,
  body,
};
