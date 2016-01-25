let incorrectGuessesComponent = {
  render(state) {
    return state.incorrectGuesses.size ? `<div>
      <h3>Incorrect Guesses</h3>
      ${Array.from(state.incorrectGuesses).join(' ')}
    </div>` : '';
  }
};

export default incorrectGuessesComponent;
