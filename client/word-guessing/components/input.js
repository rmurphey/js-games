import { store } from '../store';

let inputComponent = {
  render() {
    return `<form>
      <input type="text" name="guess">
      <input type="submit" value="Submit">
    </form>`;
  },
  listeners() {
    return {
      self : [
        {
          event : 'submit',
          handler : function (e) {
            e.preventDefault();

            let guess = e.target.querySelector('input[type="text"]').value;

            store.dispatch({
              type : 'GUESS',
              guess
            });
          }
        }
      ]
    };
  }
};

export default inputComponent;
