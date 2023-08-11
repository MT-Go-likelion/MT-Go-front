import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamLodgingScrap = (userToken, lodgingPk) => {
  const teamLodgingScrapQuery = useQuery(['team', lodgingPk, 'lodging'], () =>
    teamAPI.lodgingScrapList(userToken, lodgingPk),
  );

  return { teamLodgingScrapQuery };
};

export default useTeamLodgingScrap;
