import {useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {
  check,
  PERMISSIONS,
  Permission,
  RESULTS,
} from 'react-native-permissions';
import {alerts} from '../constants';

type PermissionType = 'CAM' | 'PHOTO' | 'DOCUMENT';

type PerssionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissons: PerssionOS = {
  CAM: PERMISSIONS.ANDROID.CAMERA,
  PHOTO: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  DOCUMENT: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const usePermission = (type: PermissionType) => {
  useEffect(() => {
    (async () => {
      const permissonOS = androidPermissons[type];
      const checked = await check(permissonOS);
      console.log('checked', checked);

      switch (checked) {
        case RESULTS.GRANTED:
          break;
        case RESULTS.BLOCKED:
        case RESULTS.DENIED:
        case RESULTS.LIMITED:
          Alert.alert(
            alerts[`${type}_PERMISSION`].TITLE,
            alerts[`${type}_PERMISSION`].DESCRIPTION,
            [
              {
                text: '설정하기',
                onPress: () => Linking.openSettings(),
              },
              {
                text: '취소',
                style: 'cancel',
              },
            ],
          );
      }
      // await request(permissonOS);
    })();
  }, []);
};

export default usePermission;
