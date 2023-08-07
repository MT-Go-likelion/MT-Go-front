import { useMutation, useQuery } from '@tanstack/react-query';
import lodgingReviewAPI from '../../../apis/lodgingReviewAPI';

const useLodgingReview = (token, id) => {
  const lodgingReviewQuery = useQuery(['lodging', id, 'reviews'], () => lodgingReviewAPI.list(id));

  const { mutate: lodgingReviewMutation } = useMutation(
    (payload) => lodgingReviewAPI.create(payload, token),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { lodgingReviewMutation, lodgingReviewQuery };
};

export default useLodgingReview;
