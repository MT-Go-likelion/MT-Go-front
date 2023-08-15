import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodging = (token, page, searchQuery) => {
  const lodgingsQuery = useQuery(['lodgings', page, token], () =>
    lodgingAPI.list(token, page, searchQuery),
  );

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: lodgingDeleteMutation } = useMutation((pk) => lodgingAPI.delete(pk), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { lodgingsQuery, lodgingMutation, lodgingDeleteMutation };
};

export default useLodging;
