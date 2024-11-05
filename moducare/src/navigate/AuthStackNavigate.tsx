import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashPage from '../Pages/SplashPage';
import LoginPage from '../Pages/LoginPage';
import KakaoLoginPage from '../Pages/KakaoLoginPage';

const AuthStackNavigate = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="splash"
        component={SplashPage}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="login"
        component={LoginPage}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="kakaoLogin"
        component={KakaoLoginPage}
        options={{headerShown: false, animationEnabled: true}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigate;
