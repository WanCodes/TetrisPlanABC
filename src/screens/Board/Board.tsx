import React from 'react';
import {View, StyleSheet} from 'react-native';
import Grid from '../../components/Grid/Grid';

const Board: React.FC = () => {
  return (
    <View style={styles.container}>
      <Grid w={10} h={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Board;
