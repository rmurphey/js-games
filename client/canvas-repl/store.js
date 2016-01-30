import Store from '../lib/store';

let handlers = {
  REPL_VALUE(state, action) {
    return Object.assign({}, state, {
      replValue : action.data,
      saved : false
    });
  },
  SAVE(state) {
    window.localStorage.setItem('canvas-repl', state.replValue);
    return Object.assign({}, state, {
      saved : true
    });
  },
  LOAD(state) {
    let replValue = window.localStorage.getItem('canvas-repl');
    return Object.assign({}, state, {
      saved : true,
      replValue : replValue
    });
  }
};

function initialData () {
  return {
    replValue : '',
    saved : false
  };
}

let store = Store(initialData, handlers);

export { store };
