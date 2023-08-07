import { useMutation } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreation = () => {
  const { mutate: recreaetionMutation } = useMutation((payload) => recreationAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { recreaetionMutation };
};

export default useRecreation;
