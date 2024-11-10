import AuthStackNavigate from './AuthStackNavigate';
import StackNavigate from './StackNavigate';
import React, {useEffect} from 'react';
import useAuthStore from '../store/useAuthStore';
import useAuth from '../hook/useAuth';
import SplashScreen from 'react-native-splash-screen';
const RootNavigate = () => {
  // const {isLoggedIn} = useAuthStore(state => state as {isLoggedIn: boolean});

  // return <>{isLoggedIn ? <StackNavigate /> : <AuthStackNavigate />}</>;

  const {isLogin, isLoginLoading} = useAuth();

  useEffect(() => {
    if (!isLoginLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isLoginLoading]);

  return <>{isLogin ? <StackNavigate /> : <AuthStackNavigate />}</>;
};

export default RootNavigate;
