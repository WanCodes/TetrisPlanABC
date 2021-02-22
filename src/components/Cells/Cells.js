import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Cell from '../Cell/Cell';

const Cells = ({grid, gridRef, onChangeColor}) => {
  let size = 24;

  return grid.map((row, i) => {
    if (i < 4) {
      return (
        <View key={i} style={styles.gridRow}>
          {row.map((cell, j) => {
            let color = 'white';
            return (
              <TouchableOpacity
                key={j}
                onPress={() => onChangeColor(i, j, 'blue')}>
                <Cell ref={gridRef[i][j]} color={color} size={size} />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }

    return (
      <View key={i} style={{flexDirection: 'row'}}>
        {row.map((cell, j) => {
          // console.log('color is:', cell)
          let color = 'white';
          if (cell === 1) {
            color = 'blue';
          } else if (cell === 2) {
            color = 'green';
          }

          if (i < 4) {
            color = 'red';
          }

          return (
            <TouchableOpacity
              key={j}
              onPress={() => {
                return;
              }}>
              <Cell
                ref={gridRef[i][j]}
                borderWidth={1}
                color={color}
                size={size}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  gridRow: {
    height: 0,
    flexDirection: 'row',
  },
});

export default Cells;
