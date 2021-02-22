import React from 'react';
import {View, StyleSheet} from 'react-native';

import Block from '../Block/Block';

const Preview = ({blocks}) => {
  return (
    <View style={styles.container}>
      {blocks.map((block) => {
        return <Block key={block.id} type={block.type} color={block.color} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingLeft: 10, alignItems: 'center'},
});

export default Preview;
