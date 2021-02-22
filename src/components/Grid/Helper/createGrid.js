export const createGrid = (w, h) => {
  let grid = [];
  let row = [];

  for (let i = 1; i <= h; i++) {
    //h is 20, so i want 20 rows
    for (let j = 1; j <= w; j++) {
      // w is 10
      let cell = 0;
      row.push(cell);
    }
    grid.push(row);
    row = [];
  }
  this.grid = grid;
  return grid;
};
