import { useMutation, useQuery } from '@tanstack/react-query';
import roomAPI from '../../apis/roomAPI';

const useRoom = () => {
  const roomQuery = useQuery(['products'], roomAPI.list);

  const { mutate: scrapMutation } = useMutation((payload) => roomAPI.scrap(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: roomMutation } = useMutation((payload) => roomAPI.create(payload), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { roomQuery, scrapMutation, roomMutation };
};

export default useRoom;
