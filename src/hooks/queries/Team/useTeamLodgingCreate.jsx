import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodgingCreate = (userToken) => {
  const queryClient = useQueryClient();

  const { mutate: teamLodgingMutation } = useMutation(
    (paylod) => teamAPI.lodgingCreate(paylod, userToken),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['team', 'lodging']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { teamLodgingMutation };
};

export default useTeamLodgingCreate;
