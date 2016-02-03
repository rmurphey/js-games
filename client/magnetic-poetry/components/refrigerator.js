import magnetFactory from './magnet';
import { store } from '../store';
import { addToRefrigerator } from '../actions';

let refrigerator = {
  render(state) {
    this.children = state.refrigeratorWords.map(magnetFactory);
    return `<div class="refrigerator"></div>`;
  },
  listeners() {
    return {
      self : [
        {
          event : 'dragover',
          handler : (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
          }
        },
        {
          event : 'drop',
          handler : (e) => {
            e.preventDefault();

            store.dispatch(
              addToRefrigerator({
                word : JSON.parse(e.dataTransfer.getData('text/plain'))
              })
            );
          }
        }
      ]
    };
  }
};

export default refrigerator;
