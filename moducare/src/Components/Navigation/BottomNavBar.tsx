import * as React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainPage from '../../Pages/MainPage';
import DiagnosisPage from '../../Pages/AIDiagnosis/DiagnosisPage';
import ChallengeMainPage from '../../Pages/Challenge/ChallengeMainPage';
import ReportNav from './ReportNav';
import EditUserPage from '../../Pages/User/EditUserPage';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useState} from 'react';
import SlideModal from '../Common/SlideModal';
import CustomButton from '../Common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import NaverLogin, {NaverLoginResponse} from '@react-native-seoul/naver-login';
import useAuthStore from '../../store/useAuthStore';
import AuthStackNavigate from '../../navigate/AuthStackNavigate';
import {deleteMember, postLogout} from '../../api/login-api';
import {getEncryptStorage} from '../../util';
import useAuth from '../../hook/useAuth';

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

function CustomTabBarButton() {
  const {setNaverLoginSuccess, setNaverLoginFailure, setIsLoggedIn} =
    useAuthStore(
      state =>
        state as {
          setNaverLoginSuccess: (
            value: NaverLoginResponse['successResponse'],
          ) => void;
          setNaverLoginFailure: (
            value: NaverLoginResponse['failureResponse'],
          ) => void;
          setIsLoggedIn: (value: boolean) => void;
          isLoggedIn: boolean;
        },
    );
  const navigation = useNavigation<any>();
  const [moreOpen, setMoreOpen] = useState(false);
  const {delUserMutation} = useAuth();
  const withdrawUser = async (): Promise<void> => {
    console.log('회원 탈퇴 시작');
    // await deleteMember();
    delUserMutation.mutate();
  };
  // const logout = async (): Promise<void> => {
  //   try {
  //     // 네이버 로그아웃 -> 전체 로그아웃으로 변경 필요
  //     // 카카오 상태관리도 그냥 초기아웃 하면 되나?
  //     await NaverLogin.logout();
  //     await Promise.all([
  //       setNaverLoginSuccess(undefined),
  //       setNaverLoginFailure(undefined),
  //       setIsLoggedIn(false),
  //     ]);
  //     setMoreOpen(false);

  //     // 로그아웃 상태 백엔드 전달
  //     const fcmToken = await getEncryptStorage('fcmToken');
  //     await postLogout(fcmToken);

  //     console.log('로그아웃 완료');
  //     // 로그인 화면으로 복귀.
  //     setTimeout(() => {
  //       console.log('로그인 화면으로 복귀');
  //       navigation.navigate('AuthStack');
  //     }, 100);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  const {logoutMutation} = useAuth();
  const logout = async () => {
    const fcmToken = await getEncryptStorage('fcmToken');
    logoutMutation.mutate(fcmToken);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => setMoreOpen(!moreOpen)}>
        <Feather name="more-horizontal" color="#8E8E8E" size={25} />
        <Text style={styles.moreText}>더보기</Text>
      </TouchableOpacity>
      <SlideModal visible={moreOpen} onClose={() => setMoreOpen(!moreOpen)}>
        <View style={styles.moreModal}>
          <CustomButton
            label="내 정보 수정"
            onPress={() => {
              setMoreOpen(false);
              navigation.navigate('회원 정보 수정');
            }}
          />
          <CustomButton label="로그아웃" onPress={logout} />
          <CustomButton label="회원 탈퇴" onPress={withdrawUser} />
        </View>
      </SlideModal>
    </>
  );
}

export default function BottomNavBar({navigation}: {navigation: any}) {
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
          tabBarButton: () => CustomTabBarButton(),
        }}
      />
      {/* <Tab.Screen
        name="AuthStack"
        component={AuthStackNavigate}
        options={{
          tabBarButton: () => null,
          tabBarStyle: {
            display: 'none',
          },
        }}
      /> */}
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
  moreButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    marginTop: 4,
    paddingBottom: 8,
    fontSize: 12,
  },
  moreModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});