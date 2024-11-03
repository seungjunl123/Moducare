import * as React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainPage from '../../Pages/MainPage';
import DiagnosisPage from '../../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../../Pages/Challenge/ChallengeMainPage';
import ReportNav from './ReportNav';
import EditUserPage from '../../Pages/User/EditUserPage';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const Tab = createBottomTabNavigator();

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Octicons name="home" color={color} size={size} />
);

const ChallengeIcon = ({color, size}: {color: string; size: number}) => (
  <Feather name="check-circle" color={color} size={size} />
);

const DiagnosisIcon = () => (
  <View style={styles.walkButton}>
    <SimpleLineIcons name="camera" color="white" size={40} />
  </View>
);

const ReportIcon = ({color, size}: {color: string; size: number}) => (
  <Feather name="clipboard" color={color} size={size} />
);

const MoreIcon = ({color, size}: {color: string; size: number}) => (
  <Feather name="more-horizontal" color={color} size={size} />
);

export default function BottomNavBar({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#B9834E',
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: 'transparent',
          height: HEIGHT * 0.07,
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
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="챌린지"
        component={ChallengeMainPage}
        options={{
          tabBarIcon: ChallengeIcon,
        }}
      />
      <Tab.Screen
        name="Diagnosis"
        component={DiagnosisPage}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: DiagnosisIcon,
        }}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('ai');
          },
        })}
      />
      <Tab.Screen
        name="리포트"
        component={ReportNav}
        options={{
          tabBarIcon: ReportIcon,
        }}
      />
      <Tab.Screen
        name="더보기"
        component={EditUserPage}
        options={{
          tabBarIcon: MoreIcon,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  walkButton: {
    width: WIDTH * 0.17,
    height: WIDTH * 0.17,
    borderRadius: WIDTH * 0.09,
    top: HEIGHT * -0.025,
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
