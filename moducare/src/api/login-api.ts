import axiosInstance from '../util/axios';

const login = async (): Promise<void> => {
  const {data} = await axiosInstance.post(``);

  return data;
};

export {login};
