import { store } from '../store';

let save = {
  render(state) {
    return `<div class="component-save">
      <button name="save" ${state.saved ? 'disabled="disabled"' : ''}>Save</button>
      <button name="load">Load</button>
    </div>`;
  },
  listeners() {
    return {
      'button[name="save"]' : [
        {
          event : 'click',
          handler : () => store.dispatch({
            type : 'SAVE'
          })
        }
      ],
      'button[name="load"]' : [
        {
          event : 'click',
          handler : () => store.dispatch({
            type : 'LOAD'
          })
        }
      ]
    };
  }
};

export default save;
