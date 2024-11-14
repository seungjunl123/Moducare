import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, View, Image, Text, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import CustomText from '../../Components/Common/CustomText';
import usePermission from '../../hook/usePermission';
import {useNavigation} from '@react-navigation/native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import CustomButtom from '../../Components/Common/CustomButton';
import {postAiDiagnosis, ResponseAiDiagnosis} from '../../api/ai-api';
import {usePopup} from '../../hook/usePopup';
import PopupModal from '../../Components/Common/PopupModal';
import {Button} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';

const DiagnosisCamera = () => {
  const navigation = useNavigation();
  usePermission('CAM');
  const {visible, option, content, showPopup, hidePopup} = usePopup();
  const [res, setRes] = useState<ResponseAiDiagnosis>();
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const [imageUri, setImageUri] = useState<string | null>(null); // 사진 URI 상태

  const [zoom, setZoom] = useState(0); // 줌 상태를 관리
  const [dragStart, setDragStart] = useState(0); // 드래그 시작 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 여부
  // PanGestureHandler의 드래그 이동을 처리
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: dragX}}],
    {useNativeDriver: true},
  );

  const dragX = useState(new Animated.Value(0))[0]; // 드래그 이동값

  const handleGestureEnd = () => {
    setIsDragging(false);
  };

  // 드래그 이동에 따른 줌 값 계산
  const handleZoom = () => {
    dragX.addListener(({value}) => {
      let newZoom = zoom - value * 0.002; // 드래그 이동에 따른 줌 비율
      if (newZoom > 1) newZoom = 1; // 최대 줌
      if (newZoom < 0) newZoom = 0; // 최소 줌
      setZoom(newZoom);
    });
  };

  useEffect(() => {
    handleZoom();
  }, [dragX]);

  // 사진 촬영 함수
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        setImageUri(`file://` + photo.path); // 사진 URI를 상태로 설정
        console.log(photo.path); // 콘솔에서 경로 확인
      } catch (error) {
        console.error('사진 촬영 실패:', error);
      }
    }
  };

  const handleAiDiagnosis = async () => {
    //검사진행
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri, // 사진 URI
      type: 'image/jpeg', // 이미지 파일 타입 (예시로 jpeg 사용)
      name: 'photo.jpg', // 파일명
    });
    showPopup({
      option: 'Loading',
      content: '검사 진행중',
    });
    try {
      console.log('시작하기');
      const res = await postAiDiagnosis(formData);
      setRes(res);
      if (res.comparison) {
        showPopup({
          option: 'confirmMark',
          content: '검사 완료!',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지 삭제 함수
  const handleImageDelete = () => {
    setImageUri(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
      {imageUri ? (
        <>
          {/* 사진 촬영 후 이미지 보여주기 */}
          <View style={styles.cameraArea}>
            <Image source={{uri: imageUri}} style={styles.capturedImage} />
          </View>
          <View style={styles.PhotoBtnArea}>
            <CustomButtom
              label="재 촬영"
              size="small"
              onPress={handleImageDelete}
            />
            <CustomButtom
              label="검사 진행"
              size="small"
              onPress={handleAiDiagnosis}
            />
          </View>
        </>
      ) : (
        <>
          {/* 사진을 찍지 않았을 때 카메라 화면 보여주기 */}
          <View style={styles.cameraArea}>
            <Camera
              ref={cameraRef} // ref를 Camera에 연결
              style={styles.cameraStyle}
              device={device}
              isActive={true}
              focusable={true}
              photo={true}
              zoom={zoom}
            />
          </View>
          {/* <View style={styles.controls}>
            <Button title="Zoom In" onPress={handleZoomIn} />
            <Button title="Zoom Out" onPress={handleZoomOut} />
            <Text>현재 줌: {zoom.toFixed(1)}</Text>
          </View> */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={handleGestureEnd}>
            <Animated.View style={styles.overlay}>
              <Text style={styles.zoomText}>줌: {zoom.toFixed(2)}</Text>
            </Animated.View>
          </PanGestureHandler>
          <Pressable style={styles.BtnArea} onPress={handleTakePhoto} />
        </>
      )}
      <PopupModal
        visible={visible}
        option={option}
        onClose={() => {
          if (option === 'confirmMark') {
            hidePopup();
            navigation.navigate('aiResult', {
              type: 'diagnosis',
              diagnosisResult: res,
            });
          }
        }}
        content={content}
      />
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
    borderWidth: 1,
    borderColor: colors.WHITE,
    width: '100%',
    height: 300,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center', // 카메라 영역 가운데 정렬
  },
  cameraStyle: {
    width: '100%',
    height: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지 크기에 맞게 조정
  },
  PhotoBtnArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    marginTop: 50,
    elevation: 4,
  },
  controls: {
    marginTop: 20,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  zoomText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DiagnosisCamera;

// import React, {useEffect, useRef, useState} from 'react';
// import {Pressable, StyleSheet, View, Image, Text, Animated} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {colors} from '../../constants/colors';
// import CustomText from '../../Components/Common/CustomText';
// import usePermission from '../../hook/usePermission';
// import {useNavigation} from '@react-navigation/native';
// import {Camera, useCameraDevice} from 'react-native-vision-camera';
// import CustomButtom from '../../Components/Common/CustomButton';
// import {postAiDiagnosis, ResponseAiDiagnosis} from '../../api/ai-api';
// import {usePopup} from '../../hook/usePopup';
// import PopupModal from '../../Components/Common/PopupModal';
// import {PanGestureHandler} from 'react-native-gesture-handler';

// const DiagnosisCamera = () => {
//   const navigation = useNavigation();
//   usePermission('CAM');
//   const {visible, option, content, showPopup, hidePopup} = usePopup();
//   const [res, setRes] = useState<ResponseAiDiagnosis>();
//   const cameraRef = useRef<Camera>(null);
//   const device = useCameraDevice('back');
//   const [imageUri, setImageUri] = useState<string | null>(null); // 사진 URI 상태

//   const [zoom, setZoom] = useState(0); // 줌 상태를 관리
//   const dragX = useState(new Animated.Value(0))[0]; // 드래그 이동값

//   // PanGestureHandler의 드래그 이동을 처리
//   const onGestureEvent = Animated.event(
//     [{nativeEvent: {translationX: dragX}}],
//     {useNativeDriver: false}, // 애니메이션 드라이버를 false로 설정
//   );

//   // 드래그 이동에 따른 줌 값 계산
//   const handleZoom = () => {
//     dragX.addListener(({value}) => {
//       let newZoom = zoom - value * 0.1; // 드래그 이동에 따른 줌 비율
//       if (newZoom > 16) newZoom = 16; // 최대 줌
//       if (newZoom < 0) newZoom = 0; // 최소 줌
//       setZoom(newZoom);
//     });
//   };

//   useEffect(() => {
//     handleZoom(); // 드래그 이동에 따른 줌을 업데이트
//     return () => dragX.removeAllListeners(); // 컴포넌트가 언마운트되면 리스너 제거
//   }, [dragX, zoom]);

//   // 사진 촬영 함수
//   const handleTakePhoto = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePhoto({
//           flash: 'off',
//         });
//         setImageUri(`file://` + photo.path); // 사진 URI를 상태로 설정
//         console.log(photo.path); // 콘솔에서 경로 확인
//       } catch (error) {
//         console.error('사진 촬영 실패:', error);
//       }
//     }
//   };

//   const handleAiDiagnosis = async () => {
//     //검사진행
//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUri, // 사진 URI
//       type: 'image/jpeg', // 이미지 파일 타입 (예시로 jpeg 사용)
//       name: 'photo.jpg', // 파일명
//     });
//     showPopup({
//       option: 'Loading',
//       content: '검사 진행중',
//     });
//     try {
//       console.log('시작하기');
//       const res = await postAiDiagnosis(formData);
//       setRes(res);
//       if (res.comparison) {
//         showPopup({
//           option: 'confirmMark',
//           content: '검사 완료!',
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // 이미지 삭제 함수
//   const handleImageDelete = () => {
//     setImageUri(null);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
//       {imageUri ? (
//         <>
//           {/* 사진 촬영 후 이미지 보여주기 */}
//           <View style={styles.cameraArea}>
//             <Image source={{uri: imageUri}} style={styles.capturedImage} />
//           </View>
//           <View style={styles.PhotoBtnArea}>
//             <CustomButtom
//               label="재 촬영"
//               size="small"
//               onPress={handleImageDelete}
//             />
//             <CustomButtom
//               label="검사 진행"
//               size="small"
//               onPress={handleAiDiagnosis}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           {/* 사진을 찍지 않았을 때 카메라 화면 보여주기 */}
//           <View style={styles.cameraArea}>
//             <Camera
//               ref={cameraRef} // ref를 Camera에 연결
//               style={styles.cameraStyle}
//               device={device}
//               isActive={true}
//               focusable={true}
//               photo={true}
//               zoom={zoom}
//             />
//           </View>

//           {/* 드래그 가능한 영역 추가 */}
//           <PanGestureHandler onGestureEvent={onGestureEvent}>
//             <Animated.View style={styles.overlay}>
//               <Text style={styles.zoomText}>줌: {zoom.toFixed(2)}</Text>
//             </Animated.View>
//           </PanGestureHandler>

//           {/* 촬영 버튼 */}
//           <Pressable style={styles.BtnArea} onPress={handleTakePhoto} />
//         </>
//       )}

//       <PopupModal
//         visible={visible}
//         option={option}
//         onClose={() => {
//           if (option === 'confirmMark') {
//             hidePopup();
//             navigation.navigate('aiResult', {
//               type: 'diagnosis',
//               diagnosisResult: res,
//             });
//           }
//         }}
//         content={content}
//       />
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
//     borderWidth: 1,
//     borderColor: colors.WHITE,
//     width: '100%',
//     height: 300,
//     marginVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center', // 카메라 영역 가운데 정렬
//   },
//   cameraStyle: {
//     width: '100%',
//     height: '100%',
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
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   capturedImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover', // 이미지 크기에 맞게 조정
//   },
//   PhotoBtnArea: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 50,
//     marginTop: 50,
//     elevation: 4,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 100, // 드래그 가능한 영역의 높이
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   zoomText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default DiagnosisCamera;

// import React, {useState, useRef, useEffect} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Pressable,
//   Image,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {Camera, useCameraDevice} from 'react-native-vision-camera';
// import {
//   GestureHandlerRootView,
//   PinchGestureHandler,
// } from 'react-native-gesture-handler';
// import Reanimated, {
//   useSharedValue,
//   useAnimatedProps,
//   interpolate,
//   Extrapolation,
// } from 'react-native-reanimated';
// import {colors} from '../../constants/colors';
// import CustomText from '../../Components/Common/CustomText';
// import usePermission from '../../hook/usePermission';
// import CustomButtom from '../../Components/Common/CustomButton';
// import {postAiDiagnosis, ResponseAiDiagnosis} from '../../api/ai-api';
// import {usePopup} from '../../hook/usePopup';
// import PopupModal from '../../Components/Common/PopupModal';

// const DiagnosisCamera = () => {
//   const navigation = useNavigation();
//   usePermission('CAM'); // 권한 요청
//   const {visible, option, content, showPopup, hidePopup} = usePopup();
//   const [res, setRes] = useState<ResponseAiDiagnosis>();
//   const cameraRef = useRef<Camera>(null);
//   const device = useCameraDevice('back'); // 카메라 장치 가져오기
//   const [imageUri, setImageUri] = useState<string | null>(null); // 사진 URI 상태

//   // 줌 상태 및 핀치 제스처 처리
//   const zoom = useSharedValue(1); // 기본 줌 값은 1
//   const zoomOffset = useSharedValue(1);

//   const onPinchGestureEvent = event => {
//     const newZoom = zoomOffset.value * event.scale;
//     zoom.value = interpolate(
//       newZoom,
//       [1, 10], // 최대 줌 레벨을 10으로 설정
//       [device?.minZoom || 0, device?.maxZoom || 1],
//       Extrapolation.CLAMP,
//     );
//   };

//   const animatedProps = useAnimatedProps(() => ({
//     zoom: zoom.value,
//   }));

//   useEffect(() => {
//     if (!device) {
//       console.log('카메라 장치를 찾을 수 없습니다.');
//     }
//   }, [device]);

//   // 카메라 장치가 준비되었는지 확인
//   if (!device) {
//     return (
//       <Text>카메라 장치를 찾을 수 없습니다. 카메라 권한을 확인하세요.</Text>
//     );
//   }

//   const handleTakePhoto = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePhoto({
//           flash: 'off',
//         });
//         setImageUri(`file://` + photo.path); // 사진 URI를 상태로 설정
//       } catch (error) {
//         console.error('사진 촬영 실패:', error);
//       }
//     }
//   };

//   const handleAiDiagnosis = async () => {
//     // 검사 진행
//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUri, // 사진 URI
//       type: 'image/jpeg', // 이미지 파일 타입 (예시로 jpeg 사용)
//       name: 'photo.jpg', // 파일명
//     });
//     showPopup({
//       option: 'Loading',
//       content: '검사 진행중',
//     });
//     try {
//       const res = await postAiDiagnosis(formData);
//       setRes(res);
//       if (res.comparison) {
//         showPopup({
//           option: 'confirmMark',
//           content: '검사 완료!',
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleImageDelete = () => {
//     setImageUri(null);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
//       {imageUri ? (
//         <>
//           <View style={styles.cameraArea}>
//             <Image source={{uri: imageUri}} style={styles.capturedImage} />
//           </View>
//           <View style={styles.PhotoBtnArea}>
//             <CustomButtom
//               label="재 촬영"
//               size="small"
//               onPress={handleImageDelete}
//             />
//             <CustomButtom
//               label="검사 진행"
//               size="small"
//               onPress={handleAiDiagnosis}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           <View style={styles.cameraArea}>
//             <GestureHandlerRootView>
//               {/* Pinch 제스처 핸들러 사용 */}
//               <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
//                 <Reanimated.View
//                   style={StyleSheet.absoluteFillObject} // 화면 크기를 채우도록 설정
//                   device={device}
//                   isActive={true}
//                   animatedProps={animatedProps} // 줌을 애니메이션 값으로 직접 설정
//                 />
//               </PinchGestureHandler>
//             </GestureHandlerRootView>
//           </View>
//           <Pressable style={styles.BtnArea} onPress={handleTakePhoto} />
//         </>
//       )}
//       <PopupModal
//         visible={visible}
//         option={option}
//         onClose={() => {
//           if (option === 'confirmMark') {
//             hidePopup();
//             navigation.navigate('aiResult', {
//               type: 'diagnosis',
//               diagnosisResult: res,
//             });
//           }
//         }}
//         content={content}
//       />
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
//     width: '100%',
//     height: 300,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//   },
//   capturedImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   PhotoBtnArea: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 50,
//     marginTop: 50,
//   },
//   BtnArea: {
//     width: 80,
//     height: 80,
//     borderWidth: 8,
//     borderRadius: 50,
//     borderColor: colors.MAIN,
//     backgroundColor: colors.WHITE,
//     marginTop: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default DiagnosisCamera;
