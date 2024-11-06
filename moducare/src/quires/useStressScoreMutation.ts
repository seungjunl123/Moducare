import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
// import api from '../api/api';

// 헤더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const useStressScoreMutation = () => {
  return useMutation({
    mutationFn: async (data: number) => {
      await axios.post(api + '/stress', data);
    },
  });
};
