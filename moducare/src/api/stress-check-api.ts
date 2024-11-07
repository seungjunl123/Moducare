import axios from 'axios';
import axiosInstance from '../util/axios';
import Config from 'react-native-config';

type ResultData = {
  data: {
    value: number;
    dataPointText: string;
    label: string;
  }[];
};

const postResult = async (stressScore: number): Promise<void> => {
  try {
    const {data} = await axiosInstance.post(`${Config.API_URL}stress`, {
      score: stressScore,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getResult = async (): Promise<ResultData[]> => {
  // axiosInstance로 변경 필요
  try {
    const {data} = await axiosInstance.get(`${Config.API_URL}stress/recent`);

    return data.map((item: ResultData) => ({
      ...item,
      label: item.label.slice(5, 10), // "2024-11-06T04:03:32.806283Z" -> "11-06"
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {postResult, getResult};
export type {ResultData};
