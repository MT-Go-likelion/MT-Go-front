import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamRecreationIsScrap = (userToken, recreationPk) => {
  const teamRecreationScrapQuery = useQuery(['team', recreationPk, 'recreation'], () =>
    teamAPI.recreationScrapList(userToken, recreationPk),
  );

  return { teamRecreationScrapQuery };
};

export default useTeamRecreationIsScrap;
