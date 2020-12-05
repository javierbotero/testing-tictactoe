import { gameBoard, gameMatch, player } from './game';

describe('Tests for the gameMatch submodule', () => {
  it('makeAvailable method calls spot callback function', () => {
    const mockDomSpots = jest.fn(() => [document.createElement('div'), document.createElement('div')]);
    gameMatch.makeAvailableMarks(mockDomSpots);
    expect(mockDomSpots.mock.calls.length).toBe(1);
  });

  it('Make sure the content of message div is changed using playGame', () => {});

  it('displayScore calls a callback that brings a div and change the content of that div for scores of players', () => {
    const div = document.createElement('div');
    const players = [{ namePlayer: 'p1', score: 1 }, { namePlayer: 'p2', score: 2 }];
    const mockDivCB = jest.fn(() => div);
    gameMatch.displayScore(mockDivCB, players);
    expect(mockDivCB.mock.calls.length).toBe(3);
  });

  it('make sure startGame change the switcher var to true with its first callback argument', () => {
    let switcher = false;
    const mockSwitcher = jest.fn(() => { switcher = !switcher; });
    const mockReset = jest.fn();
    const mockDisplay = jest.fn();
    const mockScore = jest.fn();
    const mockStart = jest.fn();
    const mockMarks = jest.fn();
    gameMatch.startGame(mockSwitcher, mockReset, mockDisplay, mockScore, mockStart, mockMarks);
    expect(switcher).toBe(true);
  });
});

describe('Tests for gameBoard submodule', () => {
  const mockBoard = ['X', 'X', 'X', '', '', '', '', '', ''];

  it('Checks changeDivsColors change the class of the divs that have ids "0", "1", "2" when in the array any combination that makes a line like 0, 1, and 2 have the same string', () => {
    document.body.innerHTML = `
      <div id="0" class=""></div>
      <div id="1" class=""></div>
      <div id="2" class=""></div>
    `;
    gameBoard.changeDivsColors(mockBoard);
    expect(document.getElementById(0).className).toBe(' bg-success');
  });
  it('resetBoard removes button with id "button-reset" from body', () => {
    document.body.innerHTML = `
      <div id="container"></div>
      <div id="message"></div>
      <div id="reset">Text<button type="button" id="button-reset">Reset</button></div>
    `;
    console.log(document.getElementById('reset').innerHTML);
    const mockReset = jest.fn(() => document.getElementById('reset'));
    gameBoard.resetBoard(mockReset);
    expect(document.getElementById('reset').innerHTML).toBe('Text');
  });
});