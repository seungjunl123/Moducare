import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function DiagnosisPage() {
  return (
    <View style={styles.container}>
      <Text>진단입니다용!</Text>
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
