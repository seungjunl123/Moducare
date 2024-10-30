import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function EditUserPage() {
  return (
    <View style={styles.container}>
      <Text>유저 정보 수정입니다용!</Text>
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
