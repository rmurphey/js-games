const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

function moveFrom({ x, y }, distance, direction) {
  // As the player enters a command like GO 10, we need
  // to translate that to a new point value. Whether we
  // increase or decrease x or y depends on the direction
  // we're pointed in, as defined by the current value of
  // `direction`. So, for example, a move to the south will
  // decrease y and make no change to x.
  //             N, E, S, W
  let xDelta = [ 0, 1, 0, -1 ];
  let yDelta = [ -1, 0, 1, 0 ];

  return {
    x : x + (xDelta[direction] * distance),
    y : y + (yDelta[direction] * distance)
  };
}

function parseRepl ({ replValue }) {
  let lines = replValue.split('\n');
  let x = CANVAS_WIDTH / 2;
  let y = CANVAS_HEIGHT / 2;
  let points = [];

  // As the player issues commands like TURN RIGHT,
  // this value will cycle through 0-3, where 0 represents
  // North, 1 represents East, etc.
  let direction = 0;

  lines.forEach((line) => {
    line = line.toLowerCase();

    // For lines that instruct a turn, we set the direction
    // and move to the next line.
    if (line === 'turn right') {
      direction = direction + 1;
      if (direction > 3) {
        direction = 0;
      }
      return;
    }

    if (line === 'turn left') {
      direction = direction - 1;
      if (direction < 0) {
        direction = 3;
      }
      return;
    }

    // For lines that instruct movement, we use the direction
    // and distance information to define a new x, y point.
    if (line.match(/^go \d+/)) {
      let distance = line.split(' ')[1];
      let point = moveFrom({ x, y }, distance, direction);

      points.push(point);

      // We set new values for x and y so we can process the next line.
      x = point.x;
      y = point.y;
    }
  });

  return points;
}

let canvasComponent = {
  render() {
    return `<canvas width="500" height="500"></canvas>`;
  },
  postRender(rootEl, state) {
    let context = rootEl.getContext('2d');
    let x = CANVAS_WIDTH / 2;
    let y = CANVAS_HEIGHT / 2;

    let points = parseRepl(state);
    // console.log(instructions);

    context.beginPath();
    context.moveTo(x, y);

    // do the drawing ...
    points.forEach((point) => {
      context.lineTo(point.x, point.y);
      x = point.x;
      y = point.y;
    });

    context.strokeStyle = 'green';
    context.stroke();

    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
  }
};

export default canvasComponent;
