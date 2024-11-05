import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../constants/colors';

const KakaoLoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: ''}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default KakaoLoginPage;
