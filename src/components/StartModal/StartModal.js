import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal} from 'react-native';

const StartModal = ({started, isGameOver, onTryAgain, onStartGame}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isGameOver}
      style={styles.modal}>
      <View style={styles.container}>
        <Text style={{fontSize: 64, fontWeight: '800'}}>
          <Text style={{color: 'blue'}}>T</Text>
          <Text style={{color: 'orange'}}>E</Text>
          <Text style={{color: 'yellow'}}>T</Text>
          <Text style={{color: 'green'}}>R</Text>
          <Text style={{color: 'red'}}>I</Text>
          <Text style={{color: 'cyan'}}>S</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            started ? onTryAgain() : onStartGame();
          }}>
          <Text style={{fontSize: 32, color: 'white', fontWeight: '500'}}>
            {started ? 'TRY AGAIN' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});

export default StartModal;
