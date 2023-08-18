import { useMutation, useQueryClient } from '@tanstack/react-query';
import authAPI from '../../../apis/authAPI';

const useSuggestion = (token) => {
  const queryClient = useQueryClient();

  const { mutate: suggestionMutation } = useMutation(
    (content) => authAPI.suggestion(content, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['suggestion']);
      },
      onError: () => {},
    },
  );

  return { suggestionMutation };
};

export default useSuggestion;
