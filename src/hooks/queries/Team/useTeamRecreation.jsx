import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreation = (userToken, teamToken = {}) => {
  const queryClient = useQueryClient();

  const teamRecreationQuery = useQuery(['team', teamToken, 'recreation'], () =>
    teamAPI.recreaitonList(userToken, teamToken),
  );

  const { mutate: teamRecreationMutation } = useMutation(
    (paylod) => teamAPI.recreaitonCreate(paylod, userToken),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['team', teamToken, 'recreation']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { teamRecreationQuery, teamRecreationMutation };
};

export default useTeamRecreation;
