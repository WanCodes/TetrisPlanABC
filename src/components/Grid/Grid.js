import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Preview from '../Preview/Preview';
import {belongs, createRandomBlock} from '../../shared/helpers';
import rotateShape from '../../shared/rotation';

import Controls from '../Controls/Controls';
import StartModal from '../StartModal/StartModal';

import styles from './GridStyles';
import Cells from '../Cells/Cells';
import {createGrid} from './Helper';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      w: props.w,
      h: props.h,
      grid: [],
      blocks: this.generateBlocks(),
      numBlocks: 5,
      score: 0,
      started: false,
      gameOver: true,
    };

    this.grid = [];
    this.gridRef = [];
    this.currentBlock = 'J';
    this.rotation = 0;
    this.speed = 450;
    this.changeColor = this.changeColor.bind(this);
    this.checkColor = this.checkColor.bind(this);
  }

  componentDidMount() {
    this.setGrid();
    this.generateBlocks();
  }

  setGrid() {
    const {w, h} = this.state;
    let grid = createGrid(w, h);
    this.grid = grid;
    this.createGridRef(grid);
    this.setState({grid}, () => ({}));
  }

  createGridRef(grid) {
    this.gridRef = [];
    grid.forEach((gridRow, i) => {
      this.gridRef[i] = [];
      gridRow.forEach((blockRef, j) => {
        this.gridRef[i][j] = React.createRef();
      });
    });
  }

  startGame() {
    this.setState({gameOver: false, started: true, score: 0});
    this.loadNextBlock();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.tick();
    }, this.speed);
  }

  tryAgain() {
    this.setState({gameOver: false, score: 0}, () => {
      this.refresh();
      this.startGame();
    });
  }

  refresh() {
    for (let i = 4; i < 24; i++) {
      for (let j = 0; j < 10; j++) {
        this.changeColor(i, j, 'white');
      }
    }
  }

  checkColor(i, j) {
    if (i >= this.state.h || j >= this.state.w || j < 0) {
      return null;
    }
    return this.gridRef[i][j].current.state.color;
  }

  changeColor(i, j, color) {
    // console.log('changing color: ', i, j);
    let bin = color === 'white' ? 0 : 1;
    this.grid[i][j] = bin;
    this.gridRef[i][j].current.changeColor(color);
  }

  down() {
    clearInterval(this.interval);
    this.speed = 10;
    this.interval = setInterval(() => {
      this.tick();
    }, this.speed);
  }

  onRotate() {
    if (this.grid[3].includes(1)) {
      return;
    }

    this.rotation += 1;
    let color;
    let points = [];
    let previous = [];
    for (let i = 4; i < 24; i++) {
      //h is 20, so i want 20 rows
      for (let j = 0; j < 10; j++) {
        // w is 10
        if (belongs(this.checkColor(i, j))) {
          color = this.checkColor(i, j);
          this.changeColor(i, j, 'white');
          points.push([i, j]);
          previous.push([i, j]);
        }
      }
    }

    let rotated = rotateShape(this.currentBlock, points, this.rotation);
    if (this.canRotate(rotated)) {
      // console.log('valid rotation');
      rotated.map((point) => {
        this.changeColor(point[0], point[1], color);
      });
    } else {
      // console.log('invalid rotation');
      previous.map((point) => {
        this.changeColor(point[0], point[1], color);
      });
    }
  }

  canRotate(p) {
    let points = p;
    let canRotate = true;
    // console.log(points);
    points.map((point) => {
      if (point[0] === null || point[1] === null) {
        canRotate = false;
      } else {
        if (this.checkColor(point[0], point[1]) === null) {
          canRotate = false;
        }
        if (this.checkColor(point[0], point[1]) === 'gray') {
          canRotate = false;
        }
      }
    });
    return canRotate;
  }

  canShift(points, direction) {
    let can = true;
    const shift = direction === 'left' ? -1 : 1;
    points.map((point) => {
      if (this.checkColor(point.i, point.j + shift) === null) {
        can = false;
      }

      if (this.checkColor(point.i, point.j + shift) === 'gray') {
        can = false;
      }
    });
    return can;
  }

  shift(points, direction) {
    let shift = direction === 'left' ? -1 : 1;
    if (direction === 'right') {
      points = points.reverse();
    }
    points.map((point) => {
      this.changeColor(
        point.i,
        point.j + shift,
        this.checkColor(point.i, point.j),
      );
      this.changeColor(point.i, point.j, 'white');
    });
  }

  shiftCells(direction) {
    let points = [];
    for (let i = 4; i < 24; i++) {
      //h is 20, so i want 20 rows
      for (let j = 0; j < 10; j++) {
        // w is 10
        if (belongs(this.checkColor(i, j))) {
          if (i === 4) {
            return;
          }
          points.push({i, j});
        }
      }
    }

    let can = this.canShift(points, direction);
    if (can) {
      this.shift(points, direction);
    }
  }

  loadNextBlock() {
    this.speed = 450;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.tick();
    }, this.speed);

    let {blocks} = this.state;
    let next = blocks.splice(0, 1)[0];
    this.currentBlock = next.type;
    this.rotation = 0;
    // console.log(next);
    if (next.type === 'I') {
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
      this.changeColor(3, 6, next.color);
    } else if (next.type === 'O') {
      this.changeColor(2, 4, next.color);
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    } else if (next.type === 'T') {
      this.changeColor(2, 4, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    } else if (next.type === 'S') {
      this.changeColor(2, 4, next.color);
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
    } else if (next.type === 'Z') {
      this.changeColor(2, 3, next.color);
      this.changeColor(2, 4, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    } else if (next.type === 'J') {
      this.changeColor(2, 3, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    } else if (next.type === 'L') {
      this.changeColor(2, 5, next.color);
      this.changeColor(3, 3, next.color);
      this.changeColor(3, 4, next.color);
      this.changeColor(3, 5, next.color);
    }
    blocks.push({id: next.id + 5, ...createRandomBlock()});
    this.setState({blocks});
  }

  generateBlocks() {
    let blocks = [];
    for (let i = 0; i < 5; i++) {
      blocks.push({id: i, ...createRandomBlock()});
    }
    return blocks;
  }

  toString() {
    for (let i = 0; i < 24; i++) {
      console.log(this.grid[i]);
    }
  }

  clearRow(row) {
    console.log('clearing row', row);
    for (let j = 0; j < 10; j++) {
      this.changeColor(row, j, 'white');
    }

    for (let i = row; i >= 4; i--) {
      for (let k = 0; k < 10; k++) {
        if (this.checkColor(i - 1, k) != null) {
          this.changeColor(i, k, this.checkColor(i - 1, k));
        }
      }
      // if(this.grid[i-1] != null && !this.grid[i-1].includes(1)) {
      //     console.log('breaking on row', i);
      //     break;
      // }
    }
  }

  checkRowsToClear() {
    clearInterval(this.interval);
    let row_was_cleared = false;
    let num_rows_cleared = 0;
    let rows_to_clear = [];
    for (let i = 23; i >= 4; i--) {
      if (!this.grid[i].includes(0)) {
        console.log('adding row', i);
        rows_to_clear.push(i);
      }
    }

    rows_to_clear.map((r) => {
      this.clearRow(r);
      num_rows_cleared++;
      row_was_cleared = true;
    });

    if (row_was_cleared) {
      this.setState({score: this.state.score + 1000 * num_rows_cleared});
    }
  }

  canMoveDown(points) {
    let canmove = true;
    points.map((point) => {
      if (this.checkColor(point.i + 1, point.j) === null) {
        canmove = false;
      }
      if (this.checkColor(point.i + 1, point.j) === 'gray') {
        canmove = false;
      }
    });
    return canmove;
  }

  moveDown(points) {
    points.map((point) => {
      this.changeColor(point.i + 1, point.j, this.checkColor(point.i, point.j));
      this.changeColor(point.i, point.j, 'white');
    });
  }

  tick() {
    let points = [];
    const {grid, w, h} = this.state;
    for (let i = 23; i >= 0; i--) {
      //h is 20, so i want 20 rows
      for (let j = 9; j >= 0; j--) {
        // w is 10
        if (belongs(this.checkColor(i, j))) {
          points.push({i, j});
        }
      }
    }

    let can = this.canMoveDown(points);
    if (can) {
      this.moveDown(points);
    }

    if (!can && this.grid[3].includes(1)) {
      clearInterval(this.interval);
      for (let i = 23; i >= 0; i--) {
        //h is 20, so i want 20 rows
        for (let j = 9; j >= 0; j--) {
          // w is 10
          if (belongs(this.checkColor(i, j))) {
            // console.log('blue found on: ', i, j);
            this.changeColor(i, j, 'gray');
          }
        }
      }
      this.setState({gameOver: true});
      console.log('game over');
      return;
    }

    if (!can) {
      for (let i = 23; i >= 0; i--) {
        //h is 20, so i want 20 rows
        for (let j = 9; j >= 0; j--) {
          // w is 10
          if (belongs(this.checkColor(i, j))) {
            // console.log('blue found on: ', i, j);
            this.changeColor(i, j, 'gray');
          }
        }
      }
      //cant move down

      this.can = true;
      this.checkRowsToClear();
      this.loadNextBlock();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>TETRIS Plan ABC</Text>
          <Text style={styles.score}>Score: {this.state.score}</Text>
        </View>
        <View style={styles.gameContainer}>
          <View style={styles.cells}>
            <Cells
              grid={this.state.grid}
              gridRef={this.gridRef}
              onChangeColor={this.changeColor.bind(this)}
            />
          </View>
          <View style={styles.nextContainer}>
            <Text style={styles.nextText}>NEXT</Text>
            <Preview blocks={this.state.blocks} />
          </View>
        </View>
        <Controls
          onLeft={() => this.shiftCells('left')}
          onRight={() => this.shiftCells('right')}
          onDown={() => this.down()}
          onRotate={() => this.onRotate()}
        />
        <StartModal
          started={this.state.started}
          isGameOver={this.state.gameOver}
          onTryAgain={this.tryAgain.bind(this)}
          onStartGame={this.startGame.bind(this)}
        />
      </View>
    );
  }
}
