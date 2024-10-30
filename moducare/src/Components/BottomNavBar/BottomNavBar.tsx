import * as React from 'react';
import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainPage from '../../Pages/MainPage';
import DiagnosisPage from '../../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../../Pages/Challenge/ChallengeMainPage';
import ReportPage from '../../Pages/Reports/ReportPage';
import EditUserPage from '../../Pages/User/EditUserPage';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

export default function BottomNavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#B9834E',
      }}>
      <Tab.Screen name="Main" component={MainPage} />
      <Tab.Screen name="Challenge" component={ChallengeMainPage} />
      <Tab.Screen
        name="Diagnosis"
        component={DiagnosisPage}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => {
            return <View style={styles.walkButton}></View>;
          },
        }}
      />
      <Tab.Screen name="Report" component={ReportPage} />
      <Tab.Screen name="EditUser" component={EditUserPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  walkButton: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: width * 0.09,
    top: height * -0.025,
    backgroundColor: '#A28E81',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
