import axios from 'axios';
import {getEncryptStorage} from '../util';
import axiosInstance from './../util/axios';
import Config from 'react-native-config';

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
  const {data} = await axiosInstance.post(`/tokens/refresh`, {refreshToken});

  return data;
};

const postLogout = async (fcmToken: string): Promise<void> => {
  const {data} = await axiosInstance.post(`/members/logout`, {fcmToken});

  return data;
};

const deleteMember = async (): Promise<void> => {
  const {data} = await axiosInstance.delete(`/members/`);

  return data;
};

const putMember = async (userInfo: RequestMember): Promise<void> => {
  try {
    // axiosInstance로 변경 필요
    const {data} = await axios.put(
      `${Config.API_URL}members/modify`,
      {
        name: userInfo.name,
        birth: userInfo.birth,
      },
      {
        headers: {
          Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
        },
      },
    );

    console.log(data);
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
  const {data} = await axiosInstance.post(`/member/social/kakao`, {
    accessToken,
    fcmToken,
  });
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
