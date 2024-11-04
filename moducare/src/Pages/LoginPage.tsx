import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SvgIconAtom from '../Components/Common/SvgIconAtom';
import {colors} from '../constants/colors';

const LoginPage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainArea}>
          <SvgIconAtom style={{margin: 'auto'}} name="Logo" />
          <View style={styles.btnArea}>
            <Pressable style={[styles.btn, styles.kakao]}>
              <SvgIconAtom name="Kakao" />
              <Text style={styles.kakaoText}>카카오 로그인</Text>
              <View />
            </Pressable>
            <Pressable style={[styles.btn, styles.naver]}>
              <SvgIconAtom name="Naver" />
              <Text style={styles.naverText}>네이버 로그인</Text>
              <View />
            </Pressable>
          </View>
        </View>
        <View style={styles.ImgArea}>
          <SvgIconAtom name="MainSVG" />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center',
    borderColor: 'red',
  },
  mainArea: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  btnArea: {
    marginVertical: 20,
    gap: 10,
  },
  btn: {
    height: 40,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    margin: 'auto',
    elevation: 4,
  },
  kakaoText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    alignSelf: 'center',
  },
  naverText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: colors.WHITE,
    alignSelf: 'center',
  },
  kakao: {
    backgroundColor: '#FEE500',
  },
  naver: {
    backgroundColor: '#03C75A',
  },
  ImgArea: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginPage;
