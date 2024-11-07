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
  refreshToken: string;
};

type ResponseLogin = {
  name: string;
  email?: string;
  birth: string;
};
const postLogin = async ({
  fcmToken,
  refreshToken,
}: RequestLogin): Promise<ResponseLogin> => {
  const {data} = await axiosInstance.post(`members/fcm`, {
    fcmToken,
    refreshToken,
  });

  return data;
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

export {postLogin, postRefreshToken, postLogout, deleteMember, putMember};
export type {RequestLogin, ResponseLogin, ResponseAccess};
