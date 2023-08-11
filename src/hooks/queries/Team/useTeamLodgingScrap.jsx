import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodgingScrap = (userToken, lodgingPk) => {
  const queryClient = useQueryClient();

  const { mutate: teamLodgingMutation } = useMutation(
    (paylod) => teamAPI.lodgingCreate(paylod, userToken),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['team', lodgingPk, 'lodging']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { teamLodgingMutation };
};

export default useTeamLodgingScrap;
