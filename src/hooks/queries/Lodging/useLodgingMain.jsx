import { useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingMain = (token) => {
  const mainLodgingsQuery = useQuery(['lodgings'], () => lodgingAPI.mainList(token));

  return { mainLodgingsQuery };
};

export default useLodgingMain;
