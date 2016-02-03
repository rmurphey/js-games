import magnetFactory from './magnet';
import { store } from '../store';
import { addToDictionary } from '../actions';

let dictionary = {
  render(state) {
    this.children = state.dictionaryWords.map(magnetFactory);
    return `<div class="dictionary"></div>`;
  },
  listeners() {
    return {
      self : [
        {
          event : 'dragover',
          handler : (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }
        },
        {
          event : 'drop',
          handler : (e) => {
            e.preventDefault();
            store.dispatch(
              addToDictionary({
                word : JSON.parse(e.dataTransfer.getData('text/plain'))
              })
            );
          }
        }
      ]
    };
  }
};

export default dictionary;
