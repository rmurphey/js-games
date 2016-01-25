import { store } from './store';

import incorrectGuesses from './components/incorrect-guesses';
import input from './components/input';
import scoreboard from './components/scoreboard';
import word from './components/word';
import gameOver from './components/gameOver';

// Rendered components will go here.
const content = document.getElementById('content');

// A list of the modules in the order they'll appear on the page.
let components = [ gameOver, word, input, incorrectGuesses, scoreboard ];
let boundListeners = [];

function addEvent (element, event, handler) {
  element.addEventListener(event, handler, false);
  return () => {
    element.removeEventListener(event, handler, false);
  };
}

function render (state) {
  // unbind event listeners
  boundListeners.forEach((unlisten) => unlisten());

  // empty out the content div
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  // generate the component markup and bind the event listeners
  components.forEach((c) => {
    let html = c.render(state);

    if (!html) {
      return;
    }

    let fragment = document.createRange().createContextualFragment(html);
    content.appendChild(fragment);

    if (!c.listeners) {
      return;
    }

    let listeners = c.listeners();

    Object.keys(listeners).forEach((selector) => {
      let lastChildNode = content.children[content.children.length - 1];
      let el = selector === 'self' ?
        lastChildNode :
        lastChildNode.querySelector(selector);

      if (!el) {
        return;
      }

      let events = listeners[selector];

      events.forEach((evt) => {
        addEvent(el, evt.event, evt.handler);
      });
    });
  });
}


// Do the initial render.
render(store.getState());

// When there are changes to the data in the store, re-render
// the application. The store itself will be set up in the
// store module, not here.
store.subscribe(() => render(store.getState()));
