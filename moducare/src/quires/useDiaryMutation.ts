import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
// import api from '../api/api';

// 헤더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const useUploadDiaryMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axios.post(api + '/diaries', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};
