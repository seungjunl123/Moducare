import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axios';

const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};

// 인터셉터 설정 추가 -> 로그인 시 토큰이 있는지 확인해서 가져옴
const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
};

export {setHeader, removeHeader, setupInterceptors};
