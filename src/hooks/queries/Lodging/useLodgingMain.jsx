import { useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingMain = () => {
  const mainLodgingsQuery = useQuery(['lodgings'], () => lodgingAPI.mainList());

  return { mainLodgingsQuery };
};

export default useLodgingMain;
