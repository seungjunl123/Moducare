import axiosInstance from '../util/axios';
import Config from 'react-native-config';

interface LatestProduct {
  link: string;
  imgSrc: string;
}

const getLastestProduct = async (): Promise<LatestProduct> => {
  try {
    const response = await axiosInstance.get(
      `${Config.API_URL}products/latest`,
    );
    console.log('최근 상품 호출 성공 ', response.data);
    return response.data;
  } catch (error) {
    console.log('최근 상품 호출 실패');
    console.log(error);
    throw error;
  }
};

const postLastestProduct = async (
  imgSrc: string,
  link: string,
): Promise<LatestProduct> => {
  try {
    const response = await axiosInstance.post(
      `${Config.API_URL}products/latest`,
      {
        imgSrc,
        link,
      },
    );
    console.log('최근 상품 저장 성공 ', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {getLastestProduct, postLastestProduct};
export type {LatestProduct};
