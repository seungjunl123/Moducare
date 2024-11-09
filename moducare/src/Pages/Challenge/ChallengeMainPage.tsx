import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  Image,
} from 'react-native';
import CustomButtom from '../../Components/Common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/colors';
import SmallList from './../../Components/Challenge/SmallList';
import SlideModal from '../../Components/Common/SlideModal';
import {
  getChallengeList,
  getListType,
  getMyChallengeList,
  getMyListType,
  postCreateChallenge,
} from '../../api/challenge-api';
import {Alert} from 'react-native';
import {getEncryptStorage, setEncryptStorage} from '../../util';
import {
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import Config from 'react-native-config';
import {useFocusEffect} from '@react-navigation/native';

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

const options: Action = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

export default function ChallengeMainPage({navigation}) {
  const [isModal, setIsModal] = React.useState(false);
  const [myList, setMyList] = React.useState<getMyListType[] | []>([]);
  const [allList, setAllList] = React.useState<getListType[] | []>([]);
  const [title, setTitle] = React.useState<string>('');
  //챌린지 생성 이미지 관련
  const [imgUrl, setImgUrl] = React.useState('');
  const [imgConfig, setImgConfig] = React.useState<any>(null);

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
          console.log(`File uploaded successfully. ${data.Location}`);
          setImgUrl(data.Location);
          postCreateChallenge(title, data.Location);
          resolve(data.Location);
        }
      });
    });
  };

  const openImageLibrary = async () => {
    console.log('ww');
    const images = await launchImageLibrary(options);
    if (images.assets) {
      setImgConfig(images);
    }
  };

  const imageUpload = async () => {
    if (title === '') {
      Alert.alert('챌린지 생성 오류', '챌린지명을 작성해주세요!');
      return;
    }
    Alert.alert('업로드');
    // 1. S3 업로드
    if (imgConfig === null) {
      await postCreateChallenge(title, '');
      const myData = await getMyChallengeList();
      setMyList(myData);
    } else {
      await upLoadImgToS3(imgConfig);
      const myData = await getMyChallengeList();
      setMyList(myData);
    }
    // 2. 업로드 된 이미지 정보 전송
    // console.log('이미지 url', imgUrl);
    // await postCreateChallenge(title, imgUrl);
    // 3. 초기화
    setImgConfig(null);
    setImgUrl('');
    setTitle('');
    // 4. 모달 닫기
    setIsModal(false);
  };

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
    setImgConfig(null);
    setImgUrl('');
    setTitle('');
  };

  const handleMoveFeedPage = (data: getMyListType) => {
    setEncryptStorage('isDone', data.isDone);
    navigation.navigate('challenge_feed', {
      id: data.challengeId,
      title: data.challengeName,
      type: 'myChallenge',
    });
  };

  const getListCompo = async () => {
    const myData = await getMyChallengeList();
    const allData = await getChallengeList();
    setMyList(myData);
    setAllList(allData);
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log('qq');
      getListCompo();
    }, []),
  );

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
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {myList.length !== 0 ? (
              myList.map((data, index) => (
                <SmallList
                  key={index}
                  title={data.challengeName}
                  uri={data.challengeImg}
                  isFinish={data.isDone}
                  onPress={() => handleMoveFeedPage(data)}
                />
              ))
            ) : (
              <CustomText label="진행중인 챌린지가 없어요" />
            )}
          </ScrollView>
        </View>
        <View style={styles.BottomListArea}>
          <View style={styles.ListTitle}>
            <CustomText label="챌린지 목록 살펴보기" size={20} />
            <Pressable onPress={() => navigation.navigate('challenge_list')}>
              <Entypo name="chevron-right" color={colors.BLACK} size={25} />
            </Pressable>
          </View>
          <View>
            {allList.length !== 0 ? (
              allList.slice(0, 3).map((data, index) => (
                <SmallList
                  key={index}
                  title={data.challengeName}
                  uri={data.challengeImg}
                  onPress={() =>
                    navigation.navigate('challenge_feed', {
                      id: data.challengeId,
                      title: data.challengeName,
                      type: 'allChallenge',
                    })
                  }
                />
              ))
            ) : (
              <CustomText label="개설된 챌린지가 없어요" />
            )}
          </View>
        </View>
      </View>
      <View>
        <CustomButtom label="챌린지 생성하기" onPress={handleOpenModal} />
      </View>
      <SlideModal visible={isModal} onClose={handleCloseModal}>
        <View style={styles.ModalView}>
          {imgConfig !== null ? (
            <View style={styles.imageContainer}>
              <Image
                source={{uri: imgConfig?.assets?.[0].uri}}
                style={{width: 150, height: 150}}
              />
            </View>
          ) : (
            <Pressable
              style={styles.UploadArea}
              onPress={() => openImageLibrary()}>
              <SvgIconAtom name="Camera" style={{margin: 'auto'}} />
              <Text style={styles.UploadText}>
                챌린지 방 대표이미지를 공유해볼까요?
              </Text>
            </Pressable>
          )}

          <TextInput
            style={styles.InputArea}
            placeholder="챌린지 제목을 작성해주세요."
            value={title}
            onChangeText={setTitle}
          />
          <CustomButtom label="챌린지 생성하기" onPress={imageUpload} />
        </View>
      </SlideModal>
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
  BottomListArea: {
    flex: 0.4,
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
  ModalView: {
    gap: 20,
  },
  UploadArea: {
    marginTop: 20,
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
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
    marginVertical: 20,
  },
});
