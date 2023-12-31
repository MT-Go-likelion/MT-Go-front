import { useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationScrapList = (token) => {
  const recreationScrapQuery = useQuery(['recreationScrap'], () => recreationAPI.scrapList(token));
  return { recreationScrapQuery };
};

export default useRecreationScrapList;
