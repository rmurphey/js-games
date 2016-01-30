import config from '../config';

const CANVAS_WIDTH = config.canvas.height;
const CANVAS_HEIGHT = config.canvas.width;

import { move } from '../lib/move';

let canvasComponent = {
  render() {
    return `<canvas width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"></canvas>`;
  },
  postRender(rootEl, state) {
    let context = rootEl.getContext('2d');
    let x = CANVAS_WIDTH / 2;
    let y = CANVAS_HEIGHT / 2;

    let { points, currentAngle } = state;

    context.beginPath();
    context.moveTo(x, y);

    // do the drawing ...
    points.forEach((point) => {
      context.lineTo(point.x, point.y);
      x = point.x;
      y = point.y;
    });

    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();

    let tip = move({ x, y }, 5, currentAngle);
    context.beginPath();
    context.arc(tip.x, tip.y, 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
  }
};

export default canvasComponent;
