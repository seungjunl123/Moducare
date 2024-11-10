import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SvgIconAtom from '../Components/Common/SvgIconAtom';
import {colors} from '../constants/colors';
import NaverLogin, {NaverLoginResponse} from '@react-native-seoul/naver-login';
import useAuthStore from '../store/useAuthStore';
import {getEncryptStorage} from '../util';
import {getProfile} from '@react-native-seoul/kakao-login';
import {initializeKakaoSDK} from '@react-native-kakao/core';
import {login} from '@react-native-kakao/user';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import useAuth from '../hook/useAuth';

initializeKakaoSDK('585639d392d8089816cb2f337aea44d9');

const LoginPage = ({navigation}) => {
  const {loginMutation} = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const handleKakaoLogin = () => {
    console.log('ee');
    login().then(console.log).catch(console.log);
  };

  const {setNaverLoginSuccess, setNaverLoginFailure} = useAuthStore(
    state =>
      state as {
        setNaverLoginSuccess: (
          value: NaverLoginResponse['successResponse'],
        ) => void;
        setNaverLoginFailure: (
          value: NaverLoginResponse['failureResponse'],
        ) => void;
      },
  );
  const onNaverLogin = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login();
    setNaverLoginSuccess(successResponse);
    setNaverLoginFailure(failureResponse);
    if (successResponse) {
      const fcmToken = await getEncryptStorage('fcmToken');
      loginMutation.mutate({
        fcmToken,
        accessToken: successResponse.accessToken,
        registerId: 'naver',
      });
      navigation.navigate('bottomNavigate');
    } else {
      console.log('네이버 로그인 실패', failureResponse);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.Google_CLIENT_ID as string,
      offlineAccess: true,
    });
  }, []);

  const onGoogleLogin = async () => {
    console.log('구글 로그인');
    try {
      await GoogleSignin.hasPlayServices();
      console.log('signIn 시작');
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        // read user's info
        console.log(userInfo);
        navigation.navigate('bottomNavigate');
      } else {
        console.log('userInfo 없음');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
            console.log('구글 로그인 코드 에러', error);
          // some other error happened
        }
      } else {
        console.log('구글 로그인 에러', error);
        // an error that's not related to google sign in occurred
      }
    }
  };

  const getUserInfo = async accessToken => {
    const user = await getProfile();
    console.log('사용자 정보', user);
    return user;
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainArea}>
          <SvgIconAtom style={{margin: 'auto'}} name="Logo" />
          <View style={styles.btnArea}>
            <Pressable
              style={[styles.btn, styles.kakao]}
              onPress={() => navigation.navigate('kakaoLogin')}>
              <SvgIconAtom name="Kakao" />
              <Text style={styles.kakaoText}>카카오 로그인</Text>
              <View />
            </Pressable>
            <Pressable
              style={[styles.btn, styles.naver]}
              onPress={() => navigation.navigate('naverLogin')}>
              <SvgIconAtom name="Naver" />
              <Text style={styles.naverText}>네이버 로그인</Text>
              <View />
            </Pressable>
            <Pressable
              style={[styles.btn, styles.naver]}
              onPress={onNaverLogin}>
              <SvgIconAtom name="Naver" />
              <Text style={styles.naverText}>네이버 로그인 테스트</Text>
              <View />
            </Pressable>
            <Pressable
              style={[styles.btn, styles.google]}
              onPress={onGoogleLogin}>
              <SvgIconAtom name="Google" />
              <Text style={styles.naverText}>구글 로그인</Text>
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
    backgroundColor: colors.WHITE,
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
  google: {
    backgroundColor: '#4285F4',
  },
  ImgArea: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginPage;
