import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '../Common/CustomText';
import SvgIconAtom from '../Common/SvgIconAtom';

const SmallList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.ListArea}>
        <SvgIconAtom name="Basic" size={40} />
        <CustomText label="찬 바람으로 머리말리기" size={15} />
      </View>
      <SvgIconAtom name="Right" size={24} />
    </View>
  );
};

export default SmallList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
    marginBottom: 10,
  },
  ListArea: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
  },
});
