import { useMutation } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingScrap = () => {
  const { mutate: lodgingScrapMutation } = useMutation((payload) => lodgingAPI.scrap(payload), {
    onSuccess: () => {},
    onError: () => {},
  });
  return { lodgingScrapMutation };
};

export default useLodgingScrap;
