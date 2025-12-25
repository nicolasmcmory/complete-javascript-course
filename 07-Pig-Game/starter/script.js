'use strict';
class Game {
  // DOM objects
  static DOM_OBJS = {
    // Overall
    body: document.querySelector('body'),
    dice: document.querySelector('.dice'),

    // Buttons
    newGame: document.querySelector('.btn--new'),
    rollDice: document.querySelector('.btn--roll'),
    holdScore: document.querySelector('.btn--hold'),

    // Players and Scores
    players: document.querySelectorAll('.player'),
    scores: document.querySelectorAll('.score'),
    currents: document.querySelectorAll('.current-score'),
  };

  static winningThreshold = 10;
  diceNo = 0;

  constructor() {
    this.p1 = {
      no: 1,
      score: 0,
      current: 0,
    };

    this.p2 = {
      no: 2,
      score: 0,
      current: 0,
    };
    // Start with player 1 by default
    this.currentPlayer = this.p1;
    this.gameStatus = true;
  }

  // Class utility methods
  // Static method to roll a dice
  static rollDice() {
    const diceClassList = Game.DOM_OBJS.dice.classList;
    if (diceClassList.contains('hidden')) {
      diceClassList.remove('hidden');
    }
    return Math.trunc(Math.random() * 6) + 1;
  }

  static prtStr(text) {
    console.log(text);
  }

  // Instance methods

  // Display methods
  addDisplayPlayer(currentPlayer, className) {
    const activePlayerClassList =
      Game.DOM_OBJS.players[currentPlayer.no - 1].classList;
    if (!activePlayerClassList.contains(className)) {
      activePlayerClassList.add(className);
    }
    return currentPlayer;
  }

  removeDisplayPlayer(currentPlayer, className) {
    const activePlayerClassList =
      Game.DOM_OBJS.players[currentPlayer.no - 1].classList;
    if (activePlayerClassList.contains(className)) {
      activePlayerClassList.remove(className);
    }
    return currentPlayer;
  }

  updateDisplayOnRollOrHold(currentPlayer) {
    // Update numbers and dice image
    Game.DOM_OBJS.currents[currentPlayer.no - 1].textContent =
      currentPlayer.current;
    Game.DOM_OBJS.scores[currentPlayer.no - 1].textContent =
      currentPlayer.score;
    Game.DOM_OBJS.dice.setAttribute('src', `dice-${this.diceNo}.png`);
  }

  getRdmPlayer() {
    // Random player selection
    const playerNoResult = Math.trunc(Math.random() * 2) + 1;

    // Player selection
    this.currentPlayer = this.p1.no === playerNoResult ? this.p1 : this.p2;

    Game.prtStr(
      `Player no result from dice roll for random who starts: ${playerNoResult}\nPlaying player: ${this.currentPlayer.no}`
    );

    return this.currentPlayer;
  }

  // Reset player
  resetPlayer(player, no) {
    const noIndex = no - 1;
    player.current = 0;
    player.score = 0;

    // Display reset vals
    Game.DOM_OBJS.scores[noIndex].textContent = 0;
    Game.DOM_OBJS.currents[noIndex].textContent = 0;

    return player;
  }

  // Switch players
  switchPlayer(currentPlayer) {
    currentPlayer.current = 0;
    this.updateDisplayOnRollOrHold(currentPlayer);
    this.removeDisplayPlayer(currentPlayer, 'player--active');

    // Which player is current player, swap as needed
    if (currentPlayer.no === this.p1.no) {
      this.currentPlayer = this.p2;
    } else {
      this.currentPlayer = this.p1;
    }

    // Displaying active player
    currentPlayer = this.currentPlayer;
    this.addDisplayPlayer(currentPlayer, 'player--active');

    // this.addDisplayActivePlayer(currentPlayer)
    return currentPlayer;
  }

  // Event handlers
  // Handle a new game
  handleNewGame() {
    // Local scope vars
    const p1 = this.p1;
    const p2 = this.p2;

    // Resetting players
    this.gameStatus = true;
    this.resetPlayer(p1, p1.no);
    this.resetPlayer(p2, p2.no);
    this.removeDisplayPlayer(p1, 'player--active');
    this.removeDisplayPlayer(p1, 'player--winner');
    this.removeDisplayPlayer(p2, 'player--active');
    this.removeDisplayPlayer(p2, 'player--winner');

    // Hiding dice using class manipulation
    const diceClassList = Game.DOM_OBJS.dice.classList;
    if (!diceClassList.contains('hidden')) {
      diceClassList.add('hidden');
    }

    const currentPlayer = this.getRdmPlayer();
    this.addDisplayPlayer(currentPlayer, 'player--active');
    return currentPlayer;
  }

  displayWinner(currentPlayer) {
    this.addDisplayPlayer(currentPlayer, 'player--winner');
    Game.prtStr(`${this.currentPlayer.no} wins!`);
    this.gameStatus = false;
    return currentPlayer;
  }

  // Roll the dice
  handleRollDice() {
    let currentPlayer = this.currentPlayer;
    if (this.gameStatus) {
      this.addDisplayPlayer(currentPlayer, 'player--active');

      // Get dice roll value
      this.diceNo = Game.rollDice();

      // Update current dice total for current player and handle outcome
      // Roll = 1, reset current total and switch players
      if (this.diceNo === 1) {
        // Reseting current player current dice total to 0
        return (currentPlayer = this.switchPlayer(currentPlayer));
      }
      // Add up the dice rolls for current player
      else {
        currentPlayer.current += this.diceNo;
        this.updateDisplayOnRollOrHold(currentPlayer);
      }

      // Log info to console
      Game.prtStr(
        `Player no: ${currentPlayer.no}\nDice roll:${this.diceNo}\nCurrent total: ${currentPlayer.current}`
      );
    }
    return currentPlayer;
  }

  // Click hold
  handleHoldScore() {
    let currentPlayer = this.currentPlayer;
    if (this.gameStatus) {
      currentPlayer.score += currentPlayer.current;

      if (currentPlayer.score >= Game.winningThreshold) {
        this.updateDisplayOnRollOrHold(currentPlayer);
        return this.displayWinner(currentPlayer);
      } else {
        Game.prtStr(`Player ${currentPlayer.no} score: ${currentPlayer.score}`);
        currentPlayer = this.switchPlayer(currentPlayer);
      }
    }
    return currentPlayer;
  }

  addEventListeners() {
    Game.DOM_OBJS.newGame.addEventListener(
      'click',
      this.handleNewGame.bind(this)
    );
    Game.DOM_OBJS.rollDice.addEventListener(
      'click',
      this.handleRollDice.bind(this)
    );
    Game.DOM_OBJS.holdScore.addEventListener(
      'click',
      this.handleHoldScore.bind(this)
    );
  }

  startGame() {
    this.addEventListeners();
  }
}

const game = new Game();
game.startGame();
