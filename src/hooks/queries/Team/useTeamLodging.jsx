import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodging = (userToken, teamToken = {}) => {
  const queryClient = useQueryClient();

  const teamLodgingQuery = useQuery(['team', 'lodging'], () =>
    teamAPI.lodgingList(userToken, teamToken),
  );

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

  return { teamLodgingQuery, teamLodgingMutation };
};

export default useTeamLodging;
