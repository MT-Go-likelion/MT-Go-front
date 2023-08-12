import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import lodgingReviewAPI from '../../../apis/lodgingReviewAPI';

const useLodgingReview = (token, id, page = 1) => {
  const queryClient = useQueryClient();

  const lodgingReviewQuery = useQuery(
    ['lodging', page, 'reviews'],
    () => lodgingReviewAPI.list(id, page),
    {
      enabled: !!id,
    },
  );

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
