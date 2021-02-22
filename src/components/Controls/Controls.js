import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const Controls = ({onLeft, onRight, onDown, onRotate}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLeft}>
        {/* <Image style={styles.img} source={ImgLeftFilled} /> */}
        <Text>Left Filled</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRight}>
        {/* <Image style={styles.img} source={ImgRightFilled} /> */}
        <Text>Right Filled</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDown}>
        {/* <Image style={styles.img} source={ImgDownArrow} /> */}
        <Text>Down Arrow</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRotate}>
        {/* <Image style={styles.img} source={ImgRotateArrow} /> */}
        <Text>Rotate Arrow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Controls;
