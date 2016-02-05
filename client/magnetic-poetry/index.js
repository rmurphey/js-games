import render from '../lib/render';
import { store } from './store';
import { initializeData } from './data';

import dictionaries from './components/dictionaries';
import dictionary from './components/dictionary';
import refrigerator from './components/refrigerator';

const content = document.getElementById('content');
const components = [
  dictionaries,
  dictionary,
  refrigerator
];

render(content, components, store.getState());

store.subscribe(() => {
  render(content, components, store.getState());
});

initializeData();
