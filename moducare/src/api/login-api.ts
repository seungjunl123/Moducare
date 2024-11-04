import {getEncryptStorage} from '../util';
import axiosInstance from './../util/axios';

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

const putMember = async ({name, birth}: ResponseLogin): Promise<void> => {
  const {data} = await axiosInstance.put(`/members/modify`, {name, birth});

  return data;
};

export {postLogin, postRefreshToken, postLogout, deleteMember, putMember};
export type {RequestLogin, ResponseLogin, ResponseAccess};
