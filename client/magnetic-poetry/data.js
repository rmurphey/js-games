import { store } from './store';
import { dictionaryLoaded } from './actions';

function loadData () {
  let { currentDictionary, loading } = store.getState();

  if (!loading) {
    return;
  }

  fetch(`http://localhost:9000/magnetic-poetry/${currentDictionary}`, {
    mode : 'cors'
  }).then((response) => {
    return response.text();
  }).then((txt) => {
    let { words } = JSON.parse(txt);

    store.dispatch(
      dictionaryLoaded(words.map((str, id) => ({ str, id })))
    );
  });
}

function saveData (cb) {}

function initializeData () {
  store.subscribe(loadData);
  loadData();
}

export {
  initializeData,
  saveData
};
