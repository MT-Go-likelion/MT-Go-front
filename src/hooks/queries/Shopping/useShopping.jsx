import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import shoppingAPI from '../../../apis/shoppingAPI';
import { useSignOut } from '../Auth/useSignOut';

const useShopping = (token) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const shoppingQuery = useQuery(['shopping'], () => shoppingAPI.list(token), {
    onError: (error) => {
      if (error.response.data.detail === '토큰이 유효하지 않습니다.') {
        signOut();
        navigate('/signin');
      }
    },
  });

  const { mutate: shoppingMutation } = useMutation(
    (payload) => shoppingAPI.create(payload, token),
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { shoppingMutation, shoppingQuery };
};

export default useShopping;
