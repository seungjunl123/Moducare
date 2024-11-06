import AuthStackNavigate from './AuthStackNavigate';
import StackNavigate from './StackNavigate';
import React from 'react';

const RootNavigate = () => {
  const isLoggin = true;

  return <>{isLoggin ? <StackNavigate /> : <AuthStackNavigate />}</>;
};

export default RootNavigate;
