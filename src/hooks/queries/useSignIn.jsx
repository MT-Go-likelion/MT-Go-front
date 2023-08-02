import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function signIn(payload) {
  const response = await axios
    .post('http://110.11.183.148:8000/accounts/user/signin/', payload)
    .then((res) => res.data);

  return response;
}

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signInMutation } = useMutation((payload) => signIn(payload), {
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      //
      navigate('/');
    },
    onError: (error) => {
      //
      throw new Error(error);
    },
  });

  return { signInMutation };
};

export default useSignIn;
