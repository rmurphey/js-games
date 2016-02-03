let magnetProto = {
  render() {
    return `<div class="magnet" draggable="true">${this.word.str}</magnet>`;
  },
  listeners() {
    let word = this.word;

    return {
      self : [
        {
          event : 'dragstart',
          handler : (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData(
              'text/plain', JSON.stringify(word)
            );
            e.target.classList.add('in-motion');
          }
        }
      ]
    };
  }
};

function magnetFactory (word) {
  let magnet = Object.create(magnetProto);
  magnet.word = word;
  return magnet;
}

export default magnetFactory;
