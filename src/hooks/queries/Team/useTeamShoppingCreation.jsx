import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamShoppingCreation = (userToken) => {
  const queryClient = useQueryClient();

  const { mutate: teamShoppingMutation } = useMutation(
    (paylod) => teamAPI.shoppingCreate(paylod, userToken),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['team', 'shopping']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { teamShoppingMutation };
};

export default useTeamShoppingCreation;
