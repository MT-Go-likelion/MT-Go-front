import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodging = (userToken, teamToken = {}) => {
  const teamLodgingQuery = useQuery(['team', teamToken, 'lodging'], () =>
    teamAPI.lodgingList(userToken, teamToken),
  );

  return { teamLodgingQuery };
};

export default useTeamLodging;
