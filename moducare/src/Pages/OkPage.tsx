import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import CustomText from '../Components/Common/CustomText';
import axios from 'axios';
import Config from 'react-native-config';
import {getEncryptStorage} from '../util';
import {postLogin} from '../api/login-api';

const OkPage = ({route}) => {
  const {code} = route.params;
  console.log('도착', code);

  useEffect(() => {
    requestkakao(code);
  }, [code]);

  const requestkakao = async code => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: Config.KAKAO_API_KEY,
        redirect_uri: Config.KAKAO_RERIRECT,
        code,
      },
    });
    const fcmToken = await getEncryptStorage('fcmToken');
    console.log('response.data', response.data);

    const accessToken = response.data.access_token;
    const result = await postLogin({
      registerId: 'kakao',
      accessToken,
      fcmToken,
    });
    console.log('fcmToken', fcmToken);
    console.log('로그인 성공', result.jwtAccessToken);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomText label="로그인 중 입니다." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    margin: 'auto',
  },
});

export default OkPage;
