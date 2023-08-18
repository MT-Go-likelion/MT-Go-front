import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodging = (token, page, searchQuery) => {
  const lodgingsQuery = useQuery(['lodgings', page, token], () =>
    lodgingAPI.list(token, page, searchQuery),
  );

  const { mutate: lodgingMutation } = useMutation((payload) => lodgingAPI.create(payload), {
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: lodgingDeleteMutation } = useMutation((pk) => lodgingAPI.delete(pk), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { lodgingsQuery, lodgingMutation, lodgingDeleteMutation };
};

export default useLodging;
