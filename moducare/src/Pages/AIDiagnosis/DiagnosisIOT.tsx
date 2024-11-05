// import React, {useEffect, useRef} from 'react';
// import {Pressable, StyleSheet, View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {colors} from '../../constants/colors';
// import CustomText from '../../Components/Common/CustomText';
// import WebView from 'react-native-webview';
// import ViewShot from 'react-native-view-shot';

// const DiagnosisIOT = ({navigation}) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
//       <View style={styles.cameraArea}>
//         <WebView
//           source={{uri: 'http://192.168.137.49:8000/index.html'}}></WebView>
//       </View>
//       <Pressable
//         style={styles.BtnArea}
//         onPress={() => navigation.navigate('aiResult')}></Pressable>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.WHITE,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   cameraArea: {
//     width: 400,
//     height: 300,
//     marginVertical: 10,
//   },
//   BtnArea: {
//     width: 80,
//     height: 80,
//     borderWidth: 8,
//     borderRadius: 50,
//     borderColor: colors.MAIN,
//     backgroundColor: colors.WHITE,
//     marginTop: 50,
//     elevation: 4,
//   },
// });

// export default DiagnosisIOT;
import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import CustomText from '../../Components/Common/CustomText';
import WebView from 'react-native-webview';
import ViewShot from 'react-native-view-shot';

const DiagnosisIOT = ({navigation}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const viewShotRef = useRef<ViewShot | null>(null); // ViewShot의 ref

  const captureScreen = () => {
    // ViewShot으로 캡쳐
    if (viewShotRef.current) {
      viewShotRef.current.capture().then(uri => {
        // 캡쳐된 이미지의 URI를 상태에 저장
        setCapturedImage(uri);
        console.log(uri);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
      {/* ViewShot을 사용하여 웹뷰를 감쌈 */}
      <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
        <View style={styles.cameraArea}>
          <WebView source={{uri: 'http://192.168.137.49:8000/index.html'}} />
        </View>
      </ViewShot>
      <Pressable style={styles.BtnArea} onPress={captureScreen}></Pressable>

      {/* 캡쳐된 이미지가 있을 경우 보여주기 */}
      {capturedImage && (
        <View style={styles.capturedImageContainer}>
          <Image source={{uri: capturedImage}} style={styles.capturedImage} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cameraArea: {
    width: 400,
    height: 300,
    marginVertical: 10,
  },
  BtnArea: {
    width: 80,
    height: 80,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: colors.MAIN,
    backgroundColor: colors.WHITE,
    marginTop: 50,
    elevation: 4,
  },
  capturedImageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  capturedImage: {
    width: 400,
    height: 300,
  },
});

export default DiagnosisIOT;
