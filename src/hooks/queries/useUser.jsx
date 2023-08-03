import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as userLocalStorage from '../../utils/userLocalstore';

// 백한테 user 정보 달라고 요청해야함 추후에 회의 후 수정
function getUser(user) {
  if (!user) return null;
  //   const { data } = await axiosInstance.get(`/user/${user.id}`);
  //   return data.user;
  return {};
}

export function useUser() {
  const { data: user } = useQuery(['user'], () => getUser(user), {
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
