import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import CustomButton from '../Common/CustomButton';
import CustomText from '../Common/CustomText';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

// 타입 정의 추가
interface MainCarouselItem {
  id: number;
  img: string;
  title: string;
  buttonLabel: string;
  buttonOnPress: () => void;
}

interface DiaryCarouselItem {
  img: string;
  regDate: string;
}

interface CarouselProps {
  isMain: boolean;
  data: MainCarouselItem[] | DiaryCarouselItem[];
}

const MyCarousel: React.FC<CarouselProps> = ({isMain, data}) => {
  const renderItem = ({item}: {item: MainCarouselItem | DiaryCarouselItem}) => {
    if (isMain) {
      return (
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <CustomText label={item.title} variant="bold" size={24} />
          </View>
          <Image source={item.img} style={styles.img} />
          <View style={styles.buttonContainer}>
            <CustomButton
              label={item.buttonLabel}
              onPress={item.buttonOnPress}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.diaryCard}>
          <Image source={{uri: item.img}} style={styles.dairyImg} />
        </View>
      );
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={WIDTH * 0.6}
        layout="default"
        inactiveSlideScale={0.9}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  card: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  img: {
    marginTop: 10,
    marginBottom: 10,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  diaryCard: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.35,
  },
  dairyImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '80%',
  },
  titleContainer: {
    marginTop: 5,
  },
});
