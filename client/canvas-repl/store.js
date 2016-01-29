import Store from '../lib/store';

let handlers = {
  REPL_VALUE(state, action) {
    return Object.assign({}, state, {
      replValue : action.data
    });
  }
};

function initialData () {
  return {
    replValue : ''
  };
}

let store = Store(initialData, handlers);

export { store };
