import {getEncryptStorage} from '../util';
import axiosInstance from './../util/axios';

type ResponseAiDiagnosis = {
  img: string;
  result: number[];
  comparison: number;
  manageComment: string;
  date: string;
};

const postAiDiagnosis = async (
  imgSrc: string,
): Promise<ResponseAiDiagnosis> => {
  const {data} = await axiosInstance.post(`diagnosis`, {
    imgSrc,
  });

  return data;
};

type ResponsePick = {
  productImg: string;
  productName: string;
  link: string;
  price: number;
  productType: string[];
};

const getPick = async (headType: number): Promise<ResponsePick> => {
  const {data} = await axiosInstance.get(`elasticSearch/recommend`, {
    headType,
  });

  return data;
};

export {postAiDiagnosis, getPick};
export type {ResponseAiDiagnosis, ResponsePick};
