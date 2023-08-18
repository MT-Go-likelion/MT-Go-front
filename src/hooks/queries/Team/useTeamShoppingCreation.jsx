import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamShoppingCreation = (userToken) => {
  const queryClient = useQueryClient();

  const { mutate: teamShoppingMutation } = useMutation(
    (paylod) => teamAPI.shoppingCreate(paylod, userToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team', 'shopping']);
      },
      onError: () => {},
    },
  );

  return { teamShoppingMutation };
};

export default useTeamShoppingCreation;
