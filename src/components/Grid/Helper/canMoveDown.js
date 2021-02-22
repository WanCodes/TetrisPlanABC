export const canMoveDown = (points, checkColor) => {
  let canmove = true;
  points.map((point) => {
    if (checkColor(point.i + 1, point.j) === null) {
      canmove = false;
    }
    if (checkColor(point.i + 1, point.j) === 'gray') {
      canmove = false;
    }
  });
  return canmove;
};
