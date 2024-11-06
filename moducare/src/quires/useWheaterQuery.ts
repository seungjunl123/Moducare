import {useQuery} from '@tanstack/react-query';
import {getWeather} from '../api/weather-api';
import {UseQueryCustomOptions} from '../types/common';
// import api from '../api/api';

export const QueryKey = 'weather';

interface WeatherQuery {
  sido: string;
  gugun: string;
}

export const useWeatherQuery = (
  params: WeatherQuery,
  options?: UseQueryCustomOptions,
) => {
  const {data, error} = useQuery({
    queryKey: [QueryKey],
    queryFn: () => getWeather(params.sido, params.gugun),
    ...options,
  });
  if (error) {
    throw error;
  }
  return {data};
};
