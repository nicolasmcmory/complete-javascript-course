'use strict';

class Game {
  // Global class variable
  // Constants
  STARTING_SCORE = 20;
  STARTING_NUMBER = '?';
  STARTING_MESSAGE = 'Start guessing';

  // DOM elements
  DOM_ELEMENTS = {
    number: document.querySelector('.number'),
    message: document.querySelector('.message'),
    score: document.querySelector('.score'),
    highScore: document.querySelector('.highscore'),
    guess: document.querySelector('.guess'),
    check: document.querySelector('.check'),
    again: document.querySelector('.again'),
    body: document.querySelector('body'),
  };

  constructor() {
    this.secretNumber = Game.generateSecretNumber();
    this.highScore = 0;
    this.currentScore = this.STARTING_SCORE;
    this.userNumber;
  }

  // UTILITY METHODS
  // Printer
  static print(obj) {
    console.log(obj);
  }

  // Generate random int between 1 and 20
  static generateSecretNumber() {
    return Math.floor(Math.random() * 20) + 1; // 0-19 then + 1 shifts it to 1-20
  }

  // INSTANCE METHODS

  setUserNumber() {
    this.userNumber = Number(this.DOM_ELEMENTS.guess.value);

    return this.userNumber;
  }

  // Decrement current score as we go along
  setCurrentScore() {
    this.DOM_ELEMENTS.score.innerHTML = --this.currentScore;

    return this.currentScore;
  }

  updateHighScore() {
    if (this.currentScore >= this.highScore) {
      this.highScore = this.currentScore;
    }
    this.DOM_ELEMENTS.highScore.innerHTML = this.highScore;
  }

  checkAnswer() {
    // Win
    if (this.userNumber === this.secretNumber) {
      // Show secret number
      this.DOM_ELEMENTS.number.innerHTML = this.currentScore;
      this.DOM_ELEMENTS.message.innerHTML = 'Correct number!';
      this.DOM_ELEMENTS.body.style.backgroundColor = '#60b347';
    } else if (this.userNumber > this.secretNumber) {
      // Provide clue
      this.DOM_ELEMENTS.message.innerHTML = 'Too high!';
    } else {
      // Provide clue
      this.DOM_ELEMENTS.message.innerHTML = 'Too low!';
    }

    this.setCurrentScore();
  }

  restartGame() {
    this.DOM_ELEMENTS.body.style.backgroundColor = '#222';
    this.updateHighScore();
    this.currentScore = this.STARTING_SCORE;
    this.DOM_ELEMENTS.score.innerHTML = this.STARTING_SCORE;
    this.DOM_ELEMENTS.message.innerHTML = this.STARTING_MESSAGE;
    this.DOM_ELEMENTS.number.innerHTML = this.STARTING_NUMBER;
    this.secretNumber = Game.generateSecretNumber();
    Game.print(this.secretNumber);
  }

  // EVENT HANDLERS
  // Check user guess against secret number
  handleUserCheck() {
    this.userNumber = this.DOM_ELEMENTS.check.addEventListener('click', () => {
      this.setUserNumber();
      this.checkAnswer();
    });
  }

  // Play again, resets the random number and updates the high score
  handleUserAgain() {
    this.DOM_ELEMENTS.again.addEventListener('click', () => {
      this.restartGame();
    });
  }
}

const game = new Game();

console.log(game.secretNumber);

game.handleUserCheck();
game.handleUserAgain();
