import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
// import {colors} from '../../constants/colors';

interface CustomTextProps extends TextProps {
  label: string;
  variant?: 'bold' | 'regular';
  size?: number;
}

const CustomText = ({
  label,
  variant = 'bold',
  size = 15,
  ...props
}: CustomTextProps) => {
  return (
    <Text style={[styles[`${variant}Text`], {fontSize: size}]} {...props}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  boldText: {
    fontFamily: 'Pretendard-Bold',
  },
  regularText: {
    fontFamily: 'Pretendard-Medium',
  },
});

export default CustomText;
