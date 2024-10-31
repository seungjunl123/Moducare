import * as React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default function ItemBox({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  box: {
    marginTop: 10,
    marginBottom: 10,
  },
});
