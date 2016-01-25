import config from '../config';
import { store } from '../store';

let gameOverComponent = {
  render(state) {
    return state.gameOver ? `<div class="game-over-component">
      <p>${config.strings[state.gameOver]}</p>
      <form>
        <input type="submit" value="Play again">
      </form>
    </div>` : '';
  },
  listeners() {
    return {
      form : [
        {
          event : 'submit',
          handler : function (e) {
            e.preventDefault();
            store.dispatch({
              type : 'RESET'
            });
          }
        }
      ]
    };
  }
};

export default gameOverComponent;
