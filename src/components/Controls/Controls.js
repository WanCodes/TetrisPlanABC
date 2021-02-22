import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Controls = ({onLeft, onRight, onDown, onRotate}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLeft}>
        <Icon name="ios-caret-back" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRight}>
        <Icon name="ios-caret-forward" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onDown}>
        <Icon name="ios-caret-down" size={30} color="#4F8EF7" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onRotate}>
        <Icon name="ios-sync" size={30} color="#4F8EF7" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
  },
});

export default Controls;
