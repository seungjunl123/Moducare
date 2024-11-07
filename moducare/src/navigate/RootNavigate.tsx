import AuthStackNavigate from './AuthStackNavigate';
import StackNavigate from './StackNavigate';
import React from 'react';
import useAuthStore from '../store/useAuthStore';
const RootNavigate = () => {
  const {isLoggedIn} = useAuthStore(state => state as {isLoggedIn: boolean});

  return <>{isLoggedIn ? <StackNavigate /> : <AuthStackNavigate />}</>;
};

export default RootNavigate;
