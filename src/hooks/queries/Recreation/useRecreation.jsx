import { useMutation, useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreation = (token, page = 1) => {
  const recreationsQuery = useQuery(['recreations', page], () => recreationAPI.list(token, page));

  const { mutate: recreaetionMutation } = useMutation(
    (payload) => {
      console.log(payload);
      return recreationAPI.create(payload);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const { mutate: recreationDeleteMutation } = useMutation((pk) => recreationAPI.delete(pk), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { recreationsQuery, recreaetionMutation, recreationDeleteMutation };
};

export default useRecreation;
