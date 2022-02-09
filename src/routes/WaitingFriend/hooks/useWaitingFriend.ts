import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { WaitingFriendResponse } from '../interface';

const API_WAITING_FRIEND = `${API_HOST}purchase-order-bs/waitingpage/grouporderdetail/`;

const useWaitingFriend = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataWaitingFriend, setDataWaitingFriend] = useState<WaitingFriendResponse>();

  const getWaitingFriend = useCallback(async (groupID: string | undefined) => {
    setLoading(true);
    await fetcher(`${API_WAITING_FRIEND}${groupID || ''}`, {
      method: 'GET',
    })
      .then((result: WaitingFriendResponse) => {
        setLoading(false);
        setDataWaitingFriend(result);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getWaitingFriend,
    dataWaitingFriend,
    loading,
  };
};

export default useWaitingFriend;
