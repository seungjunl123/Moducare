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
import DiagnosisFail from '../Pages/AIDiagnosis/DiagnosisFail';
import useThemeStorage from '../hook/useThemeStorage';
import {StyleSheet} from 'react-native';
import {ThemeMode} from '../types/common';

type RootStackParamList = {
  StressResultPage: {stressScore: number};
  bottomNavigate: undefined;
  main: undefined;
  ai: undefined;
  aiPick: {
    type: number;
    result: number[];
  };
  challenge_feed: {
    id: number;
    title: string;
    type: string;
  };
  challenge_write: {
    id: number;
  };
  aiResult: {
    type: 'report' | 'diagnosis';
    id: number | null;
    diagnosisResult: {
      img: string;
      result: number[];
      headType: number;
      comparison: number;
      manageComment: string;
      date: string;
    } | null;
  };
  aiIOT: undefined;
  aiCamera: undefined;
  aiLoading: undefined;
  aiFail: undefined;
  challenge: undefined;
  challenge_list: undefined;
  report: undefined;
  '회원 정보 수정': undefined;
  stress: undefined;
};

const StackNavigate = () => {
  const PrevIcon = () => (
    <Entypo name="chevron-left" color={colors[theme].BLACK} size={25} />
  );
  const Stack = createStackNavigator<RootStackParamList>();

  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <Stack.Navigator initialRouteName="bottomNavigate">
      <Stack.Screen name="main" component={MainPage} />
      <Stack.Screen
        name="ai"
        component={DiagnosisPage}
        options={{
          title: 'AI 두피 진단',
          headerTitleAlign: 'center',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="aiIOT"
        component={DiagnosisIOT}
        options={{
          title: 'AI 두피 진단 (IOT)',
          headerTitleAlign: 'center',
          headerBackImage: () => <PrevIcon />,
          animationEnabled: false,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="aiCamera"
        component={DiagnosisCamera}
        options={{
          title: 'AI 두피 진단 (Phone)',
          headerTitleAlign: 'center',
          headerBackImage: () => <PrevIcon />,
          animationEnabled: false,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
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
        name="aiFail"
        component={DiagnosisFail}
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
          headerLeft: () => null,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="aiPick"
        component={DiagnosisPick}
        options={{
          title: 'AI 상품 추천',
          headerTitleAlign: 'center',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="challenge"
        component={ChallengeMainPage}
        options={{
          title: '',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="challenge_list"
        component={ChallengeListPage}
        options={{
          title: '',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="challenge_feed"
        component={ChallengeFeedPage}
        options={{
          title: '',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen
        name="challenge_write"
        component={ChallengeWritePage}
        options={{
          title: '',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
      <Stack.Screen name="report" component={ReportPage} />
      <Stack.Screen
        name="회원 정보 수정"
        component={EditUserPage}
        options={{
          title: '회원 정보',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
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

      <Stack.Screen
        name="stress"
        component={StressDiagnosisPage}
        options={{
          title: '스트레스 자가 진단',
          headerTitleAlign: 'center',
          headerBackImage: () => <PrevIcon />,
          headerTitleStyle: {
            color: colors[theme].BLACK,
          },
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors[theme].WHITE,
      color: colors[theme].BLACK,
    },
  });

export default StackNavigate;

export type {RootStackParamList};
