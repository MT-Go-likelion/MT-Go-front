import { useMutation } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationScrap = () => {
  const { mutate: recreationScrapMutation } = useMutation(
    (payload) => recreationAPI.scrap(payload),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { recreationScrapMutation };
};

export default useRecreationScrap;
