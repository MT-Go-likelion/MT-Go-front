import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeam = (token) => {
  const queryClient = useQueryClient();

  const teamQuery = useQuery(['teams'], () => teamAPI.list(token));

  const { mutate: teamJoinMutation } = useMutation((payload) => teamAPI.join(payload, token), {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['teams']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: teamMutation } = useMutation((name) => teamAPI.create(name, token), {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['teams']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { teamQuery, teamJoinMutation, teamMutation };
};

export default useTeam;
