import {AppState} from 'react-native';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';
import {colors} from '../constants/colors';
const displayNotification = async message => {
  const channelAnoucement = await notifee.createChannel({
    id: 'default',
    name: '카테고리 이름',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId: channelAnoucement,
      smallIcon: 'ic_app',
      largeIcon: 'ic_launcher',
      color: colors.MAIN,
      sound: 'sound',
    },
  });
};

export default {
  dispayNoti: remoteMessage => displayNotification(remoteMessage),
};
