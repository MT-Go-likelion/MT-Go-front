import { useMutation } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingScrap = () => {
  const { mutate: scrapMutation } = useMutation((payload) => lodgingAPI.scrap(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { scrapMutation };
};

export default useLodgingScrap;
