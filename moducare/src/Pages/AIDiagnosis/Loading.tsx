import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import CustomText from '../../Components/Common/CustomText';
import {useFocusEffect} from '@react-navigation/native';
import {useAiDiagnosisMutation} from '../../quires/useReportsQuery';

const Loading = ({route, navigation}) => {
  const {mutateAsync} = useAiDiagnosisMutation();
  const {file} = route.params;

  const postAiData = async () => {
    console.log('넘어온파일', file);
    const res = await mutateAsync(file);
    navigation.navigate('aiResult', {
      type: 'diagnosis',
      diagnosisResult: res,
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      postAiData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <SvgIconAtom name="AiLoading" />
      <CustomText label="AI가 두피를 들여다 보고 있어요!" size={20} />
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
    gap: 20,
  },
});

export default Loading;
