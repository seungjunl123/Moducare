import {View, Image, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../constants/colors';
import CustomText from '../../Components/Common/CustomText';
import ItemBox from '../../Components/ItemBox/ItemBox';

interface Report {
  id: number;
  date: string;
  result: string;
}
const reports: Report[] = [
  {
    id: 1,
    date: '2024-01-01 오후 10:12',
    result: '정상',
  },
  {
    id: 2,
    date: '2024-02-01 오후 10:12',
    result: '탈모 ㅋㅋ',
  },
];

export default function ReportPage() {
  const [reportList, setReportList] = useState<Report[]>([]);

  useEffect(() => {
    setReportList(reports);
  }, []);

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
        {reportList.map(report => (
          <ItemBox style={styles.reportCard}>
            <View style={styles.reportCardItem}>
              <CustomText label="진단 일시" variant="regular" />
              <CustomText label={report.date} variant="regular" />
            </View>
            <View style={styles.reportCardItem}>
              <CustomText label="진단 결과" variant="regular" />
              <CustomText label={report.result} variant="regular" />
            </View>
          </ItemBox>
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
