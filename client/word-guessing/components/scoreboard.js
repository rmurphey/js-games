let scoreboardComponent = {
  render(state) {
    let remainingGuesses = state.maxGuesses - state.incorrectGuesses.size;
    let errors = state.errors.length ?
      `<p>${state.errors.join('<br>')}</p>` : '';

    return `<div class="scoreboard-component">
      <p>${remainingGuesses} guesses remaining</p>
      ${errors}
    </div>`;
  }
};

export default scoreboardComponent;
