import Store from '../lib/store';
import { parseRepl } from './lib/parse-repl.js';

let { localStorage } = window;

let handlers = {
  REPL_VALUE(state, action) {
    let { points, currentAngle } = parseRepl(action.data);

    return Object.assign({}, state, {
      replValue : action.data,
      saved : false,
      points,
      currentAngle
    });
  },
  SAVE(state) {
    let { replValue, points, currentAngle } = state;
    localStorage.setItem('canvas-repl', JSON.stringify({
      replValue, points, currentAngle
    }));
    return Object.assign({}, state, {
      saved : true
    });
  },
  LOAD(state) {
    let stored = localStorage.getItem('canvas-repl');

    if (!stored) {
      return state;
    }

    let {
      replValue,
      points,
      currentAngle
    } = JSON.parse(stored);

    return Object.assign({}, state, {
      saved : true,
      replValue,
      points,
      currentAngle
    });
  }
};

function initialData () {
  return {
    replValue : '',
    saved : false,
    points : [],
    currentAngle : 0
  };
}

let store = Store(initialData, handlers);

export { store };
