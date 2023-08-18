import { useMutation } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationUpdate = (pk) => {
  const { mutate: lodgingUpdateMutation } = useMutation(
    (payload) => recreationAPI.update(payload, pk),
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { lodgingUpdateMutation };
};

export default useRecreationUpdate;
