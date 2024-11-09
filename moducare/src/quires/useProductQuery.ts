import {useMutation, useQuery} from '@tanstack/react-query';
import {getLastestProduct, postLastestProduct} from '../api/product-api';
import queryClient from '../util/queryClient';

export const QueryKey = 'product';

export const useLatestProductQuery = () => {
  console.log('최근 상품 조회 중');
  return useQuery({
    queryFn: getLastestProduct,
    queryKey: [QueryKey],
    staleTime: 1000 * 60 * 5,
  });
};

export const usePostLastestProductMutation = () => {
  return useMutation({
    mutationFn: ({imgSrc, link}: {imgSrc: string; link: string}) =>
      postLastestProduct(imgSrc, link),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryKey]});
    },
  });
};
