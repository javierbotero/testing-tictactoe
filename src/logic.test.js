import * as logic from './logic';
import * as game from './game';

describe('Tests for logic', () => {
  it('calls welcome()', () => {
    document.body.innerHTML = `
      <div id="container"></div>
      <div id="message"><div>
    `;
    game.message = jest.fn(() => document.getElementById('message'));
    game.container = jest.fn(() => document.getElementById('container'));
    logic.welcome();
    expect(game.message().innerHTML).toBeDefined();
  });

  it('selects Player', () => {
    document.body.innerHTML = `
      <div id="message"></div>
    `;
    const msg = document.getElementById('message');
    const mockMsg = jest.fn(() => msg);
    logic.selectPlayer(mockMsg);
    expect(mockMsg).toHaveBeenCalled();
  });

  it('creates players', () => {
    document.body.innerHTML = `
      <div id="container"></div>
      <div id="player-name">Andres</div>
      <div id="message"></div>
      <div id="reset">Text<button type="button" id="button-reset">Reset</button></div>
      <div id="score"></div>
      <div id="current" data-number="1"></div>
    `;
    const mock = {
      target: { innerHTML: 'X' },
    };
    logic.createPlayer(mock);
    expect(game.gameMatch.players.length).toBe(1);
  });
});