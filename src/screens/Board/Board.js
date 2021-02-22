import React from 'react';
import {View, StyleSheet} from 'react-native';
import Grid from '../../components/Grid/Grid';

const Board = () => {
  return (
    <View style={styles.container}>
      <Grid w={10} h={24} />
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Board;
