import { useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationMain = (token) => {
  const mainRecreationsQuery = useQuery(['recreations', token], () =>
    recreationAPI.mainList(token),
  );

  return { mainRecreationsQuery };
};

export default useRecreationMain;
