import * as React from 'react';
import {Image, Pressable, PressableProps, StyleSheet, View} from 'react-native';
import CustomText from '../Common/CustomText';
import SvgIconAtom from '../Common/SvgIconAtom';

interface ListProps extends PressableProps {
  isPhoto?: boolean;
  isFinish?: boolean;
}

const SmallList = ({
  isPhoto = false,
  isFinish = false,
  ...props
}: ListProps) => {
  return (
    <Pressable style={styles.container} {...props}>
      <View style={styles.ListArea}>
        {isPhoto ? (
          <SvgIconAtom name="Basic" size={40} />
        ) : (
          <>
            <Image
              style={styles.ImgTest}
              source={require('../../assets/test.png')}
            />
            {isFinish && (
              <View style={styles.isFinish}>
                <SvgIconAtom name="Finish" size={40} />
              </View>
            )}
          </>
        )}
        <CustomText label="찬 바람으로 머리말리기" size={15} />
      </View>
      <SvgIconAtom name="Right" size={24} />
    </Pressable>
  );
};

export default SmallList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
  },
  ListArea: {
    flexDirection: 'row',
    gap: 15,
  },
  ImgTest: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  isFinish: {
    position: 'absolute',
    width: 40,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 오버레이
    borderRadius: 100,
  },
});
