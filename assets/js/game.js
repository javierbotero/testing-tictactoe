const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let o = "O";
  let x = "X";
  const mark = (space, tile) => {
    if (board[space] !== "") {
      MessageChannel.innerHTML = "Choose another space";
    } else {
      board[space] = tile;
      check();
    }
  };
  const check = () => {
    if (
      (board[0] === board[1] && board[1] === board[2]) ||
      (board[3] === board[4] && board[4] === board[5]) ||
      (board[6] === board[7] && board[7] === board[8]) ||
      (board[0] === board[3] && board[3] === board[6]) ||
      (board[1] === board[4] && board[4] === board[7]) ||
      (board[2] === board[5] && board[5] === board[8]) ||
      (board[0] === board[4] && board[4] === board[8]) ||
      (board[2] === board[4] && board[4] === board[6])
    ) {
      return `the player that won`;
    }
  };

  const displayBoard = () {
    let spots = document.getElementsByClassName('spot');
    for(let i = 0; i < spots.length; i++) {
      spots[i].innerHTML = board[i];
    }
  }

  return {
    board,
    o,
    x,
    mark,
    check,
    displayBoard
  };
})();

const Player = (name, tile) => {
  const getName = () => name;
  const setName = () => name;
  const selectTile = (index) => {
    const message = document.createElement('div');
    message.innerHTML = "Select a tile by selecting 0 for 'O' and 1 for 'X'";
    let input = document.getElementById("index");
    index = input.value;
    if (index === 0) {
      player.tile = tile.unshift;
    } else {
      player.tile = tile.pop;
    }
  };

  return {
    getName,
    setName,
    selectTile,
  };
};

const Game = (() => {
  let score = [0, 0];
  const changeScore = (index) => {
    score[index] += 1;
  };
  const resetBoard = () => {
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  }
  const resetScore = () => {
    score = [0, 0];
  }
})();

