import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import SvgIconAtom from './SvgIconAtom';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';

interface FeedJoinNavProps {
  onJoin: () => void;
}

const FeedJoinNav = ({onJoin}: FeedJoinNavProps) => {
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <Pressable style={[styles.BtnArea, styles.PickArea]}>
        <SvgIconAtom name="List" />
        <Text style={[styles.text, {color: colors.WHITE}]}>
          인증목록 둘러보기
        </Text>
      </Pressable>
      <View style={styles.line} />
      <Pressable style={styles.BtnArea} onPress={onJoin}>
        <SvgIconAtom name="Join" />
        <Text style={styles.text}>챌린지 같이하기</Text>
      </Pressable>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      marginHorizontal: 'auto',
      marginVertical: 30,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderColor: colors[theme].MAIN,
      borderWidth: 1,
      borderRadius: 20,
      elevation: 20,
    },
    line: {
      width: 1,
      backgroundColor: colors[theme].GRAY,
      marginHorizontal: 5,
    },
    BtnArea: {
      padding: 10,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    PickArea: {
      backgroundColor: colors[theme].MAIN,
    },
    text: {
      fontSize: 16,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].MAIN,
      alignSelf: 'center',
      marginLeft: 10,
    },
  });

export default FeedJoinNav;
