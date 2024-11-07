import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import CustomText from '../../Components/Common/CustomText';
import CareItem from '../../Components/AI/CareItem';

const DiagnosisPick = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainArea}>
        <View style={styles.topArea}>
          <SvgIconAtom name={'CareItem'} />
          <View>
            <CustomText size={20} label="오진영 님의 두피에 맞는" />
            <CustomText size={20} label="상품들을 소개시켜 드릴게요." />
          </View>
        </View>
        <View style={styles.ListArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CareItem />
            <CareItem />
            <CareItem />
            <CareItem />
            <CareItem />
            <CareItem />
            <CareItem />
            <CareItem />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  mainArea: {
    flex: 1,
  },
  topArea: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 20,
  },
  ListArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE_GRAY,
    paddingTop: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  getListArea: {
    paddingVertical: 20,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.DARK_GRAY,
  },
});

export default DiagnosisPick;
