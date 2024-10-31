import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomButtom from '../../Components/Common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../../Components/Common/CustomText';

export default function ChallengeMainPage() {
  return (
    <SafeAreaView>
      <View>
        <CustomText label="챌린지입니다용!" />
        <CustomButtom label="테스트" onPress={() => Alert.alert('er')} />
      </View>
    </SafeAreaView>
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
