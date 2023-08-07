import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodging = (token) => {
  const lodgingsQuery = useQuery(['lodgings'], () => lodgingAPI.list(token));

  const { mutate: scrapMutation } = useMutation((payload) => lodgingAPI.scrap(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  return { lodgingsQuery, scrapMutation, lodgingMutation };
};

export default useLodging;
