import axiosInstance from '../util/axios';

const getLineDiaryData = async () => {
  const data = await axiosInstance.get('/diaries/line');
  return data;
};

const getTopDiaryData = async () => {
  const data = await axiosInstance.get('/diaries/top');
  return data;
};

const getReportData = async () => {
  const data = await axiosInstance.get('/diagnosis');
  return data;
};

const getReportDetailData = async (id: number) => {
  const data = await axiosInstance.get(`/diagnosis/${id}`);
  return data;
};

const postHairImg = async (formData: FormData) => {
  const data = await axiosInstance.post('/diaries', formData);
  return data;
};

export {
  getLineDiaryData,
  getTopDiaryData,
  getReportData,
  getReportDetailData,
  postHairImg,
};
