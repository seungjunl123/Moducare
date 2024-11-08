import axiosInstance from '../util/axios';

const postCreateChallenge = async (
  title: string,
  challengeImage: string,
): Promise<void> => {
  try {
    const {data} = await axiosInstance.post('challenges', {
      title,
      challengeImage,
    });

    console.log('챌린지 생성 성공', data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type getListType = {
  challengeId: number;
  challengeImg: string;
  challengeUser: number;
  challengeName: string;
};

const getChallengeList = async (): Promise<getListType[]> => {
  const {data} = await axiosInstance.get('challenges');

  return data;
};

type getMyListType = {
  challengeId: number;
  challengeImg: string;
  challengeName: string;
  isDone: number;
};

const getMyChallengeList = async (): Promise<getMyListType[]> => {
  try {
    const {data} = await axiosInstance.get('my-challenges');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const postJoinChallenge = async (challengeId: number): Promise<void> => {
  const {data} = await axiosInstance.post(`my-challenges/${challengeId}/in`);

  return data;
};

const postOutChallenge = async (challengeId: number): Promise<void> => {
  const {data} = await axiosInstance.post(`my-challenges/${challengeId}/out`);

  return data;
};

type feedChallengeType = {
  feedImg: string;
  content: string;
};
const postFeedChallenge = async (
  challengeId: number,
  {feedImg, content}: feedChallengeType,
): Promise<void> => {
  const {data} = await axiosInstance.post(`challenge-feeds/${challengeId}`, {
    feedImg,
    content,
  });

  return data;
};

type FeedType = {
  feedImg: string;
  feedUserName: string;
  content: string;
  feedRegDate: string;
  like: number;
  isLiked: number;
};

const getFeed = async (challengeId: number): Promise<FeedType[]> => {
  const {data} = await axiosInstance.get(`challenge-feeds/${challengeId}`);

  return data;
};

const postLike = async (feedId: number): Promise<number> => {
  const {data} = await axiosInstance.post(`favorites/${feedId}`);

  return data;
};

export {
  postCreateChallenge,
  postFeedChallenge,
  postJoinChallenge,
  postLike,
  postOutChallenge,
  getChallengeList,
  getFeed,
  getMyChallengeList,
};

export type {FeedType, feedChallengeType, getListType, getMyListType};
