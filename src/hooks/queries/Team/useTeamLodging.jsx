import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodging = (token) => {
  const queryClient = useQueryClient();

  //   const teamLodgingQuery = useQuery(['team', 'lodging'], () => teamAPI.lodgingList(token));

  const { mutate: teamLodgingMutation } = useMutation(
    (paylod) => teamAPI.lodgingCreate(paylod, token),
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

export default useTeamLodging;
