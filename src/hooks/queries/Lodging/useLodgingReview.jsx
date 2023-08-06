import { useMutation } from '@tanstack/react-query';
import lodgingReviewAPI from '../../../apis/lodgingReviewAPI';

const useLodgingReview = (token) => {
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

  return { lodgingReviewMutation };
};

export default useLodgingReview;
