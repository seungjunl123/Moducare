import AuthStackNavigate from './AuthStackNavigate';
import StackNavigate from './StackNavigate';
import React, {useEffect} from 'react';
import useAuthStore from '../store/useAuthStore';
import {setupInterceptors} from '../util/headers';
const RootNavigate = () => {
  // 앱 시작 시 토큰 소지 여부를 인터셉터로 확인
  useEffect(() => {
    const checkToken = async () => {
      const isSuccess = await setupInterceptors();
      if (isSuccess) {
        useAuthStore.getState().setIsLoggedIn(true);
        console.log('토큰 설정 성공');
      }
    };
    checkToken();
  }, []);

  return (
    <>
      {useAuthStore.getState().isLoggedIn ? (
        <StackNavigate />
      ) : (
        <AuthStackNavigate />
      )}
    </>
  );
};

export default RootNavigate;
