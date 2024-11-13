import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native';
import {colors} from '../../constants/colors';
import SvgIconAtom from '../../Components/Common/SvgIconAtom';
import CustomText from '../../Components/Common/CustomText';
import CareItem from '../../Components/AI/CareItem';
import useAuthStore from '../../store/useAuthStore';
import {useProductListQuery} from '../../quires/useProductQuery';
import {RootStackParamList} from '../../navigate/StackNavigate';
import {RouteProp} from '@react-navigation/native';

const DiagnosisPick = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'aiPick'>;
}) => {
  const {user} = useAuthStore();
  const {type, result} = route.params;
  const {data: recommendDataList} = useProductListQuery(type, result);

  const [page, setPage] = React.useState(10);
  const handlePage = () => {
    if (recommendDataList && recommendDataList?.length >= page) {
      setPage(page + 10);
    } else {
      // 새로운 리스트 요청 필요
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainArea}>
        <View style={styles.topArea}>
          <SvgIconAtom name={'CareItem'} />
          <View>
            <CustomText size={20} label={`${user}님의 두피에 맞는`} />
            <CustomText size={20} label="상품들을 소개시켜 드릴게요." />
          </View>
        </View>
        <View style={styles.ListArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {recommendDataList?.slice(0, page).map((item, index) => (
              <CareItem
                key={index}
                productImg={item.productImg}
                productName={item.productName}
                link={item.link}
                price={item.price}
                productType={item.productType}
              />
            ))}
            {recommendDataList?.length !== 0 && (
              <Text style={styles.getListArea} onPress={handlePage}>
                더보기
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  mainArea: {
    flex: 1,
  },
  topArea: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 20,
  },
  ListArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE_GRAY,
    paddingTop: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  getListArea: {
    paddingVertical: 20,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: colors.DARK_GRAY,
  },
});

export default DiagnosisPick;
