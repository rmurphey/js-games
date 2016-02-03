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

            let word = JSON.parse(e.dataTransfer.getData('text/plain'));
            let { target } = e;
            let { offsetX, offsetY } = word;

            while (!target.className.match('refrigerator')) {
              target = target.parentNode;
            }

            let { clientX, clientY } = e;
            let { top, left } = target.getBoundingClientRect();

            left = clientX - left - offsetX;
            top = clientY - top - offsetY;

            store.dispatch(
              addToRefrigerator({ word, top, left })
            );
          }
        }
      ]
    };
  }
};

export default refrigerator;
