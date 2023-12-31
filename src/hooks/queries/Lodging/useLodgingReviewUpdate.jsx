import { useMutation } from '@tanstack/react-query';
import lodgingReviewAPI from '../../../apis/lodgingReviewAPI';

const useLodgingReviewUpdate = (pk) => {
  const { mutate: lodgingUpdateMutation } = useMutation(
    (payload) => lodgingReviewAPI.update(payload, pk),
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { lodgingUpdateMutation };
};

export default useLodgingReviewUpdate;
