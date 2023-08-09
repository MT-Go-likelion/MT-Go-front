import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreationCreate = (userToken) => {
  const queryClient = useQueryClient();

  const { mutate: teamRecreationMutation } = useMutation(
    (paylod) => teamAPI.recreaitonCreate(paylod, userToken),
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

export default useTeamRecreationCreate;
