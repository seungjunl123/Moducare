import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import MyCarousel from '../../Components/Carousel/CarouselCard';
import CustomButton from '../../Components/Common/CustomButton';
import SlideModal from '../../Components/Common/SlideModal';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import CustomText from '../../Components/Common/CustomText';
import {
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {
  useLineDiaryQuery,
  usePostHairImgQuery,
  useTopDiaryQuery,
} from '../../quires/useReportsQuery';

interface DiaryCarouselItem {
  img: string;
  regDate: string;
}
interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
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
const WIDTH = Dimensions.get('window').width;

const options: Action = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

export default function DiaryPage() {
  const {data: lineDiaryData, isLoading: lineDiaryLoading} =
    useLineDiaryQuery();
  const {data: topDiaryData, isLoading: topDiaryLoading} = useTopDiaryQuery();
  const {mutate: postHairImg} = usePostHairImgQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLine, setIsLine] = useState(false);
  const [image, setImage] = useState<ImagePickerResponse>();
  const [imgType, setImgType] = useState<string>('');

  const openImageLibrary = async (type: string) => {
    const images = await launchImageLibrary(options);
    if (images.assets) {
      setImage(images);
      setImgType(type);
    }
  };

  const lineList: DiaryCarouselItem[] = lineDiaryData || lineImageList; // fallback으로 더미 데이터 사용
  const topList: DiaryCarouselItem[] = topDiaryData || topImageList;

  if (lineDiaryLoading || topDiaryLoading) {
    return <CustomText label="로딩중~" />;
  }

  const uploadImage = async () => {
    if (!image?.assets) {
      Alert.alert('사진을 선택해주세요');
      return;
    }
    Alert.alert('업로드');

    const formData = new FormData();
    formData.append('file', {
      uri: image?.assets?.[0].uri,
      name: image?.assets?.[0].fileName,
      type: image?.assets?.[0].type,
    });
    formData.append('type', imgType);
    setImgType(''); //초기화
    setImage(undefined);
    setModalVisible(false);
    postHairImg(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText label="머리 빠짐 유무를" size={24} />
        <CustomText label="사진을 통해 체크해보세요" size={24} />
      </View>
      <View>
        <MyCarousel isMain={false} data={isLine ? topList : lineList} />
      </View>
      <View style={styles.buttonGroup}>
        <View style={styles.gallaryButtonGroup}>
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
          {imgType !== '' ? (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: image?.assets?.[0].uri}}
                style={{width: 150, height: 150}}
              />
            </View>
          ) : (
            <>
              <View style={styles.modalContent}>
                <Pressable
                  onPress={() => openImageLibrary('top')}
                  style={styles.modalItem}>
                  <SvgIconAtom name="Camera" size={50} />
                  <CustomText
                    label="정수리 사진 업로드"
                    variant="regular"
                    size={14}
                  />
                </Pressable>
                <Pressable
                  onPress={() => openImageLibrary('line')}
                  style={styles.modalItem}>
                  <SvgIconAtom name="Camera" size={50} />
                  <CustomText
                    label="이마 라인 사진 업로드"
                    variant="regular"
                    size={14}
                  />
                </Pressable>
              </View>
            </>
          )}
          <View style={styles.buttonContainer}>
            <CustomButton
              label="사진 업로드"
              variant="filled"
              onPress={uploadImage}
            />
          </View>
        </View>
      </SlideModal>
      <View style={styles.bottomSpace} />
    </SafeAreaView>
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
  gallaryButtonGroup: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginBottom: 20,
  },
  buttonGroup: {
    width: WIDTH * 0.9,
    alignSelf: 'center',
  },
  modalItem: {
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 40,
  },
  bottomSpace: {
    height: 100,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
    marginVertical: 20,
  },
});
