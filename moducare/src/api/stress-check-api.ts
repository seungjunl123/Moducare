import axiosInstance from '../util/axios';

const postResult = async (stressScore: number): Promise<void> => {
  const {data} = await axiosInstance.post('/stress', {stressScore});

  return data;
};

const getResult = async (): Promise<void> => {
  const {data} = await axiosInstance.get('/stress/recent');

  return data;
};

export {postResult, getResult};
