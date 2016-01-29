import { store } from '../store';

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

            store.dispatch({
              type : 'REPL_VALUE',
              data : e.target.value
            });
          }
        }
      ]
    };
  }
};

export default repl;
