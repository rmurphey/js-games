import render from '../lib/render';
import { store } from './store';

import dictionary from './components/dictionary';
import refrigerator from './components/refrigerator';

const content = document.getElementById('content');
const components = [
  dictionary,
  refrigerator
];

render(content, components, store.getState());

store.subscribe(() => {
  render(content, components, store.getState());
});
