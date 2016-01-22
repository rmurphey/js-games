import {
  MSG_WIN, MSG_GAME_OVER, MSG_TOO_LOW, MSG_TOO_HIGH, ERRORS
} from './strings';

function View (config) {
  let { model, opts } = config;
  let { message, input, guessesText, form } = opts.elements;
  let { maxGuesses } = opts;

  function showMessage (msg) {
    message.innerHTML = msg;
  }

  function clear () {
    input.value = '';
  }

  function submitHandler (e) {
    e.preventDefault();
    model.set('guess', input.value);
    clear();
  }

  form.addEventListener('submit', submitHandler, true);

  model.listen('error', (err) => {
    showMessage(ERRORS[err]);
  });

  model.listen('change:guessCount', (count) => {
    guessesText.innerHTML = maxGuesses - count;
  });

  model.listen('game-over', () => {
    form.parentNode.removeChild(form);
    return showMessage(MSG_GAME_OVER);
  });

  model.listen('too-high', () => {
    return showMessage(MSG_TOO_HIGH);
  });

  model.listen('too-low', () => {
    return showMessage(MSG_TOO_LOW);
  });

  model.listen('win', () => {
    return showMessage(MSG_WIN);
  });
}

export default View;
