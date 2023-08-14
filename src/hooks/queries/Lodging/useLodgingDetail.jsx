import { useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingDetail = (id, token) => {
  const lodgingDetailQuery = useQuery(['lodging', id], () => lodgingAPI.detail(id, token));

  return { lodgingDetailQuery };
};

export default useLodgingDetail;
