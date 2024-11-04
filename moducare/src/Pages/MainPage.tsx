import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import ItemBox from '../Components/ItemBox/ItemBox';
import MyCarousel from '../Components/Carousel/CarouselCard';
import CustomText from '../Components/Common/CustomText';
import CustomButton from '../Components/Common/CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
// 메인 캐러셀은 여기서 저장

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
export default function MainPage() {
  const navigation = useNavigation();
  const dummyData = [
    {
      id: 1,
      title: '최신 챌린지',
      img: require('../assets/img/Challenge.png'),
      buttonLabel: '보러가기',
      buttonOnPress: () => {
        navigation.navigate('challenge');
      },
    },
    {
      id: 2,
      title: '스트레스 진단',
      img: require('../assets/img/StressCheck.png'),
      buttonLabel: '보러가기',
      buttonOnPress: () => {
        navigation.navigate('stress');
      },
    },
    {
      id: 3,
      title: '최근 본 상품',
      img: 'https://reactnative.dev/img/tiny_logo.png',
      buttonLabel: '보러가기',
      buttonOnPress: () => {},
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerTextContainer}>
          <CustomText label="두피 사진을 통하여" size={20} />
          <CustomText label="AI가 두피 상태를 확인해 드려요." size={20} />
        </View>
        <Image
          style={styles.helloImage}
          source={require('../assets/img/MainCharacter.png')}
        />
        <CustomButton label="AI 자가 진단 시작" size="large" />
        <ItemBox>
          <CustomText label="오늘의 날씨 정보" size={20} />
          <View style={styles.weatherBox}>
            <View style={styles.weatherBoxItem}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={styles.weatherBoxImage}
              />
              <CustomText label="16℃" size={20} />
            </View>
            <View style={styles.weatherBoxItem}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={styles.weatherBoxImage}
              />
              <CustomText label="16℃" size={20} />
            </View>
            <View style={styles.weatherBoxItem}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={styles.weatherBoxImage}
              />
              <CustomText label="16℃" size={20} />
            </View>
          </View>
          <CustomText
            label="한 두줄 정도 나올 예정인데 일단 열심히 써서 두줄이 나오게 해봅시다 "
            size={16}
            variant="regular"
          />
        </ItemBox>
        <ItemBox>
          <CustomText label="진행중인 챌린지 정보" size={20} />
          <View style={styles.challengeBox}>
            <View style={styles.challengeBoxItem}>
              <Image
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
                style={styles.challengeBoxImage}
              />
              <Text style={styles.challengeBoxText}>챌린지 제목</Text>
              <Pressable
                onPress={() => navigation.navigate('challenge_list')}
                style={styles.challengeBoxArrow}>
                <Entypo name="forward" size={24} color={colors.MAIN} />
              </Pressable>
            </View>
          </View>
        </ItemBox>

        <View>
          <MyCarousel data={dummyData} isMain={true} />
        </View>
        <View style={{height: WINDOW_HEIGHT * 0.1}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    margin: 20,
    alignItems: 'center',
    gap: 20,
  },
  headerTextContainer: {
    marginStart: 20,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    marginStart: 20,
    fontWeight: 'bold',
  },
  boxHeaderText: {
    fontSize: 20,

    fontWeight: 'bold',
  },
  helloImage: {
    width: 200,
    height: 200,
  },
  startButton: {
    width: WINDOW_WIDTH * 0.9,
  },
  weatherBoxImage: {
    width: 70,
    height: 70,
  },
  weatherBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  weatherBoxItem: {
    alignItems: 'center',
    gap: 5,
  },
  challengeBox: {
    gap: 10,
    margin: 10,
  },
  challengeBoxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  challengeBoxImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  challengeBoxText: {
    marginStart: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  challengeBoxArrow: {
    marginLeft: 'auto',
  },
});
