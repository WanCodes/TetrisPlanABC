import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  color: string;
  size: number;
  borderWidth: number;
}
interface State {
  color: string;
  size: number;
  borderWidth: number;
}

export default class Cell extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: props.color,
      size: props.size,
      borderWidth: props.borderWidth,
    };
  }

  changeColor(color: string): void {
    this.setState({color});
  }

  render(): React.ReactNode {
    const {color, size, borderWidth} = this.state;
    const dynamicStyle = {
      backgroundColor: color,
      width: size,
      height: size,
      borderWidth: color !== 'white' ? 1 : borderWidth,
    };

    return <View style={[styles.cell, dynamicStyle]} />;
  }
}

const styles = StyleSheet.create({
  cell: {
    borderColor: 'black',
  },
});
