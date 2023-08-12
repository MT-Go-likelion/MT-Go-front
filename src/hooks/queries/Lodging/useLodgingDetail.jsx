import { useQuery } from '@tanstack/react-query';
import lodgingAPI from '../../../apis/lodgingAPI';

const useLodgingDetail = (id) => {
  const lodgingDetailQuery = useQuery(['lodging', id], () => lodgingAPI.detail(id));

  return { lodgingDetailQuery };
};

export default useLodgingDetail;
