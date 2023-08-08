import { useMutation, useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreation = (token) => {
  const recreationsQuery = useQuery(['recreations'], () => recreationAPI.list(token));

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

  return { recreationsQuery, recreaetionMutation };
};

export default useRecreation;