function addToRefrigerator(word) {
  return {
    type : 'ADD_TO_REFRIGERATOR',
    word
  };
}

function addToDictionary(word) {
  return {
    type : 'ADD_TO_DICTIONARY',
    word
  };
}

export {
  addToDictionary,
  addToRefrigerator
};
