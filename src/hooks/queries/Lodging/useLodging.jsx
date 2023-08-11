import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodging = (token, page = 1) => {
  const lodgingsQuery = useQuery(['lodgings', page], () => lodgingAPI.list(token, page));

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { lodgingsQuery, lodgingMutation };
};

export default useLodging;
