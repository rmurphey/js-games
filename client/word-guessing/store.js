import Store from '../lib/store';
import config from './config';

let handlers = {
  GUESS(state, action) {
    let { guess } = action;
    let errors = [];

    guess = guess.replace(/\s/g, '').toLowerCase();

    if (!/^[a-z]$/.test(guess)) {
      errors.push(config.strings.ERRORS.REQUIRE_LETTER);
      return Object.assign({}, state, {
        errors : errors
      });
    }

    if (
      state.incorrectGuesses.has(guess) ||
      state.correctGuesses.has(guess)
    ) {
      errors.push(config.strings.ERRORS.ALREADY_GUESSED);
      return Object.assign({}, state, {
        errors : errors
      });
    }

    if (state.targetWordParts.has(guess)) {
      let correctGuesses = new Set(state.correctGuesses).add(guess);

      return Object.assign({}, state, {
        gameOver : correctGuesses.size === state.targetWordParts.size ? 'WIN' : false,
        correctGuesses,
        errors : []
      });
    }

    let incorrectGuesses = new Set(state.incorrectGuesses).add(guess);

    return Object.assign({}, state, {
      gameOver : incorrectGuesses.size === state.maxGuesses ? 'LOSS' : false,
      incorrectGuesses,
      errors : []
    });
  },
  RESET() {
    return initialData();
  }
};

function getTargetWord (words) {
  return words[Math.floor(Math.random() * words.length)];
}

function initialData () {
  let targetWord = getTargetWord(config.words);

  return {
    targetWord,
    targetWordParts : new Set(targetWord.split('')),
    guessCount : 0,
    maxGuesses : config.maxGuesses,
    correctGuesses : new Set(),
    incorrectGuesses : new Set(),
    errors : [],
    gameOver : false
  };
}

let store = Store(initialData, handlers);

export { store };
