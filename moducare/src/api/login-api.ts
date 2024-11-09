import {getEncryptStorage} from '../util';
import axiosInstance from './../util/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RequestMember = {
  name: string;
  birth: string;
};

type RequestLogin = {
  fcmToken: string;
  accessToken: string;
  registerId: 'kakao' | 'naver';
};
interface ResponseLogin {
  jwtAccessToken: string;
  refreshToken: string;
}

const postLogin = async ({
  registerId,
  fcmToken,
  accessToken,
}: RequestLogin): Promise<ResponseLogin> => {
  console.log('!!registerId', registerId);
  console.log('!!accessToken', accessToken);
  console.log('!!fcmToken', fcmToken);
  try {
    const {data} = await axiosInstance.post(`members/login/${registerId}`, {
      accessToken,
      fcmToken,
    });

    // 토큰 저장 -> 나중에 인터셉터로 확인
    await AsyncStorage.setItem('accessToken', data.jwtAccessToken);
    await AsyncStorage.setItem('refreshToken', data.refreshToken);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type ResponseAccess = {
  accessToken: string;
};

const postRefreshToken = async (): Promise<ResponseAccess> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.post(`tokens/refresh`, {refreshToken});

  return data;
};

const postLogout = async (fcmToken: string): Promise<void> => {
  try {
    const {data} = await axiosInstance.post(`/members/logout`, {fcmToken});

    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteMember = async (): Promise<void> => {
  try {
    const {data} = await axiosInstance.delete(`/members/`);

    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const putMember = async (userInfo: RequestMember): Promise<void> => {
  try {
    // axiosInstance로 변경 필요
    const {data} = await axiosInstance.put(`/members/modify`, {
      name: userInfo.name,
      birth: userInfo.birth,
    });

    console.log('회원 정보 변경 완료');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
type socialLoginType = {
  registerId: string;
  accessToken: string;
  fcmToken: string;
};
type socialResponse = {
  jwtAccessToken: string;
  refreshToken: string;
};
const postLoginKaKao = async ({
  accessToken,
  fcmToken,
}: socialLoginType): Promise<socialResponse> => {
  const {data} = await axiosInstance.post(`member/social/kakao`, {
    accessToken,
    fcmToken,
  });

  // 토큰 저장 필요 여부 진영 확인 필요
  // await AsyncStorage.setItem('accessToken', data.jwtAccessToken);
  // await AsyncStorage.setItem('refreshToken', data.refreshToken);

  console.log('데이터', data);
  return data;
};

export {
  postLoginKaKao,
  postLogin,
  postRefreshToken,
  postLogout,
  deleteMember,
  putMember,
};
export type {
  socialLoginType,
  socialResponse,
  RequestLogin,
  ResponseLogin,
  ResponseAccess,
};
