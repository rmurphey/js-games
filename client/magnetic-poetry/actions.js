function addToRefrigerator({ word, top, left }) {
  let { str, id } = word;

  return {
    type : 'ADD_TO_REFRIGERATOR',
    word : { top, left, str, id }
  };
}

function addToDictionary({ word }) {
  return {
    type : 'ADD_TO_DICTIONARY',
    word : word
  };
}

function dictionaryChange(currentDictionary) {
  return {
    type : 'DICTIONARY_CHANGE',
    loading : true,
    currentDictionary
  };
}

function dictionaryLoaded(dictionaryWords) {
  return {
    type : 'DICTIONARY_LOADED',
    loading : false,
    dictionaryWords
  };
}

export {
  addToDictionary,
  addToRefrigerator,
  dictionaryChange,
  dictionaryLoaded
};
