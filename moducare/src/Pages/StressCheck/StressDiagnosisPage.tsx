import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function StressDiagnosisPage() {
  return (
    <View style={styles.container}>
      <Text>스트레스 진단입니다용!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
