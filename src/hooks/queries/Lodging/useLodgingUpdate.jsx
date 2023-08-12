import { useMutation } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingUpdate = (pk) => {
  const { mutate: lodgingUpdateMutation } = useMutation(
    (payload) => lodgingAPI.update(payload, pk),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { lodgingUpdateMutation };
};

export default useLodgingUpdate;
