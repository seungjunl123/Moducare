import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import MainPage from '../Pages/MainPage';
import DiagnosisPage from '../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../Pages/Challenge/ChallengeMainPage';
import StressDiagnosisPage from '../Pages/StressCheck/StressDiagnosisPage';
import ReportPage from '../Pages/Reports/ReportPage';
import BottomNavBar from '../Components/Navigation/BottomNavBar';
import ChallengeListPage from '../Pages/Challenge/ChallengeListPage';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import EditUserPage from '../Pages/User/EditUserPage';
import StressResultPage from '../Pages/StressCheck/StressResultPage';
const StackNavigate = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="bottomNavigate">
      <Stack.Screen name="main" component={MainPage} />
      <Stack.Screen name="ai" component={DiagnosisPage} />
      <Stack.Screen name="challenge" component={ChallengeMainPage} />
      <Stack.Screen
        name="challenge_list"
        component={ChallengeListPage}
        options={{
          title: '',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
        }}
      />
      <Stack.Screen name="stress" component={StressDiagnosisPage} />
      <Stack.Screen name="report" component={ReportPage} />
      <Stack.Screen name="회원 정보 수정" component={EditUserPage} />
      <Stack.Screen
        name="StressResultPage"
        component={StressResultPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="bottomNavigate"
        component={BottomNavBar}
        options={{headerShown: false, animationEnabled: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
export default StackNavigate;
