import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeam = (token = '') => {
  const queryClient = useQueryClient();

  const teamQuery = useQuery(['teams'], () => teamAPI.list(token));

  const { mutate: teamJoinMutation } = useMutation((payload) => teamAPI.join(payload, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
    },
    onError: () => {},
  });

  const { mutate: teamMutation } = useMutation((name) => teamAPI.create(name, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['teams']);
    },
    onError: () => {},
  });

  const { mutate: teamDeleteMutation } = useMutation(
    ({ userToken, teamToken }) => {
      return teamAPI.delete(userToken, teamToken);
    },
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { teamQuery, teamJoinMutation, teamMutation, teamDeleteMutation };
};

export default useTeam;
