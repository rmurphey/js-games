import render from '../lib/render';

import repl from './components/repl';
import canvas from './components/canvas';
import save from './components/save';
import { store } from './store';

const content = document.getElementById('content');
const components = [
  repl,
  save,
  canvas
];

render(content, components, store.getState());

store.subscribe(() => {
  render(content, components, store.getState());
});
