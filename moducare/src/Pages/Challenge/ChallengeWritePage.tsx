import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButtom from '../../Components/Common/CustomButton';
import {colors} from '../../constants/colors';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import {
  CameraOptions,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {postFeedChallenge} from '../../api/challenge-api';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: CameraOptions | ImageLibraryOptions;
}

const options: Action = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const HEIGHT = Dimensions.get('window').height;

const ChallengeWritePage = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const [content, setContent] = React.useState<string>('');
  const [imgConfig, setImgConfig] = React.useState<any>(null);

  const openImageLibrary = async () => {
    const images = await launchImageLibrary(options);
    if (images.assets) {
      setImgConfig(images);
    }
  };

  const imageUpload = async () => {
    if (imgConfig === null) {
      Alert.alert('인증피드 작성', '사진을 첨부해주세요!');
      return;
    }
    Alert.alert('업로드');
    const file = imgConfig.assets[0];
    const uri = file.uri; // 이미지 URI
    const fileName = file.fileName; // 이미지 파일명
    const type = file.type; // 이미지 타입
    const formData = new FormData();
    formData.append('content', content);
    formData.append('file', {
      uri: uri,
      type: type,
      name: fileName,
    });

    await postFeedChallenge(id, formData);
    // 초기화
    setImgConfig(null);
    setContent('');
    // 페이지 전환
    navigation.goBack();
  };

  const handleImgDelete = () => {
    setImgConfig(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {imgConfig !== null ? (
          <View style={styles.imageContainer}>
            <Pressable style={styles.closeBtn} onPress={handleImgDelete}>
              <FontAwesome name="close" size={20} color={'#ffffff'} />
            </Pressable>
            <Image
              source={{uri: imgConfig?.assets?.[0].uri}}
              style={{width: 300, height: 300}}
            />
          </View>
        ) : (
          <Pressable
            style={styles.UploadArea}
            onPress={() => openImageLibrary()}>
            <SvgIconAtom name="Camera" style={{margin: 'auto'}} />
            <Text style={styles.UploadText}>
              챌린지 인증에 사용할 사진을 남에게 공유해요.
            </Text>
          </Pressable>
        )}
        <TextInput
          style={styles.InputArea}
          placeholder="내용을 입력하세요."
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
          multiline={true}
        />
        <CustomButtom label="인증 완료" onPress={imageUpload} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  UploadArea: {
    marginVertical: 20,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 0.5,
    marginBottom: 30,
    height: HEIGHT * 0.2,
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    alignItems: 'center',
    margin: 10,
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MAIN,
    position: 'absolute',
    right: 0,
    margin: 5,
    zIndex: 1000,
  },
});

export default ChallengeWritePage;
