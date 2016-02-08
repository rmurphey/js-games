import { save } from '../actions';
import { store } from '../store';

let saveComponent = {
  render(state) {
    let { saved, saveError } = state;

    let link = saved ?
      `<p><a href="?poem=${saved}">permalink</a></p>` :
      '';

    let msg = saveError ?
      `<p>Error saving: ${saveError}</p>` :
      '';

    return `<form>
      <button ${saved ? 'disabled' : ''}>Save</button>
      ${msg || link}
    </form>`;
  },
  listeners() {
    return {
      button : [
        {
          event : 'click',
          handler : (e) => {
            e.preventDefault();
            e.stopPropagation();
            save((action) => {
              return store.dispatch(action);
            });
          }
        }
      ]
    };
  }
};

export default saveComponent;
