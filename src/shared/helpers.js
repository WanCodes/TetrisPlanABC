const types = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
const colors = [
  'yellow',
  'purple',
  'red',
  'blue',
  'orange',
  'green',
  'skyblue',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function createRandomBlock() {
  const object = {
    type: types[getRandomInt(0, 7)],
    color: colors[getRandomInt(0, 7)],
  };

  return object;
}

export function belongs(color) {
  return colors.includes(color);
}

export function rotate(array) {
  console.log(array);
  let m = array.length;
  let n = array[0].length;
  let matrix = [];
  //init the grid matrix
  for (let i = 0; i < m; i++) {
    matrix[i] = [];
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      matrix[j][m - 1 - i] = array[i][j];
    }
  }

  return matrix;
}
