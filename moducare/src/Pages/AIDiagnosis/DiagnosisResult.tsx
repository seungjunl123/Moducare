import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import CustomButtom from '../../Components/Common/CustomButton';
import CustomText from '../../Components/Common/CustomText';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';

const DiagnosisResult = ({navigation}) => {
  const careText: string = `첫째, 두피를 깨끗하게 유지하려면 적어도 주 2-3회 샴푸로 세척해줘야 해요. 둘째, 너무 뜨거운 물보다는 미지근한 물을 사용하는 게 좋아요. 셋째, 각질 제거를  위해 주 1회 스크럽이나 두피 마스크를 사용해보세요.\n
또한, 두피도 보습이 필요하니까 두피 전용 오일이나 세럼을 사용해 보습해주는 게 좋고요. 건강한 모발을 위해 균형 잡힌 식사를 하고, 스트레스는 운동이나 명상으로 관리해보세요. 자외선 차단도 잊지 말고, 마지막으로 두피 마사지를 통해 혈액순환을 촉진해주면 도움이 됩니다.`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.photoArea}>
          <View style={styles.photoDetailArea}>
            <CustomText label="제공된 두피 사진" size={20} />
            <Image
              style={styles.photo}
              source={require('../../assets/test.png')}
            />
          </View>
          <View style={styles.photoDetailArea}>
            <CustomText label="건강한 두피 사진" size={20} />
            <Image
              style={styles.photo}
              source={require('../../assets/test.png')}
            />
          </View>
        </View>
        <Text style={styles.checkText}>
          AI 두피 진단 결과
          <Text style={styles.checkResult}> 정상</Text> 입니다.
        </Text>
        <View style={styles.checkArea}>
          <View style={{width: '100%'}}>
            <CustomText label="MODU가 관찰한 두피 결과" size={20} />
            <Text style={styles.checkText}>
              최근 검사에 비해
              <Text style={styles.checkResult}> 두피가 좋아졌어요!</Text>
            </Text>
          </View>
          <SvgIconAtom name="Good" />
        </View>
        <View style={styles.careArea}>
          <CustomText label="MODU가 추천하는 관리비결" size={20} />
          <Text style={styles.careText}>{careText}</Text>
        </View>
        <View style={styles.BtnArea}>
          <CustomButtom
            label="나에게 맞는 샴푸 확인하기"
            onPress={() => navigation.navigate('aiPick')}
          />
          <CustomButtom label="두피 검진 문서 생성" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    // alignItems: 'center',
    padding: 15,
  },

  photoArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  photoDetailArea: {
    width: '50%',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    resizeMode: 'cover',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },

  checkArea: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  checkText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  checkResult: {
    fontSize: 25,
    fontFamily: 'Pretendard-ExtraBold',
    color: colors.MAIN,
  },

  careArea: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  careText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
  },

  BtnArea: {
    width: '100%',
    paddingHorizontal: 10,
    gap: 10,
  },
});

export default DiagnosisResult;
