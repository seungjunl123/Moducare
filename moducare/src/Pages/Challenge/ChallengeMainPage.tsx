import * as React from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import CustomButtom from '../../Components/Common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/colors';
import SmallList from './../../Components/Challenge/SmallList';

export default function ChallengeMainPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainArea}>
        <View style={styles.topArea}>
          <SvgIconAtom name={'Challenge'} />
          <View>
            <CustomText size={20} label="챌린지를 통해" />
            <CustomText size={20} label="모두와 함께 두피를 지켜요." />
          </View>
        </View>
        <View style={styles.ListArea}>
          <View style={styles.ListTitle}>
            <CustomText label="진행중인 챌린지 목록" size={20} />
            <Entypo name="chevron-right" color={colors.BLACK} size={25} />
          </View>
          <ScrollView>
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
          </ScrollView>
        </View>
        <View style={styles.ListArea}>
          <View style={styles.ListTitle}>
            <CustomText label="챌린지 목록 살펴보기" size={20} />
            <Entypo name="chevron-right" color={colors.BLACK} size={25} />
          </View>
          <View>
            <SmallList />
            <SmallList />
            <SmallList />
          </View>
        </View>
      </View>
      <View>
        <CustomButtom
          label="챌린지 생성하기"
          onPress={() => Alert.alert('er')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  mainArea: {
    flex: 0.9,
  },
  topArea: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 20,
  },
  listBoxArea: {
    gap: 10,
  },
  ListArea: {
    flex: 0.5,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ListTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
});
