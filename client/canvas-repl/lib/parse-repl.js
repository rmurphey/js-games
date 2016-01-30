import config from '../config';
import move from './move';

const CANVAS_WIDTH = config.canvas.height;
const CANVAS_HEIGHT = config.canvas.width;

function parseRepl (replValue) {
  let lines = replValue.split('\n');
  let x = CANVAS_WIDTH / 2;
  let y = CANVAS_HEIGHT / 2;

  let points = [];
  let currentAngle = 0;

  lines.forEach((line) => {
    line = line.toLowerCase();

    // For lines that instruct a turn, we set the direction
    // and move to the next line.
    if (line.match(/^turn right/)) {
      let angle = parseInt(line.split(' ')[2], 10);
      currentAngle += angle;
      if (currentAngle >= 360) {
        currentAngle = currentAngle - 360;
      }
    }

    if (line.match(/^turn left/)) {
      let angle = parseInt(line.split(' ')[2], 10);
      currentAngle -= angle;
      if (currentAngle < 0) {
        currentAngle = 360 + currentAngle;
      }
    }

    // For lines that instruct movement, we use the direction
    // and distance information to define a new x, y point.
    if (line.match(/^go/)) {
      let distance = parseInt(line.split(' ')[1], 10);
      let point = move({ x, y }, distance, currentAngle);

      points.push(point);

      // We set new values for x and y so we can process the next line.
      x = point.x;
      y = point.y;
    }
  });

  return { points, currentAngle };
}

export { parseRepl };
