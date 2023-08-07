import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import lodgingReviewAPI from '../../../apis/lodgingReviewAPI';

const useLodgingReview = (token, id) => {
  const queryClient = useQueryClient();

  const lodgingReviewQuery = useQuery(['lodging', id, 'reviews'], () => lodgingReviewAPI.list(id), {
    enabled: !!id,
  });

  const { mutate: lodgingReviewMutation } = useMutation(
    (payload) => lodgingReviewAPI.create(payload, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lodging', id, 'reviews']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { lodgingReviewMutation, lodgingReviewQuery };
};

export default useLodgingReview;
