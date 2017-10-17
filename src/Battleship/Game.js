/**
 * Class for a game of Battleship. Takes two players and allows input
 */
class Game {
  /**
   * @param  {string} p1 Player 1's name
   * @param  {string} p2 Player 2's name
   */
  constructor(p1, p2) {
    if (p1 == null || p2 == null) {
      throw('Game requires two players.');
    }
    this.p1 = p1;
    this.p2 = p2;
  }

  update() {
    console.log('Player 1 Setup:');
  }
}

export default Game;
