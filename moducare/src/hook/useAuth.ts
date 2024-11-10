import {useMutation, useQuery} from '@tanstack/react-query';
import {postLogin, postRefreshToken} from '../api/login-api';
import {removeEncryptStorage, setEncryptStorage} from '../util';
import {removeHeader, setHeader} from '../util/headers';
import {UseMutationCustomOptions} from '../types/common';
import {useEffect} from 'react';
import queryClinet from '../util/queryClient';
import NaverLogin from '@react-native-seoul/naver-login';
import Config from 'react-native-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useAuthStore from '../store/useAuthStore';

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  const {setIsLoggedIn} = useAuthStore(
    state => state as {setIsLoggedIn: (value: boolean) => void},
  );
  useEffect(() => {
    // 네이버 로그인 초기화
    NaverLogin.initialize({
      appName: 'moducare',
      consumerKey: Config.NAVER_CLIENT_ID as string,
      consumerSecret: Config.NAVER_CLIENT_SECRET as string,
    });
    GoogleSignin.configure({
      webClientId: Config.Google_CLIENT_ID as string,
    });
  }, []);

  return useMutation({
    mutationFn: postLogin,
    onSuccess: data => {
      const {jwtAccessToken, refreshToken} = data;
      console.log('jwtAccessToken', jwtAccessToken);
      setEncryptStorage('refreshToken', refreshToken);
      setHeader('Authorization', `Bearer ${jwtAccessToken}`);
      setIsLoggedIn(true);
    },
    onSettled: () => {
      queryClinet.refetchQueries({queryKey: ['auth', 'getAccessToken']});
    },
    onError: () => {
      setIsLoggedIn(false);
    },
    ...mutationOptions,
  });
};

const useGetRefreshToken = () => {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: postRefreshToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`);
    }
  }, [isSuccess, data?.accessToken]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
};

function useAuth() {
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const isLogin = refreshTokenQuery.isSuccess;

  return {loginMutation, refreshTokenQuery, isLogin};
}

export default useAuth;
