import React from 'react';
import {Pressable, StyleSheet, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButtom from '../../Components/Common/CustomButton';
import {colors} from '../../constants/colors';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';

const ChallengeWritePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.UploadArea}>
        <SvgIconAtom name="Camera" style={{margin: 'auto'}} />
        <Text style={styles.UploadText}>
          챌린지 인증에 사용할 사진을 남에게 공유해요.
        </Text>
      </Pressable>
      <TextInput style={styles.InputArea} placeholder="  내용을 입력하세요." />
      <CustomButtom label="인증 완료" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderWidth: 3,
    padding: 20,
  },
  UploadArea: {
    marginVertical: 20,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  UploadText: {
    textAlign: 'center',
    color: colors.MAIN,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  InputArea: {
    backgroundColor: colors.WHITE_GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 0.5,
    marginBottom: 30,
  },
});

export default ChallengeWritePage;
