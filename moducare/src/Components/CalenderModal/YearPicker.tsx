import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {colors} from '../../constants/colors';
import CustomText from '../Common/CustomText';

interface YearPickerProps {
  setCurrentMonth: (date: Date) => void;
  setShowYearPicker: (show: boolean) => void;
  currentMonth: Date;
}

const YearPicker = ({
  setCurrentMonth,
  setShowYearPicker,
  currentMonth,
}: YearPickerProps) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1900;

  const years = Array.from(
    {length: currentYear - startYear + 1},
    (_, i) => currentYear - i,
  );

  return (
    <View style={styles.yearPickerContainer}>
      <View style={styles.yearPickerHeader}>
        <CustomText label="년도 선택" size={24} />
      </View>
      <ScrollView>
        {years.map(year => (
          <TouchableOpacity
            key={year}
            style={[
              styles.yearItem,
              year === currentMonth.getFullYear() && styles.selectedYear,
            ]}
            onPress={() => {
              setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
              setShowYearPicker(false);
            }}>
            <CustomText label={year.toString()} size={16} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  yearPickerContainer: {
    alignSelf: 'center',
    position: 'absolute',
    width: '110%',
    backgroundColor: 'white',
    maxHeight: 500,
    zIndex: 1000,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.GRAY,
  },
  yearPickerHeader: {
    alignSelf: 'center',
    padding: 20,
  },
  yearItem: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.GRAY,
  },
  selectedYear: {
    backgroundColor: colors.SUB,
  },
});

export default YearPicker;
