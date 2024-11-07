import axios from 'axios';
// import axiosInstance from '../util/axios';
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
    // axiosInstance로 변경 필요
    const {data} = await axios.post(
      `${Config.API_URL}stress`,
      {
        score: stressScore,
      },
      {
        headers: {
          Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
        },
      },
    );

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
    const {data} = await axios.get(`${Config.API_URL}stress/recent`, {
      headers: {
        Authorization: `Bearer ${Config.ACCESS_TOKEN}`,
      },
    });

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
