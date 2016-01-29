import render from '../lib/render';

import repl from './components/repl';
import { store } from './store';

const content = document.getElementById('content');
const components = [
  repl
];

render(content, components, store.getState());

store.subscribe(() => {
  render(content, components, store.getState());
});
