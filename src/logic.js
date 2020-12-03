// eslint-disable-next-line import/extensions
import * as game from './game.js';

const welcome = () => {
  console.log(game.message());
  game.message().innerHTML = `Welcome to tic-tac-toe game<br>
                       <button id="start" type="button" class="bg-info text-white p-4 border-0 rounded">Start</button>`;
  game.gameBoard.displayBoard();
};

const selectPlayer = () => {
  game.message().innerHTML = `Player ${
    3 - game.gameBoard.tile.length
  } write a name and select a mark<br>
                       <input type="text" placeholder="Name" id="player-name" class="rounded border-0 my-2">`;
  const options = document.createElement('ul');
  for (let i = 0; i < game.gameBoard.tile.length; i += 1) {
    options.innerHTML += `<li id="${game.gameBoard.tile[i]}" class="mark-options list-inline-item p-3 rounded-circle text-white">${game.gameBoard.tile[i]}</li>`;
  }
  game.message().appendChild(options);
  const optionsMark1 = game.optionsMark();
  for (let i = 0; i < optionsMark1.length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    optionsMark1[i].addEventListener('click', createPlayer);
  }
};

function createPlayer() {
  const playerName = game.getName();
  const player = game.player(playerName, this.innerHTML);
  game.gameMatch.players.push(player);
  game.gameBoard.tile.splice(
    game.gameBoard.tile.findIndex((mark) => mark === player.markPlayer),
    1,
  );
  if (game.gameBoard.tile.length > 0) {
    selectPlayer();
  } else {
    // eslint-disable-next-line prefer-destructuring
    game.gameMatch.shift = game.gameMatch.players[0];
    game.gameMatch.startGame();
  }
}

const firstLayout = () => {
  const html = `
  <div id="message" class="h-25 p-2 bg-warning mb-3 text-body text-center p-5"></div>
  <div id="reset" class="text-center"></div>
  <div id="container" class="board w-50 h-50 bg-secondary mx-auto d-flex flex-wrap"></div>
  <div id="score" class="row mx-auto w-25 mt-3"></div>
  `;
  game.body.innerHTML = html;
  console.log(game.body);
};

export { welcome, selectPlayer, createPlayer, firstLayout };
