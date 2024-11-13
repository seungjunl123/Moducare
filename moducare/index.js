/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import notifee from '@notifee/react-native';
import {EventType} from '@notifee/react-native';

// notifee.onBackgroundEvent(({type, detail}) => {
//   const {notification, pressAction} = detail;

//   if (type === EventType.ACTION_PRESS && pressAction) {
//     // pressAction이 존재할 때만 처리하도록 추가 검증
//     if (pressAction.id === 'mark-as-read') {
//       console.log('백그라운드 클릭');
//       // 추가적인 처리를 여기에서 진행
//     }
//   } else {
//     console.log('pressAction이 없음');
//   }
// });

AppRegistry.registerComponent(appName, () => App);
