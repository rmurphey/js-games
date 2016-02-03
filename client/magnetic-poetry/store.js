import Store from '../lib/store';

let handlers = {
  ADD_TO_REFRIGERATOR(state, { word }) {
    return Object.assign({}, state, {
      refrigeratorWords : state.refrigeratorWords.concat([ word ]),
      dictionaryWords : state.dictionaryWords.filter((w) => {
        return w !== word;
      })
    });
  },

  ADD_TO_DICTIONARY(state, { word }) {
    return Object.assign({}, state, {
      dictionaryWords : state.dictionaryWords.concat([ word ]),
      refrigeratorWords : state.refrigeratorWords.filter((w) => {
        return w !== word;
      })
    });
  }
};

function initialData () {
  return {
    dictionaryWords : [
      'hello',
      'world'
    ],
    refrigeratorWords : [
    ]
  };
}

let store = Store(initialData, handlers);

export { store };
