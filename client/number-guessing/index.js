import Model from './model';
import View from './view';
import validators from './validators';
import preprocessors from './preprocessors';
import handlers from './handlers';
import { min, max, maxGuesses } from './config';

const doc = window.document;
const message = doc.getElementById('message');
const form = doc.querySelector('form');
const input = doc.querySelector('input[name="guess"]');
const guessesText = doc.getElementById('remaining-guesses');

View({
  model : Model({
    maxGuesses,
    guessCount : 0,
    target : Math.floor(Math.random() * min) + max
  }, { handlers, preprocessors, validators }),
  opts : {
    maxGuesses,
    elements : {  message, form, input, guessesText }
  }
});
