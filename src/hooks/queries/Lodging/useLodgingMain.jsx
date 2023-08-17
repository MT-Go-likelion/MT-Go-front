import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import lodgingAPI from '../../../apis/lodgingAPI';
import { useSignOut } from '../Auth/useSignOut';

const useLodgingMain = (token) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const mainLodgingsQuery = useQuery(['lodgings', token], () => lodgingAPI.mainList(token), {
    onError: (error) => {
      if (error.response.data.detail === '토큰이 유효하지 않습니다.') {
        signOut();
        navigate('/signin');
      }
    },
  });

  return { mainLodgingsQuery };
};

export default useLodgingMain;
