import * as React from 'react';
import {
  Image,
  Linking,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomText from '../Common/CustomText';
import {colors} from '../../constants/colors';

interface ListProps extends PressableProps {
  productImg?: string;
  productName: string;
  link: string;
  price: number;
  productType: string[];
}

const CareItem = ({
  productImg,
  productName,
  link,
  price,
  productType,
  ...props
}: ListProps) => {
  return (
    <>
      <Pressable
        style={styles.container}
        {...props}
        onPress={() => {
          Linking.openURL(link);
        }}>
        {productImg ? (
          <Image style={styles.ImgArea} source={{uri: productImg}} />
        ) : (
          <Image
            style={styles.ImgArea}
            source={require('../../assets/test.png')}
          />
        )}
        <View style={styles.detailArea}>
          <View>
            <CustomText label={productName} size={15} />
          </View>
          <CustomText
            label={`${price.toLocaleString()}원`}
            size={13}
            variant={'regular'}
          />
          <View style={styles.subArea}>
            <Text style={styles.subAreaText}>{productType.join(', ')}</Text>
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
