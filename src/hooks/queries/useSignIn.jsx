import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authAPI from '../../apis/authAPI';

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signInMutation } = useMutation((payload) => authAPI.signIn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      navigate('/');
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  return { signInMutation };
};

export default useSignIn;
