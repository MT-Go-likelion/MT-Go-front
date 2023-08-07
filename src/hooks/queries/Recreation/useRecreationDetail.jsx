import { useQuery } from '@tanstack/react-query';
import recreationAPI from '../../../apis/recreationAPI';

const useRecreationDetail = (id) => {
  const lodgingDetailQuery = useQuery(['lodging', id], () => recreationAPI.detail(id));
  return { lodgingDetailQuery };
};

export default useRecreationDetail;
