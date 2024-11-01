import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from './Components/Navigation/BottomNavBar';
import StackNavigate from './navigate/StackNavigate';
export default function App() {
  return (
    <NavigationContainer>
      {/* <BottomNavBar /> */}
      <StackNavigate />
    </NavigationContainer>
  );
}
