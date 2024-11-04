import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import FeedNav from '../../Components/Common/FeedNav';
import FeedJoinNav from '../../Components/Common/FeedJoinNav';
import FeedItem from '../../Components/Challenge/FeedItem';

const ChallengeFeedPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[
          styles.text,
          {fontFamily: 'Pretendard-Bold', color: colors.BLACK},
        ]}>
        찬 바람으로 머리말리기
      </Text>
      <Text
        style={[
          styles.text,
          {fontFamily: 'Pretendard-Regular', color: colors.DARK_GRAY},
        ]}>
        다른 사람들과 함께 루틴을 지켜봐요!
      </Text>
      <FeedNav onPress={() => navigation.navigate('challenge_write')} />
      {/* <FeedJoinNav /> */}
      <ScrollView style={styles.FeedList} showsVerticalScrollIndicator={false}>
        <FeedItem />
        <FeedItem />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  FeedList: {
    flex: 1,
  },
});

export default ChallengeFeedPage;
