import { gameBoard, gameMatch, player } from './game';

it('makeAvailable method calls spot callback function', () => {
  const mockDomSpots = jest.fn(() => [document.createElement('div'), document.createElement('div')]);
  gameMatch.makeAvailableMarks(mockDomSpots);
  expect(mockDomSpots.mock.calls.length).toBe(1);
});

it('Make sure the content of a div is changed using playGame', () => {});
