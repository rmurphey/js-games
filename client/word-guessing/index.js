import { store } from './store';

import render from '../lib/render';

import incorrectGuesses from './components/incorrect-guesses';
import input from './components/input';
import scoreboard from './components/scoreboard';
import word from './components/word';
import gameOver from './components/gameOver';

// Rendered components will go here.
const content = document.getElementById('content');

// A list of the modules in the order they'll appear on the page.
let components = [ gameOver, word, input, incorrectGuesses, scoreboard ];

// Do the initial render.
render(content, components, store.getState());

// When there are changes to the data in the store, re-render
// the application. The store itself will be set up in the
// store module, not here.
store.subscribe(() => {
  render(content, components, store.getState());
});
