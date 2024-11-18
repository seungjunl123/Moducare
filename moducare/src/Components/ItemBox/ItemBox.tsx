import * as React from 'react';
import {View, StyleSheet, Dimensions, ViewStyle} from 'react-native';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';
import {colors} from '../../constants';

const {width} = Dimensions.get('window');

export default function ItemBox({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <View style={[styles.container, style]}>
      <View>{children}</View>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      elevation: 5,
      width: width * 0.9,
      borderRadius: 10,
      backgroundColor: colors[theme].WHITE,
      padding: 15,
    },
  });
