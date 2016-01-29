import { createStore } from 'redux';

function Store (initialDataFactory, handlers = {}) {
  function reducer (state = {}, action) {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
  }

  return createStore(reducer, initialDataFactory());
}

export default Store;
