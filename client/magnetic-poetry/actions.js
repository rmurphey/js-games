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

export {
  addToDictionary,
  addToRefrigerator
};
