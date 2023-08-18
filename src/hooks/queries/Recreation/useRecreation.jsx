import { useMutation, useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreation = (token, page = 1) => {
  const recreationsQuery = useQuery(['recreations', page, token], () =>
    recreationAPI.list(token, page),
  );

  const { mutate: recreaetionMutation } = useMutation(
    (payload) => {
      return recreationAPI.create(payload);
    },
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  const { mutate: recreationDeleteMutation } = useMutation((pk) => recreationAPI.delete(pk), {
    onSuccess: () => {},
    onError: () => {},
  });

  return { recreationsQuery, recreaetionMutation, recreationDeleteMutation };
};

export default useRecreation;
