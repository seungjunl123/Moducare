import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colors} from '../../constants/colors';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';
// import {colors} from '../../constants/colors';

interface CustomTextProps extends TextProps {
  label: string | undefined;
  variant?: 'bold' | 'regular';
  size?: number;
  color?: string;
}

const CustomText = ({
  label,
  variant = 'bold',
  size = 15,
  ...props
}: CustomTextProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <Text style={[styles[`${variant}Text`], {fontSize: size}]} {...props}>
      {label}
    </Text>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    boldText: {
      fontFamily: 'Pretendard-Bold',
      verticalAlign: 'middle',
      color: colors[theme].BLACK,
    },
    regularText: {
      fontFamily: 'Pretendard-Medium',
      verticalAlign: 'middle',
      color: colors[theme].BLACK,
    },
  });

export default CustomText;
