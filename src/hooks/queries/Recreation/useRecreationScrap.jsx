import { useMutation } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationScrap = () => {
  const { mutate: recreationScrapMutation } = useMutation(
    (payload) => recreationAPI.scrap(payload),
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { recreationScrapMutation };
};

export default useRecreationScrap;
