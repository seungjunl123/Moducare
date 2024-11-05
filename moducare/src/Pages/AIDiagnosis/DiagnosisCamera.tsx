import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import CustomText from '../../Components/Common/CustomText';
import usePermission from '../../hook/usePermission';
import {useNavigation} from '@react-navigation/native';
import useAppState from '../../hook/useAppState';

const DiagnosisCamera = () => {
  const navigation = useNavigation<Navigation>();
  usePermission('CAM');
  const {isComeback} = useAppState();
  console.log('isComback', isComeback);
  return (
    <SafeAreaView style={styles.container}>
      <CustomText label="두피가 잘 나오게 사진을 찍어주세요." size={20} />
      <View style={styles.cameraArea}></View>
      <Pressable
        style={styles.BtnArea}
        onPress={() => navigation.navigate('aiResult')}></Pressable>
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
    width: '100%',
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
});

export default DiagnosisCamera;
