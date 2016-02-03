import Store from '../lib/store';

let handlers = {
  ADD_TO_REFRIGERATOR(state, { word }) {
    let { id } = word;
    return Object.assign({}, state, {
      refrigeratorWords : state.refrigeratorWords
        .filter((w) => {
          return w.id !== id;
        })
        .concat([ word ]),
      dictionaryWords : state.dictionaryWords.filter((w) => {
        return w.id !== id;
      })
    });
  },

  ADD_TO_DICTIONARY(state, { word }) {
    let { id } = word;
    return Object.assign({}, state, {
      dictionaryWords : state.dictionaryWords
        .filter((w) => {
          return w.id !== id;
        })
        .concat([ word ]),
      refrigeratorWords : state.refrigeratorWords.filter((w) => {
        return w.id !== id;
      })
    });
  }
};

function initialData () {
  return {
    dictionaryWords : [
      { id : 1, str : 'hello' },
      { id : 2, str : 'world' }
    ],
    refrigeratorWords : [
    ]
  };
}

let store = Store(initialData, handlers);

export { store };
