import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SplashPage from '../Pages/SplashPage';
import LoginPage from '../Pages/LoginPage';

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
    </Stack.Navigator>
  );
};

export default AuthStackNavigate;
