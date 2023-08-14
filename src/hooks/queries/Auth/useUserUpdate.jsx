import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAPI from '../../../apis/authAPI';

const useUserUpdate = (id) => {
  const queryClient = useQueryClient();
  const previousData = queryClient.getQueryData(['user']);

  const { mutate: userUpdateMutation } = useMutation((payload) => authAPI.update(payload, id), {
    onMutate: (newData) => {
      queryClient.setQueryData(['user'], { ...previousData, name: newData });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { userUpdateMutation };
};

export default useUserUpdate;
