import { useMutation, useQuery } from '@tanstack/react-query';
import shoppingAPI from '../../../apis/shoppingAPI';

const useShopping = (token) => {
  const shoppingQuery = useQuery(['shopping'], () => shoppingAPI.list(token));

  const { mutate: shoppingMutation } = useMutation(
    (payload) => shoppingAPI.create(payload, token),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { shoppingMutation, shoppingQuery };
};

export default useShopping;
