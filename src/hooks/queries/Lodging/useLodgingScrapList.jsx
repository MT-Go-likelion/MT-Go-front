import { useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingScrapList = (token) => {
  const lodgingScrapQuery = useQuery(['lodging', token], () => lodgingAPI.scrapList(token));
  return { lodgingScrapQuery };
};

export default useLodgingScrapList;
