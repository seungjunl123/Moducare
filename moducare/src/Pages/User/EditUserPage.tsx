import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import CustomText from '../../Components/Common/CustomText';
import {colors} from '../../constants/colors';
import {Dimensions} from 'react-native';
import CustomButton from '../../Components/Common/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import CalenderModal from '../../Components/CalenderModal/CalenderModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {putMember} from '../../api/login-api';
import {getEncryptStorage, setEncryptStorage} from '../../util';
const WIDTH = Dimensions.get('window').width;

type userInfo = {
  name: string;
  birth: string;
  email: string;
};
export default function EditUserPage() {
  const navigation = useNavigation();
  const date = new Date();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  );
  const [userName, setUserName] = useState('');
  const onPressSave = () => {
    putMember({name: userName, birth: selectedDate});
    setEncryptStorage('info', {
      name: userName,
      birth: selectedDate,
      email: Info?.email,
    });
    navigation.goBack();
  };

  const [Info, setInfo] = useState<userInfo>();
  const getInfo = async () => {
    const {name, birth, email} = await getEncryptStorage('info');
    name && setUserName(name);
    // birth && setb
    setInfo({
      ...Info,
      name,
      birth,
      email,
    });
  };

  useFocusEffect(
    useCallback(() => {
      console.log('?');
      getInfo();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <CustomText label="이 름" size={18} />
        <View>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="이름을 입력해주세요."
          />
        </View>
        {userName.length === 0 && (
          <Text style={styles.errorText}>이름 칸은 공백으로 둘 수 없어요!</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <CustomText label="생년월일" size={18} />
        <View style={styles.calenderContainer}>
          <Text style={styles.calenderText}>{selectedDate}</Text>
          <Pressable
            onPress={() => setIsModalVisible(!isModalVisible)}
            style={styles.calenderIcon}>
            <Feather name="calendar" size={24} color={colors.GRAY} />
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton label="저장하기" onPress={onPressSave} />
      </View>

      <CalenderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        nowDate={selectedDate}
        onDateSelect={date => {
          setSelectedDate(date);
          setIsModalVisible(false);
        }}>
        <Pressable
          onPress={() => setIsModalVisible(!isModalVisible)}
          style={styles.calenderButton}>
          <CustomText label="닫기" size={18} />
        </Pressable>
      </CalenderModal>
      <View style={styles.bottom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 80,
  },
  infoContainer: {
    height: 50,
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 10,
    width: WIDTH * 0.8,
  },
  buttonContainer: {
    marginTop: 20,
    width: WIDTH * 0.7,
  },
  calenderContainer: {
    width: WIDTH * 0.8,
    height: 50,
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calenderText: {
    marginStart: 10,
    color: colors.BLACK,
  },
  calenderIcon: {
    marginEnd: 10,
  },
  calenderButton: {
    marginTop: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  errorText: {
    marginStart: 10,
    color: colors.NEGATIVE,
    fontSize: 10,
  },
  bottom: {
    marginBottom: 50,
  },
});
