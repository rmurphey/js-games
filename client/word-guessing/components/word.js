require('./word.css');

let wordComponent = {
  render(state) {
    let letters = Array.from(state.targetWordParts).map((letter) => {
      if (state.correctGuesses.has(letter)) {
        return `<span>${letter}</span>`;
      }
      return `<span>&nbsp;</span>`;
    }).join('');

    return `<div class="word-component">${letters}</div>`;
  }
};

export default wordComponent;
