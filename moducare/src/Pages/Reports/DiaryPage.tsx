import {
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
} from 'react-native-image-picker';
import useImageStore from '../../store/useImageStore';
import {
  useLineDiaryQuery,
  useTopDiaryQuery,
} from '../../quires/useReportsQuery';
import {
  getLineDiaryData,
  getTopDiaryData,
  postHairImg,
} from '../../api/report-api';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import Config from 'react-native-config';

interface DiaryCarouselItem {
  img: {
    uri: string;
  };
  regDate: string;
}
interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: Config.AWS_ACCESS_KEY_ID,
  secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
  region: Config.AWS_REGION,
});

// 데이터가 없을 경우 더미 데이터
const DefaultImage = [
  {
    img: require('../../assets/img/MainCharacter.png'),
    regDate: '2024-01-04',
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
  const [lineDiaryData, setLineDiaryData] = useState<DiaryCarouselItem[]>([]);
  const [topDiaryData, setTopDiaryData] = useState<DiaryCarouselItem[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLine, setIsLine] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgType, setImgType] = useState('');
  const [imgConfig, setImgConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const upLoadImgToS3 = async (img: any) => {
    console.log('upLoadImgToS3', img);

    return new Promise(async (resolve, reject) => {
      const fileData = await RNFS.readFile(img.assets[0].uri, 'base64');
      const params = {
        Key: img.assets[0].fileName,
        Bucket: Config.AWS_BUCKET,
        Body: Buffer.from(fileData, 'base64'),
        ContentType: img?.assets?.[0].type,
      };

      // S3 버켓에 파일 업로드
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('업로드 실패', err);
          reject(err);
        } else {
          setImgUrl(data.Location);
          console.log(`File uploaded successfully. ${data.Location}`);
          resolve(data.Location);
        }
      });
    });
  };

  const openImageLibrary = async (type: string) => {
    const images = await launchImageLibrary(options);
    if (images.assets) {
      setImgConfig(images);
      setImgType(type);
    }
  };

  const imageUpload = () => {
    if (!imgConfig?.assets) {
      Alert.alert('사진을 선택해주세요');
      return;
    }
    Alert.alert('업로드');
    // 1. S3 업로드
    upLoadImgToS3(imgConfig);
    // 2. 업로드 된 이미지 정보 전송
    postHairImg(imgUrl, imgType);
    // 3. 초기화
    setImgType('');
    setImgConfig(null);
    setImgUrl('');
    // 4. 모달 닫기
    setModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [lineData, topData] = await Promise.all([
          getLineDiaryData(),
          getTopDiaryData(),
        ]);

        setLineDiaryData(lineData.length > 0 ? lineData : DefaultImage);
        setTopDiaryData(topData.length > 0 ? topData : DefaultImage);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setLineDiaryData(DefaultImage);
        setTopDiaryData(DefaultImage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomText label="로딩 중..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText label="머리 빠짐 유무를" size={24} />
        <CustomText label="사진을 통해 체크해보세요" size={24} />
      </View>
      <View>
        <MyCarousel
          isMain={false}
          data={isLine ? lineDiaryData : topDiaryData}
        />
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
                source={{uri: imgConfig?.assets?.[0].uri}}
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
              onPress={imageUpload}
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
