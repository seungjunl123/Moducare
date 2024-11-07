import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getLineDiaryData,
  getReportData,
  getReportDetailData,
  getTopDiaryData,
  postHairImg,
} from '../api/report-api';

interface DiaryItem {
  img: string;
  regDate: string;
}

interface ReportItem {
  idx: number;
  date: string;
  diagnosis: string;
}

export const QueryKey = {
  line: 'lineDiary',
  top: 'topDiary',
  report: 'report',
  reportDetail: 'reportDetail',
};

export const useLineDiaryQuery = () => {
  const {data, error} = useQuery({
    queryKey: [QueryKey.line],
    queryFn: getLineDiaryData,
    select: response =>
      response.data.map((item: DiaryItem) => ({
        img: {uri: item.img},
        regDate: item.regDate,
      })),
  });
  return {data};
};

export const useTopDiaryQuery = () => {
  const {data, error} = useQuery({
    // data를 구조분해할당으로 받아야 함
    queryKey: [QueryKey.top],
    queryFn: getTopDiaryData,
    select: response =>
      response.data.map((item: DiaryItem) => ({
        img: {uri: item.img},
        regDate: item.regDate,
      })),
  });
  return {data}; // data만 반환하도록 수정
};

export const useReportQuery = () => {
  return useQuery({
    queryKey: [QueryKey.report],
    queryFn: getReportData,
    select: response =>
      response.data.map((item: ReportItem) => ({
        idx: item.idx,
        date: item.date,
        diagnosis: item.diagnosis,
      })),
  });
};

export const useReportDetailQuery = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.reportDetail, {id}],
    queryFn: () => getReportDetailData(id),
  });
};

export const usePostHairImgQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => postHairImg(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryKey.line]});
      queryClient.invalidateQueries({queryKey: [QueryKey.top]});
    },
    onError: error => {
      console.log(error);
    },
  });
};

export type {ReportItem};
