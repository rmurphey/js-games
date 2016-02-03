let magnetProto = {
  render() {
    let { str, top, left } = this.word;
    let style = top && left ? `top:${top}px;left:${left}px` : '';

    return `<div
      style="${style}"
      class="magnet"
      draggable="true">${str}</magnet>`;
  },
  listeners() {
    let word = this.word;

    return {
      self : [
        {
          event : 'dragstart',
          handler : (e) => {
            word.offsetX = e.offsetX;
            word.offsetY = e.offsetY;

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
