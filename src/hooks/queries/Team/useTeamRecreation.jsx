import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreation = (token) => {
  const queryClient = useQueryClient();

  // const teamLodgingQuery = useQuery(['team', 'recreation'], () => teamAPI.recreaitonList(token));

  const { mutate: teamRecreationMutation } = useMutation(
    (paylod) => teamAPI.recreaitonCreate(paylod, token),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(['team', 'recreation']);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  return { teamRecreationMutation };
};

export default useTeamRecreation;
