import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import recreationAPI from '../../../apis/recreationAPI';
import { useSignOut } from '../Auth/useSignOut';

const useRecreation = (token, page = 1) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const recreationsQuery = useQuery(
    ['recreations', page, token],
    () => recreationAPI.list(token, page),
    {
      onError: (error) => {
        if (error.response.data.detail === '토큰이 유효하지 않습니다.') {
          signOut();
          navigate('/signin');
        }
      },
    },
  );

  const { mutate: recreaetionMutation } = useMutation(
    (payload) => {
      return recreationAPI.create(payload);
    },
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  const { mutate: recreationDeleteMutation } = useMutation((pk) => recreationAPI.delete(pk), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { recreationsQuery, recreaetionMutation, recreationDeleteMutation };
};

export default useRecreation;
