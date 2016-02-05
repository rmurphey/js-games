import { store } from '../store';
import { dictionaryChange } from '../actions';

let dictionaries = {
  render(state) {
    let options = state.dictionaries.map((d) => {
      return `<option
        value="${d}"
        ${d === state.currentDictionary ? 'selected' : ''}
      >${d}</option>`;
    });

    return `<form>
      <label>Select a dictionary</label>
      <select name="dictionary">
        ${options}
      </select>
    </form>`;
  },
  listeners() {
    return {
      select : [
        {
          event : 'change',
          handler : (e) => {
            store.dispatch(dictionaryChange(e.target.value));
          }
        }
      ]
    };
  }
};

export default dictionaries;
