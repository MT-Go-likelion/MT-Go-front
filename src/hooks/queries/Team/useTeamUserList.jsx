import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamUserList = (userToken, teamToken = {}) => {
  const teamUserQuery = useQuery(['team', teamToken, 'user'], () =>
    teamAPI.userList(userToken, teamToken),
  );

  return { teamUserQuery };
};

export default useTeamUserList;
