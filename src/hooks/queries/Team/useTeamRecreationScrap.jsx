import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreationScrap = (userToken, recreationPk) => {
  const queryClient = useQueryClient();

  const { mutate: teamRecreationMutation } = useMutation(
    (paylod) => teamAPI.recreaitonCreate(paylod, userToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['team', recreationPk, 'recreation']);
      },
      onError: () => {},
    },
  );

  return { teamRecreationMutation };
};

export default useTeamRecreationScrap;
