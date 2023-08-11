import { useQuery } from '@tanstack/react-query';
import teamAPI from '../../../apis/teamAPI';

const useTeamShopping = (userToken, teamToken = {}) => {
  const teamShoppingQuery = useQuery(['team', teamToken, 'shopping'], () =>
    teamAPI.shoppingList(userToken, teamToken),
  );

  return { teamShoppingQuery };
};

export default useTeamShopping;
