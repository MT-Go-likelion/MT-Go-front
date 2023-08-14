import { useMutation } from '@tanstack/react-query';
import authAPI from '../../../apis/authAPI';

const useUserUpdate = (id) => {
  const { mutate: userUpdateMutation } = useMutation((payload) => authAPI.update(payload, id), {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  return { userUpdateMutation };
};

export default useUserUpdate;
