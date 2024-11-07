import axiosInstance from '../util/axios';
import Config from 'react-native-config';
import {useMutation} from '@tanstack/react-query';
// import api from '../api/api';

export const useStressScoreMutation = () => {
  return useMutation({
    mutationFn: async (data: number) => {
      await axiosInstance.post('stress', data);
    },
  });
};
