import Game from './Game';

let game = null;
beforeEach(() => {
  game = new Game('Alice', 'Bob');
});

test('Constructor stores player names', () => {
  expect(game.p1).toBe('Alice');
  expect(game.p2).toBe('Bob');
});

test('Requires two players', () => {
  expect(() => new Game()).toThrow();
  expect(() => new Game('Alice')).toThrow();
  expect(() => new Game('Alice', 'Bob')).not.toThrow();
});

test('Provides prompts on update', () => {
  const spy = jest.spyOn(console, 'log');
  game.update();
  expect(spy).toHaveBeenCalledWith('Player 1 Setup:');
  spy.mockReset();
  spy.mockRestore();
});

test('Player setup', () => {

});

test('Alternating player turns', () => {
});

test('Player firing a shot', () => {

});

test('Ending the game when a player has lost', () => {

});
