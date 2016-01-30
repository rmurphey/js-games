import config from '../config';

const CANVAS_WIDTH = config.canvas.height;
const CANVAS_HEIGHT = config.canvas.width;

import { move } from '../lib/move';

function circle (context, { x, y }, radius, fill) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = fill || 'black';
  context.fill();
  return context;
}

function path (context, { x, y }, points) {
  context.beginPath();
  context.moveTo(x, y);

  // do the drawing ...
  points.forEach((point) => {
    context.lineTo(point.x, point.y);
    ({ x, y } = point);
  });

  context.strokeStyle = 'black';
  context.stroke();

  return { x, y };
}

let canvasComponent = {
  render() {
    return `<canvas
      width="${CANVAS_WIDTH}"
      height="${CANVAS_HEIGHT}"></canvas>`;
  },
  postRender(rootEl, state) {
    let context = rootEl.getContext('2d');
    let x = CANVAS_WIDTH / 2;
    let y = CANVAS_HEIGHT / 2;

    let { points, currentAngle } = state;

    let {
      x : finalX,
      y : finalY
    } = path(context, { x, y }, points);

    circle(context, { x : finalX, y : finalY }, 5, 'red');

    circle(
      context,
      move({ x : finalX, y : finalY }, 5, currentAngle),
      3,
      'black'
    );
  }
};

export default canvasComponent;
