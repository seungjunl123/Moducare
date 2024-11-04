import {useMutation, useQuery} from '@tanstack/react-query';
import {postLogin, postRefreshToken} from '../api/login-api';
import {removeEncryptStorage, setEncryptStorage} from '../util';
import {removeHeader, setHeader} from '../util/headers';
import {UseMutationCustomOptions} from '../types/common';
import {useEffect} from 'react';
import queryClinet from '../util/queryClient';

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    // onSuccess: ({accessToken, refreshToken}) => {
    //   setEncryptStorage('refreshToken', refreshToken);
    //   setHeader('Authorization', `Bearer ${accessToken}`);
    // },
    onSettled: () => {
      queryClinet.refetchQueries({queryKey: ['auth', 'getAccessToken']});
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
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
};

const useAuth = () => {
  const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();

  return {loginMutation, refreshTokenQuery};
};

export default useAuth;
