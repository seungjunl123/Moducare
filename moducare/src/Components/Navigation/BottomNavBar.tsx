import * as React from 'react';
import {Pressable, Text, View, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainPage from '../../Pages/MainPage';
import DiagnosisPage from '../../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../../Pages/Challenge/ChallengeMainPage';
import ReportPage from '../../Pages/Reports/ReportPage';
import EditUserPage from '../../Pages/User/EditUserPage';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

export default function BottomNavBar() {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#B9834E',
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: 'transparent',
          height: height * 0.07,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          paddingBottom: 12,
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="홈"
        component={MainPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="챌린지"
        component={ChallengeMainPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="check-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Diagnosis"
        component={DiagnosisPage}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color, size}) => {
            return (
              <View style={styles.walkButton}>
                <SimpleLineIcons name="camera" color="white" size={40} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="리포트"
        component={ReportPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="clipboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="더보기"
        component={EditUserPage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="more-horizontal" color={color} size={size} />
          ),
        }}
      />
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
