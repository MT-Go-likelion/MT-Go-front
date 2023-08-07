import { useMutation } from '@tanstack/react-query';
import shoppingAPI from '../../../apis/shoppingAPI';

const useShopping = (token) => {
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

  return { shoppingMutation };
};

export default useShopping;
