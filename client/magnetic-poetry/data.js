import { store } from './store';
import { dictionaryLoaded } from './actions';

let baseUrl = 'http://localhost:9000/magnetic-poetry';

function loadData () {
  let { currentDictionary, loading } = store.getState();

  if (!loading) {
    return;
  }

  fetch(`${baseUrl}/${currentDictionary}`, {
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

function saveData (cb) {
  let data = store.getState();

  fetch(`${baseUrl}/poem`, {
    mode : 'cors',
    method : 'POST',
    body : JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) {
      return cb(`${response.status}: ${response.statusText}`);
    }

    return response.text();
  }).then((txt) => {
    cb(null, JSON.parse(txt));
  });
}

function initializeData () {
  store.subscribe(loadData);
  loadData();
}

export {
  initializeData,
  saveData
};
