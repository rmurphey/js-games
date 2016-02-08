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
      }),
      saved : false
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
      }),
      saved : false
    });
  },
  DICTIONARY_CHANGE(state, { currentDictionary, loading }) {
    return Object.assign({}, state, {
      currentDictionary,
      loading,
      saved : false
    });
  },
  DICTIONARY_LOADED(state, { loading, dictionaryWords }) {
    return Object.assign({}, state, {
      loading,
      dictionaryWords,
      refrigeratorWords : [],
      saved : false
    });
  },
  ADD_WORD(state, { word, id }) {
    return Object.assign({}, state, {
      dictionaryWords : state.dictionaryWords.concat([{
        str : word, id
      }]),
      currentDictionary : 'custom',
      dictionaries : state.dictionaries.concat([ 'custom' ]),
      saved : false
    });
  },
  SAVE_ERROR(state, { err }) {
    return Object.assign({}, state, {
      saved : false,
      saveError : err
    });
  },
  SAVE_COMPLETE(state, { data }) {
    return Object.assign({}, state, {
      saved : data.key,
      saveError : false
    });
  }
};

function initialData () {
  return {
    saved : false,
    loading : true,
    currentDictionary : 'poet',
    dictionaries : [
      'poet',
      'shakespeare'
    ],
    dictionaryWords : [
    ],
    refrigeratorWords : [
    ]
  };
}

let store = Store(initialData, handlers);

export { store };
