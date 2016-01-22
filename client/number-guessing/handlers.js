function guess (guess) {
  let target = this.get('target');

  if (guess === target) {
    return this.emit('win');
  }

  if (guess < target) {
    this.emit('too-low');
  }

  if (guess > target) {
    this.emit('too-high');
  }

  this.set('guessCount', this.get('guessCount') + 1);
}

function guessCount (count) {
  let max = this.get('maxGuesses');

  if (count === max) {
    return this.emit('game-over');
  }
}

export default { guess, guessCount };
