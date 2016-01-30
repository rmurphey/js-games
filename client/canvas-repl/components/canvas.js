const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function moveFrom({ x, y }, distance, angle) {
  let quadrant = Math.floor(angle / 90);
  let transpose = [ 1, 3 ].includes(quadrant);
  let quadAngle = angle % 90;
  let radians = (quadAngle * Math.PI) / 180;

  let multipliers = [
    { x : 1, y : -1 },
    { x : 1, y : 1 },
    { x : -1, y : 1 },
    { x : -1, y : -1 }
  ][quadrant];

  return {
    x : x + (multipliers.x * distance * Math[
      transpose ? 'cos' : 'sin'
    ](radians)),
    y : y + (multipliers.y * distance * Math[
      transpose ? 'sin' : 'cos'
    ](radians))
  };
}

function parseRepl ({ replValue }) {
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
    if (line.match(/^go \d+/)) {
      let distance = parseInt(line.split(' ')[1], 10);
      let point = moveFrom({ x, y }, distance, currentAngle);

      points.push(point);

      // We set new values for x and y so we can process the next line.
      x = point.x;
      y = point.y;
    }
  });

  return { points, currentAngle };
}

let canvasComponent = {
  render() {
    return `<canvas width="500" height="500"></canvas>`;
  },
  postRender(rootEl, state) {
    let context = rootEl.getContext('2d');
    let x = CANVAS_WIDTH / 2;
    let y = CANVAS_HEIGHT / 2;

    let { points, currentAngle } = parseRepl(state);

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

    let tip = moveFrom({ x, y }, 5, currentAngle);
    context.beginPath();
    context.arc(tip.x, tip.y, 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
  }
};

export default canvasComponent;
