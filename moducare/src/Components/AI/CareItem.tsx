import * as React from 'react';
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomText from '../Common/CustomText';
import SvgIconAtom from '../Common/SvgIconAtom';
import {colors} from '../../constants/colors';

interface ListProps extends PressableProps {
  isPhoto?: boolean;
}

const CareItem = ({isPhoto = false, ...props}: ListProps) => {
  return (
    <>
      <Pressable style={styles.container} {...props}>
        {isPhoto ? (
          <Image
            style={styles.ImgArea}
            source={require('../../assets/test.png')}
          />
        ) : (
          <>
            <Image
              style={styles.ImgArea}
              source={require('../../assets/test.png')}
            />
          </>
        )}
        <View style={styles.detailArea}>
          <View>
            <Text style={styles.subText}>
              산뜻한 타입 지성 모발용 샴푸 500g
            </Text>
            <CustomText label="아모스 녹차실감" size={15} />
          </View>
          <CustomText label="23,500원" size={13} variant={'regular'} />
          <View style={styles.subArea}>
            <Text style={styles.subAreaText}>트러블 케어, 각질케어</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.line} />
    </>
  );
};

export default CareItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    gap: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  ImgArea: {
    width: 100,
    height: 100,
  },
  detailArea: {
    justifyContent: 'space-between',
    flex: 1,
  },
  subText: {
    fontFamily: 'Pretendard-Regualr',
    color: colors.DARK_GRAY,
    fontSize: 10,
  },
  subArea: {
    flexDirection: 'row',
    // borderWidth: 1,
    justifyContent: 'flex-end',
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  subAreaText: {
    padding: 5,
    borderRadius: 10,
    textAlign: 'right',
    fontFamily: 'Pretendard-Bold',
    color: colors.DARK_GRAY,
    fontSize: 10,
    backgroundColor: colors.WHITE_GRAY,
  },
  line: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: colors.WHITE_GRAY,
    marginVertical: 10,
  },
});
