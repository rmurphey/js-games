function move({ x, y }, distance, angle) {
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

export { move };
