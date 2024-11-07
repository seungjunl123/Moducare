import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {NaverLoginResponse} from '../types/socialLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthStore = {
  isLoggedIn: boolean;
  naverLoginSuccess: NaverLoginResponse['successResponse'];
  naverLoginFailure: NaverLoginResponse['failureResponse'];

  setIsLoggedIn: (value: boolean) => void;
  setNaverLoginSuccess: (value: NaverLoginResponse['successResponse']) => void;
  setNaverLoginFailure: (value: NaverLoginResponse['failureResponse']) => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      isLoggedIn: false,
      naverLoginSuccess: undefined,
      naverLoginFailure: undefined,

      setIsLoggedIn: value => set({isLoggedIn: value}),
      setNaverLoginSuccess: value => set({naverLoginSuccess: value}),
      setNaverLoginFailure: value => set({naverLoginFailure: value}),
    }),
    {
      name: 'login state',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
