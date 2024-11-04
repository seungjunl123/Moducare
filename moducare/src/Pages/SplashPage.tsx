import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
const SplashPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.img} source={require('../assets/Splash.png')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN,
    justifyContent: 'center',
    alignContent: 'center',
  },
  img: {
    margin: 'auto',
  },
});

export default SplashPage;
