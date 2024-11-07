import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
// import api from '../api/api';

export const QueryKey = 'product';

// 헤더!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const getLatestProductData = () => {
  return axios.get(api + '/products/latest').then(res => res.data);
};

export const useLatestProductQuery = () => {
  return useQuery({
    queryKey: [QueryKey],
    queryFn: getLatestProductData,
  });
};
