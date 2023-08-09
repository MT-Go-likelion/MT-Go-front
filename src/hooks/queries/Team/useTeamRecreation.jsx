import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreation = (userToken, teamToken = {}) => {
  const teamRecreationQuery = useQuery(['team', teamToken, 'recreation'], () =>
    teamAPI.recreaitonList(userToken, teamToken),
  );

  return { teamRecreationQuery };
};

export default useTeamRecreation;
