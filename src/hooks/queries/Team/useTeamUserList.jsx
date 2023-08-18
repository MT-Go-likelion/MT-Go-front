import { useMutation, useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamUserList = (userToken, teamToken = {}) => {
  const teamUserQuery = useQuery(['team', teamToken, 'user'], () =>
    teamAPI.userList(userToken, teamToken),
  );

  const { mutate: teamUserDeleteMutation } = useMutation(
    ({ userToken, teamToken }) => {
      return teamAPI.userDelete(userToken, teamToken);
    },
    {
      onSuccess: () => {},
      onError: () => {},
    },
  );

  return { teamUserQuery, teamUserDeleteMutation };
};

export default useTeamUserList;
