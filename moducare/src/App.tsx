import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigate from './navigate/RootNavigate';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClinet from './util/queryClient';
import messaging from '@react-native-firebase/messaging';
import pushNoti from './util/pushNoti';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('[Background Remote Message]', remoteMessage);
  pushNoti.dispayNoti(remoteMessage);
});

export default function App() {
  const requestGeolocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '위치 권한',
            message: '현재 위치 정보가 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const requestNotificationPermission = async () => {
    // 사용자에게 알림 권한 허용을 요청한다, 설정된 권한 상태를 반환한다
    const settings = await notifee.requestPermission();

    // 권한 상태는 settings.authorizationStatus로 확인할 수 있다
    if (settings.authorizationStatus >= AuthorizationStatus.DENIED) {
      return true;
    } else return false;
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };

  React.useEffect(() => {
    requestNotificationPermission();
    // 위치 권한이 MainPage에서 요청해야 잘 들어오는데,
    // 나중에 실제 폰에서 테스트 해봐야 할듯
    // requestGeolocationPermission();
    getFcmToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('[Remote Message] ', JSON.stringify(remoteMessage));
      pushNoti.dispayNoti(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClinet}>
      <NavigationContainer>
        <RootNavigate />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
