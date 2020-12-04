import { gameBoard, gameMatch, player } from './game';

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
  const result = `
    <p class="col-12 text-center bg-info text-white m-0">SCORE<p>
    <div class="col-6 p-2 bg-info text-white text-center">
      <p>${players[0].namePlayer}</p>
      <p>${players[0].score}</p>
    </div>
    <div class="col-6 p-2 bg-info text-white text-center">
      <p>${players[1].namePlayer}</p>
      <p>${players[1].score}</p>
    </div>
  `;

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