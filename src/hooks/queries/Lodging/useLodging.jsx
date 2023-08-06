import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodging = () => {
  const lodgingsQuery = useQuery(['lodgings'], lodgingAPI.list);

  const { mutate: scrapMutation } = useMutation((payload) => lodgingAPI.scrap(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { lodgingsQuery, scrapMutation, lodgingMutation };
};

export default useLodging;
