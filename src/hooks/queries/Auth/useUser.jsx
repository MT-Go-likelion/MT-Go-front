import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as userLocalStorage from '../../../utils/userLocalstore';

import authAPI from '../../../apis/authAPI';

export function useUser() {
  const { data: user } = useQuery(['user'], () => user && authAPI.user(user.id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser,
    onError: () => {
      userLocalStorage.removeUser();
    },
  });

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user || null,
  };
}
