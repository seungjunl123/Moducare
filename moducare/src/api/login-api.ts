import {getEncryptStorage} from '../util';
import axiosInstance from './../util/axios';

type RequestMember = {
  name: string;
  birth: string;
};

type RequestLogin = {
  fcmToken: string;
  accessToken: string;
  registerId: 'kakao' | 'naver' | 'google';
};
interface ResponseLogin {
  jwtAccessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  birth: string;
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
  try {
    const refreshToken = await getEncryptStorage('refreshToken');

    if (!refreshToken) {
      console.log('리프레시 토큰이 없습니다.');
      throw new Error('리프레시 토큰이 없습니다.');
    }
    console.log('리프레시 토큰 있어요', refreshToken);
    const {data} = await axiosInstance.post('tokens/refresh', {refreshToken});
    console.log('리프레시 토큰 받아오기 성공', data);
    return data;
  } catch (error) {
    console.error('리프레시 토큰 에러', error);
    throw error;
  }
};

const postLogout = async (fcmToken: string): Promise<void> => {
  try {
    const {data} = await axiosInstance.post('members/logout', {fcmToken});

    return data;
  } catch (error) {
    console.error('로그아웃 실패', error);
    throw error;
  }
};

const deleteMember = async (): Promise<void> => {
  try {
    const {data} = await axiosInstance.delete('members');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const putMember = async (userInfo: RequestMember): Promise<void> => {
  try {
    // axiosInstance로 변경 필요
    const {data} = await axiosInstance.put('members/modify', {
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
  const {data} = await axiosInstance.post('members/social/kakao', {
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
