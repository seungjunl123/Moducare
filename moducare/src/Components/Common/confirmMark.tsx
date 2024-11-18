import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import confirmMark from '../../assets/lottie/confirmMark.json';
import {colors} from '../../constants/colors';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';

export default function ConfirmMark() {
  const {theme} = useThemeStorage();
  const style = styling(theme);
  return (
    <View style={style.container}>
      <Text style={style.doneText}>생성 완료</Text>
      <LottieView
        source={confirmMark}
        autoPlay
        loop={false}
        style={style.confirmMark}
      />
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 40,
    },
    confirmMark: {
      width: 50,
      height: 50,
    },
    doneText: {
      fontSize: 40,
      fontWeight: '900',
      color: colors[theme].MAIN,
      fontFamily: 'Pretendard-Medium',
      verticalAlign: 'middle',
    },
  });
