import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavBar from './Components/Navigation/BottomNavBar';
export default function App() {
  return (
    <NavigationContainer>
      <BottomNavBar />
    </NavigationContainer>
  );
}
