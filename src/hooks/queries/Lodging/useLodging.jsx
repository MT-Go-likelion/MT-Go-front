import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import lodgingAPI from '../../../apis/lodgingAPI';
import { useSignOut } from '../Auth/useSignOut';

const useLodging = (token, page, searchQuery) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const lodgingsQuery = useQuery(
    ['lodgings', page, token],
    () => lodgingAPI.list(token, page, searchQuery),
    {
      onError: (error) => {
        if (error.response.data.detail === '토큰이 유효하지 않습니다.') {
          signOut();
          navigate('/signin');
        }
      },
    },
  );

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: lodgingDeleteMutation } = useMutation((pk) => lodgingAPI.delete(pk), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { lodgingsQuery, lodgingMutation, lodgingDeleteMutation };
};

export default useLodging;
