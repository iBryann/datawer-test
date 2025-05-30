import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { API } from '../../service';
import { UserStoreType, SigninResponseType, SigninPayloadType } from './types';

export const userStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: {} as SigninResponseType,
      accessToken: '',
      signin: async (payload: SigninPayloadType) => {
        const response = await API.post('/user/signin', payload).then(
          (res) => res.data
        );
        const { accessToken, ...user } = response;

        set(() => ({ accessToken, user }));
        window.location.href = '/home';
      },
      logout: () => {
        set(() => ({ user: {} as SigninResponseType }));
        window.location.href = '/';
      },
    }),
    {
      name: '@app:user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
