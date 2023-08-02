import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useSignInMutation = () => {
  const { mutate: signInMutation } = useMutation(
    (payLoad) => {
      //   axios.post('http://110.11.183.148:8000/accounts/user/signin/');
      axios.post('https://reqres.in/api/loign', payLoad).then((res) => console.log(res));
    },
    {
      onSuccess: () => {
        //
        // navigate('/signin');
      },
      onError: (error) => {
        //
        console.error(error);
      },
    },
  );

  return { signInMutation };
};

export default useSignInMutation;
