import { store } from './store';
import { parseRepl } from './lib/parse-repl.js';

let { localStorage } = window;

function saveAction () {
  let { replValue, points, currentAngle } = store.getState();
  localStorage.setItem('canvas-repl', JSON.stringify({
    replValue, points, currentAngle
  }));

  return {
    type : 'SAVE'
  };
}

function loadAction () {
  let stored = localStorage.getItem('canvas-repl');

  if (!stored) {
    return {};
  }

  return {
    type : 'LOAD',
    data : JSON.parse(stored)
  };
}

function replEnterAction (replValue) {
  let { points, currentAngle } = parseRepl(replValue);

  return {
    type : 'REPL_VALUE',
    points,
    currentAngle,
    replValue
  };
}

export { saveAction, loadAction, replEnterAction };
