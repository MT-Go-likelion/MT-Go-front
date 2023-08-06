import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authAPI from '../../../apis/authAPI';

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { mutate: signUpMutation } = useMutation((payload) => authAPI.signUp(payload), {
    onSuccess: () => {
      navigate('/signin');
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  return { signUpMutation };
};

export default useSignUpMutation;
