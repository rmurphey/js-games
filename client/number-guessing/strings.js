import { min, max } from './config';

const ERRORS = {
  ERR_MUST_GUESS_NUMBER : 'You must guess a number',
  ERR_RANGE : `You must guess a number between ${min} and ${max}`
};

const MSG_WIN = 'You win!';
const MSG_GAME_OVER = 'Sorry, you are out of guesses.';
const MSG_TOO_LOW = 'Your guess is too low.';
const MSG_TOO_HIGH = 'Your guess is too high';

export {
  ERRORS, MSG_WIN, MSG_TOO_HIGH, MSG_TOO_LOW, MSG_GAME_OVER
};
