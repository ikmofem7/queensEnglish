import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type Props = {
  text: string;
  style?: object;
};

const BoldText: React.FC<Props> = ({text, style}) => {
  return <Text style={{...styles.textStyle, ...style}}>{text}</Text>;
};

export default BoldText;

const styles = StyleSheet.create({
  textStyle: {fontWeight: 'bold', fontSize: 16, marginBottom: 6},
});
