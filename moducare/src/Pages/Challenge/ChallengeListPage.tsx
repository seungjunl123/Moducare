import * as React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import {colors} from '../../constants/colors';
import BigList from '../../Components/Challenge/BigList';
import {getChallengeList, getListType} from '../../api/challenge-api';

export default function ChallengeListPage() {
  const [allList, setAllList] = React.useState<getListType[] | []>([]);
  const getListCompo = async () => {
    const allData = await getChallengeList();
    setAllList(allData);
  };
  React.useEffect(() => {
    getListCompo();
  }, []);

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
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <BigList />
            <BigList />
            <BigList />
            <BigList />
            <BigList />
            <BigList />
            <BigList />
            <BigList />
            <BigList /> */}
            {allList.length !== 0 ? (
              allList
                .slice(0, 3)
                .map((data, index) => (
                  <BigList
                    key={index}
                    title={data.challengeName}
                    user={data.challengeUser}
                  />
                ))
            ) : (
              <View style={styles.nullList}>
                <CustomText label="개설된 챌린지가 없어요" size={18} />
              </View>
            )}
            {allList.length !== 0 && (
              <Text style={styles.getListArea}>더보기</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 20,
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
  nullList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
