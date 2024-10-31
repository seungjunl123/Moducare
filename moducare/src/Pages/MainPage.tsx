import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ItemBox from '../Components/ItemBox/ItemBox';

export default function MainPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>두피 사진을 통하여</Text>
          <Text style={styles.headerText}>AI가 두피 상태를 확인해 드려요.</Text>
        </View>
        <Image
          style={styles.helloImage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />

        <ItemBox>
          <Text style={styles.boxHeaderText}>오늘의 날씨 정보</Text>

          <Text>아이템 박스</Text>
        </ItemBox>
        <ItemBox>
          <Text>아이템 박스</Text>
          <Text>아이템 박스</Text>
        </ItemBox>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    margin: 20,
    alignItems: 'center',
    gap: 20,
  },
  headerTextContainer: {
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 20,
  },
  boxHeaderText: {
    fontSize: 20,

    fontWeight: 'bold',
  },
  helloImage: {
    width: 200,
    height: 200,
  },
});
