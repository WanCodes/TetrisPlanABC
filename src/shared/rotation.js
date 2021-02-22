const rotateShape = (type, p, rotation) => {
  let points = p;

  if (type === 'T') {
    points = rotateT(points, rotation);
  } else if (type === 'I') {
    points = rotateI(points, rotation);
  } else if (type === 'O') {
    //nothing
  } else if (type === 'S') {
    points = rotateS(points, rotation);
  } else if (type === 'Z') {
    points = rotateZ(points, rotation);
  } else if (type === 'J') {
    points = rotateJ(points, rotation);
  } else if (type === 'L') {
    points = rotateL(points, rotation);
  }

  return points;
};

const rotateT = (points, rotation) => {
  rotation = rotation % 4;
  switch (rotation) {
    case 1: {
      let temp = points[1];
      temp[0] += 1;
      temp[1] += 1;
      points.splice(1, 1, temp);
      break;
    }
    case 2: {
      let temp = points[0];
      temp[0] += 1;
      temp[1] -= 1;
      points.splice(0, 1, temp);
      break;
    }
    case 3: {
      let temp = points[2];
      temp[0] -= 1;
      temp[1] -= 1;
      points.splice(2, 1, temp);
      break;
    }
    default: {
      let temp = points[3];
      temp[0] -= 1;
      temp[1] += 1;
      points.splice(3, 1, temp);
    }
  }
  return points;
};

const rotateI = (points, rotation) => {
  rotation = rotation % 2;
  console.log('rotating I');
  // console.log(points);
  if (rotation === 1) {
    points[0][0] -= 1;
    points[0][1] += 2;
    points[1][0] = points[1][0];
    points[1][1] += 1;
    points[2][0] += 1;
    points[2][1] = points[2][1];
    points[3][0] += 2;
    points[3][1] -= 1;
  } else {
    points[0][0] += 1;
    points[0][1] -= 2;
    points[1][0] = points[1][0];
    points[1][1] -= 1;
    points[2][0] -= 1;
    points[2][1] = points[2][1];
    points[3][0] -= 2;
    points[3][1] += 1;
  }
  return points;
};

const rotateS = (points, rotation) => {
  rotation = rotation % 2;
  if (rotation === 1) {
    let first = points[0];
    let second = points[1];
    first[1] -= 1;
    second[0] += 2;
    second[1] -= 1;
    points.splice(0, 1, first);
    points.splice(1, 1, second);
  } else {
    let first = points[0];
    let second = points[3];
    first[1] += 1;
    second[0] -= 2;
    second[1] += 1;
    points.splice(0, 1, first);
    points.splice(3, 1, second);
  }
  return points;
};

const rotateZ = (points, rotation) => {
  rotation = rotation % 2;
  if (rotation === 1) {
    let first = points[0];
    let second = points[1];
    first[1] += 2;
    second[0] += 2;
    points.splice(0, 1, first);
    points.splice(1, 1, second);
  } else {
    let first = points[0];
    let second = points[3];
    first[1] -= 2;
    second[0] -= 2;
    points.splice(0, 1, first);
    points.splice(3, 1, second);
  }
  return points;
};

const rotateJ = (points, rotation) => {
  rotation = rotation % 4;
  switch (rotation) {
    case 1: {
      points[0][1] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[3][0] += 1;
      points[3][1] -= 1;
      break;
    }
    case 2: {
      points[2][0] -= 1;
      points[2][1] -= 1;

      points[3][0] -= 1;
      points[3][1] += 1;
      break;
    }
    case 3: {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][0] += 2;
      points[2][1] -= 1;

      points[3][0] += 1;
      points[3][1] -= 2;
      break;
    }
    default: {
      points[0][0] += 1;
      points[0][1] += 1;

      points[2][0] -= 2;

      points[3][0] -= 1;
      points[3][1] -= 1;
    }
  }
  return points;
};

const rotateL = (points, rotation) => {
  rotation = rotation % 4;
  switch (rotation) {
    case 1: {
      points[0][0] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[3][0] += 1;
      points[3][1] -= 1;
      break;
    }
    case 1: {
      points[0][1] += 2;

      points[1][0] -= 1;
      points[1][1] += 1;

      points[2][0] -= 2;

      points[3][0] -= 1;
      points[3][1] -= 1;
      break;
    }
    case 1: {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][0] += 2;
      points[2][1] -= 1;

      points[3][0] -= 1;
      break;
    }
    default: {
      points[0][1] += 1;

      points[1][0] += 1;

      points[2][1] -= 1;

      points[3][0] -= 1;
      points[3][1] -= 2;
    }
  }
  return points;
};

export default rotateShape;
