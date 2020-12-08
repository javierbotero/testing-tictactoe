import * as logic from './logic';
import * as game from './game';

describe('Tests for logic', () => {

  it('calls welcome()', () => {
    document.body.innerHTML = `
      <div id="container"></div>
      <div id="message">Welcome<div>
    `;
    game.message = jest.fn(() => document.getElementById('message'));
    game.container = jest.fn(() => document.getElementById('container'));
    logic.welcome();
    expect(game.message().innerHTML).toBeDefined();
  });

  it('');
});