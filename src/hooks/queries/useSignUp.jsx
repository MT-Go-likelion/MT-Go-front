import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const useSignUpMutation = () => {
  //   const navigate = useNavigate();
  const { mutate: signUpMutation } = useMutation(
    (payLoad) => {
      // signUp(payLoad)
      console.log(payLoad);
      // axios.post('http://110.11.183.148:8000/accounts/user/signup/')
      axios.post('https://reqres.in/api/users', payLoad).then((res) => console.log(res));
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

  return { signUpMutation };
};

export default useSignUpMutation;

// axios
//   .post('http://110.11.183.148:8000/accounts/user/signup/', {
//     email,
//     password,
//     name,
//   })
//   .then((response) => {
//     // 요청 성공 시 처리
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // 요청 실패 시 처리
//     console.error(error);
//   });
