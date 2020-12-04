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