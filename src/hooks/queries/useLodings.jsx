import { useMutation, useQuery } from '@tanstack/react-query';
import LODGINGAPI from '../../apis/lodingAPI';

const useLodging = () => {
  const lodgingQuery = useQuery(['products'], LODGINGAPI.list);

  const { mutate: scrapMutation } = useMutation((payload) => LODGINGAPI.scrap(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: lodgingMutation } = useMutation((payload) => LODGINGAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { lodgingQuery, scrapMutation, lodgingMutation };
};

export default useLodging;
