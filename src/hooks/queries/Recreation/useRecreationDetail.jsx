import { useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationDetail = (id, token) => {
  const lodgingDetailQuery = useQuery(['lodging', id], () => recreationAPI.detail(id, token));
  return { lodgingDetailQuery };
};

export default useRecreationDetail;
