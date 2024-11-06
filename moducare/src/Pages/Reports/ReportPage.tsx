import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import CustomText from '../../Components/Common/CustomText';
import ItemBox from '../../Components/ItemBox/ItemBox';

import {useReportQuery, ReportItem} from '../../quires/useReportsQuery';
import {useNavigation} from '@react-navigation/native';
const reports: ReportItem[] = [
  {
    idx: 1,
    date: '2024-01-01 오후 10:12',
    diagnosis: '정상',
  },
  {
    idx: 2,
    date: '2024-02-01 오후 10:12',
    diagnosis: '탈모 ㅋㅋ',
  },
];

export default function ReportPage() {
  const navigation = useNavigation();
  const {data: reportData, isLoading: reportLoading} = useReportQuery();

  if (reportLoading) {
    return <CustomText label="로딩중~" />;
  }
  const reportList = reportData || reports;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/report.png')}
          style={styles.reportIcon}
        />
        <View>
          <CustomText label="사용자님의" size={20} />
          <CustomText label="두피 리포트 입니다." size={20} />
        </View>
      </View>
      <View style={styles.reportList}>
        {reportList.map((report: ReportItem) => (
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('reportDetail', {id: report.idx});
            }}>
            <ItemBox style={styles.reportCard}>
              <View style={styles.reportCardItem}>
                <CustomText label="진단 일시" variant="regular" />
                <CustomText label={report.date} variant="regular" />
              </View>
              <View style={styles.reportCardItem}>
                <CustomText label="진단 결과" variant="regular" />
                <CustomText label={report.diagnosis} variant="regular" />
              </View>
            </ItemBox>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    margin: 20,
  },
  reportIcon: {
    width: 80,
    height: 100,
  },
  reportList: {
    margin: 20,
    gap: 12,
  },
  reportCard: {
    borderWidth: 1,
    borderColor: colors.SUB,
  },
  reportCardItem: {
    flexDirection: 'row',
    gap: 20,
  },
});
