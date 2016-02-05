import { store } from '../store';
import { addCustomWord } from '../actions';

let customWord = {
  render() {
    return `<form>
      <label>Add a custom tile</label>
      <input type="text" name="custom-word"/>
      <button>Submit</button>
    </form>`;
  },
  listeners() {
    return {
      self : [
        {
          event : 'submit',
          handler : (e) => {
            let { value } = e.target.querySelector('input');
            e.preventDefault();
            store.dispatch(addCustomWord(value));
          }
        }
      ]
    };
  }
};

export default customWord;
