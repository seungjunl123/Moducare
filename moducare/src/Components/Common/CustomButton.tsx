import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  Dimensions,
} from 'react-native';
import {colors} from '../../constants/colors';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';

interface CustomButtomProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium' | 'small';
  inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;
const CustomButtom = ({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtomProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <Pressable
      disabled={inValid}
      style={[
        styles.container,
        inValid && styles.inVaild,
        styles[variant],
        styles[size],
      ]}
      {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      justifyContent: 'center',
      marginHorizontal: 'auto',
    },
    inVaild: {
      opacity: 0.5,
    },
    filled: {
      backgroundColor: colors[theme].MAIN,
    },
    outlined: {
      borderColor: colors[theme].MAIN,
      borderWidth: 3,
    },
    large: {
      width: '100%',
      paddingVertical: deviceHeight > 700 ? 15 : 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    medium: {
      width: '50%',
      paddingVertical: deviceHeight > 700 ? 12 : 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    small: {
      width: '30%',
      paddingVertical: deviceHeight > 700 ? 12 : 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: '100',
    },
    filledText: {
      color: '#fff',
      fontFamily: 'Pretendard-SemiBold',
    },
    outlinedText: {
      color: '#fff',
      fontFamily: 'Pretendard-SemiBold',
    },
  });

export default CustomButtom;
