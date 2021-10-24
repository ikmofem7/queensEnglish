import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppColor from '../Util/AppColor';

export type Props = {
  pressAction: () => void;
  title?: string;
};

const Button: React.FC<Props> = ({pressAction, title}) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={pressAction}>
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColor.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
});
