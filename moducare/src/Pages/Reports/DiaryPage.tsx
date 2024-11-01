import {View, StyleSheet, Text, Modal, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../constants/colors';
import MyCarousel from '../../Components/Carousel/CarouselCard';
import CustomButton from '../../Components/Common/CustomButton';
import SlideModal from '../../Components/Common/SlideModal';

interface DiaryCarouselItem {
  img: string;
  regDate: string;
}

const lineImageList = [
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-04',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-03',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-02',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-01',
  },
];

const topImageList = [
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-05',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-04',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-03',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-02',
  },
  {
    img: 'https://reactnative.dev/img/tiny_logo.png',
    regDate: '2024-01-01',
  },
];

export default function DiaryPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [imgList, setImgList] = useState<DiaryCarouselItem[]>([]);
  const [isLine, setIsLine] = useState(false);

  useEffect(() => {
    setImgList(
      lineImageList.map(item => ({img: item.img, regDate: item.regDate})),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>머리 빠짐 유무를</Text>
        <Text style={styles.headerText}>사진을 통해 체크해보세요</Text>
      </View>
      <View>
        <MyCarousel isMain={false} data={isLine ? topImageList : imgList} />
      </View>
      <View>
        <View style={styles.uploadButtonGroup}>
          <CustomButton
            label="정수리"
            variant={isLine ? 'outlined' : 'filled'}
            size="small"
            onPress={() => {
              setIsLine(!isLine);
            }}
          />
          <CustomButton
            label="이마 라인"
            variant={isLine ? 'filled' : 'outlined'}
            size="small"
            onPress={() => {
              setIsLine(!isLine);
            }}
          />
        </View>
        <CustomButton
          label="오늘의 사진 올리기"
          variant="filled"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      <SlideModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View>
          <Text>Hello World!</Text>
        </View>
        <Pressable onPress={() => setModalVisible(false)}>
          <Text>X</Text>
        </Pressable>
      </SlideModal>
      <View style={{height: 100}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  reportIcon: {
    width: 80,
    height: 100,
  },
  reportList: {
    margin: 20,
    gap: 12,
  },
  reportCard: {
    borderWidth: 1,
    borderColor: colors.SUB,
  },
  reportCardItem: {
    flexDirection: 'row',
    gap: 20,
  },
  uploadButtonGroup: {
    margin: 20,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
});
