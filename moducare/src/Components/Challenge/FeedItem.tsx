import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomText from '../Common/CustomText';
import {colors} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FeedItem = () => {
  return (
    <View style={styles.container}>
      <CustomText label="오진영" size={20} />
      <Text style={styles.dateText}>24. 10. 26.</Text>
      <Image style={styles.imgArea} source={require('../../assets/test.png')} />
      <Text style={styles.Content}>헤헤헤</Text>
      <View style={styles.likeArea}>
        <AntDesign name="heart" size={25} color={'red'} />
        <AntDesign name="hearto" size={25} color={'red'} />
        <CustomText label="0" size={20} variant="regular" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },
  dateText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
  imgArea: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  Content: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.DARK_GRAY,
    marginVertical: 10,
  },
  likeArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});

export default FeedItem;
