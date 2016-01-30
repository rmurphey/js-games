import { store } from '../store';
import { replEnterAction } from '../actions';

let repl = {
  render(state) {
    return `
      <form><textarea>${state.replValue}</textarea></form>
    `;
  },
  postRender(rootEl, state) {
    let textarea = rootEl.querySelector('textarea');
    textarea.focus();
    let pos = state.replValue.length;
    textarea.setSelectionRange(pos, pos);
  },
  listeners() {
    return {
      textarea : [
        {
          event : 'keyup',
          handler : (e) => {
            if (e.keyCode !== 13) {
              return;
            }

            store.dispatch(replEnterAction(e.target.value));
          }
        }
      ]
    };
  }
};

export default repl;
