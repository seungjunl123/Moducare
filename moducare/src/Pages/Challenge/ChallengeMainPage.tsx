import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import CustomButtom from '../../Components/Common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../constants/colors';
import SmallList from './../../Components/Challenge/SmallList';
import SlideModal from '../../Components/Common/SlideModal';

export default function ChallengeMainPage({navigation}) {
  const [isModal, setIsModal] = React.useState(false);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

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
            <SmallList isFinish={true} />
            <SmallList isPhoto={true} />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
            <SmallList />
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
            <SmallList onPress={() => navigation.navigate('challenge_feed')} />
            <SmallList />
            <SmallList />
          </View>
        </View>
      </View>
      <View>
        <CustomButtom label="챌린지 생성하기" onPress={handleOpenModal} />
      </View>
      <SlideModal visible={isModal} onClose={handleCloseModal}>
        <View style={styles.ModalView}>
          <Pressable style={styles.UploadArea}>
            <SvgIconAtom name="Camera" style={{margin: 'auto'}} />
            <Text style={styles.UploadText}>
              챌린지 방 대표이미지를 공유해볼까요?
            </Text>
          </Pressable>
          <TextInput
            style={styles.InputArea}
            placeholder="챌린지 제목을 작성해주세요."
          />
          <CustomButtom label="챌린지 생성하기" onPress={handleCloseModal} />
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
    flex: 1,
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
});
