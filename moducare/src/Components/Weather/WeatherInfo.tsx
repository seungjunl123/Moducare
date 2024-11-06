import React from 'react';
import {View, StyleSheet, Platform, PermissionsAndroid} from 'react-native';
import ItemBox from '../ItemBox/ItemBox';
import CustomText from '../Common/CustomText';
import SvgIconAtom from '../Common/SvgIconAtom';
import {handleAirPhrase, handleUvPhrase} from '../../store/useWheaterStore';
import Geolocation from 'react-native-geolocation-service';
import {getLocation} from '../../api/weather-api';
import {useWeatherQuery} from '../../quires/useWheaterQuery';

interface WeatherDataProps {
  weatherDTO: {
    temperature: number;
    airCondition: number;
    uvCondition: number;
  };
  gptResponse: string;
}

export default function WeatherInfo() {
  const [sido, setSido] = React.useState<string>('');
  const [gugun, setGugun] = React.useState<string>('');

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }, []);

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        getLocation(latitude, longitude).then(location => {
          setSido(location.region_1depth_name.slice(0, 2));
          setGugun(location.region_2depth_name);
        });
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [sido, gugun]);

  // const {data: weatherData} = useWeatherQuery({sido, gugun}) as {
  //   data: WeatherDataProps | undefined;
  // };
  const {data: weatherData} = {data: {}};

  return (
    <View>
      <ItemBox>
        <CustomText label="오늘의 날씨 정보" size={20} />
        <View style={styles.weatherBox}>
          <View style={styles.weatherBoxItem}>
            <SvgIconAtom name="Main_temparature" size={70} />
            <CustomText
              label={`${weatherData?.weatherDTO?.temperature || 0}℃`}
              size={20}
            />
          </View>
          <View style={styles.weatherBoxItem}>
            <SvgIconAtom name="Main_air" size={70} />
            <CustomText
              label={handleAirPhrase(
                weatherData?.weatherDTO?.airCondition || 0,
              )}
              size={20}
            />
          </View>
          <View style={styles.weatherBoxItem}>
            <SvgIconAtom name="Main_UV" size={70} />
            <CustomText
              label={handleUvPhrase(weatherData?.weatherDTO?.uvCondition || 0)}
              size={20}
            />
          </View>
        </View>
        <CustomText
          label={weatherData?.gptResponse || ''}
          size={16}
          variant="regular"
        />
      </ItemBox>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherBoxImage: {
    width: 70,
    height: 70,
  },
  weatherBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  weatherBoxItem: {
    alignItems: 'center',
    gap: 5,
  },
});
