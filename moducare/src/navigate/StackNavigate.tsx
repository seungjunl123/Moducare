import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainPage from '../Pages/MainPage';
import DiagnosisPage from '../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../Pages/Challenge/ChallengeMainPage';
import StressDiagnosisPage from '../Pages/StressCheck/StressDiagnosisPage';
import ReportPage from '../Pages/Reports/ReportPage';
import BottomNavBar from '../Components/Navigation/BottomNavBar';
import ChallengeListPage from '../Pages/Challenge/ChallengeListPage';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import ChallengeFeedPage from '../Pages/Challenge/ChallengeFeedPage';
import ChallengeWritePage from '../Pages/Challenge/ChallengeWritePage';
import DiagnosisCamera from '../Pages/AIDiagnosis/DiagnosisCamera';
import Loading from '../Pages/AIDiagnosis/Loading';
import DiagnosisResult from '../Pages/AIDiagnosis/DiagnosisResult';
import DiagnosisPick from '../Pages/AIDiagnosis/DiagnosisPick';

import EditUserPage from '../Pages/User/EditUserPage';
import StressResultPage from '../Pages/StressCheck/StressResultPage';
import DiagnosisIOT from '../Pages/AIDiagnosis/DiagnosisIOT';
const StackNavigate = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="bottomNavigate">
      <Stack.Screen name="main" component={MainPage} />
      <Stack.Screen
        name="ai"
        component={DiagnosisPage}
        options={{
          title: 'AI 두피 진단',
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
        }}
      />
      <Stack.Screen
        name="aiIOT"
        component={DiagnosisIOT}
        options={{
          title: 'AI 두피 진단 (IOT)',
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="aiCamera"
        component={DiagnosisCamera}
        options={{
          title: 'AI 두피 진단 (Phone)',
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="aiLoading"
        component={Loading}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="aiResult"
        component={DiagnosisResult}
        options={{
          title: 'AI 두피 진단 결과지',
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
        }}
      />
      <Stack.Screen
        name="aiPick"
        component={DiagnosisPick}
        options={{
          title: 'AI 두피 진단 결과지',
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
        }}
      />
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
      <Stack.Screen
        name="challenge_feed"
        component={ChallengeFeedPage}
        options={{
          title: '',
          headerBackImage: () => (
            <Entypo name="chevron-left" color={colors.BLACK} size={25} />
          ),
        }}
      />
      <Stack.Screen
        name="challenge_write"
        component={ChallengeWritePage}
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

export default StackNavigate;
