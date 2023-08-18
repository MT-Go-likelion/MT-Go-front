import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import teamAPI from '../../../apis/teamAPI';
import { useSignOut } from '../Auth/useSignOut';

const useTeam = (token = '') => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const teamQuery = useQuery(['teams'], () => teamAPI.list(token), {
    onError: (error) => {
      if (error.response.data.detail === '토큰이 유효하지 않습니다.') {
        signOut();
        navigate('/signin');
      }
    },
  });

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
