import render from '../lib/render';
import { store } from './store';
import { initializeData } from './data';

import dictionaries from './components/dictionaries';
import dictionary from './components/dictionary';
import customWord from './components/custom-word';
import refrigerator from './components/refrigerator';
import save from './components/save';

const content = document.getElementById('content');
const components = [
  dictionaries,
  dictionary,
  customWord,
  refrigerator,
  save
];

render(content, components, store.getState());

store.subscribe(() => {
  render(content, components, store.getState());
});

initializeData();
