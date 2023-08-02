import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function signUp(payload) {
  const response = axios
    .post('http://110.11.183.148:8000/accounts/user/signup/', payload)
    .then((res) => res.data);

  return response;
}

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { mutate: signUpMutation } = useMutation((payload) => signUp(payload), {
    onSuccess: () => {
      navigate('/signin');
    },
    onError: (error) => {
      //
      console.error(error);
    },
  });

  return { signUpMutation };
};

export default useSignUpMutation;
