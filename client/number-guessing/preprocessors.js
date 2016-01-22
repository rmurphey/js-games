export default {
  guess (guess = '') {
    guess = guess.replace(/\s/g, '');
    return +guess;
  }
};
