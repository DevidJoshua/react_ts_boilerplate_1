import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { WaitingResponse } from '../interface';

const API_WAITING = `${API_HOST}purchase-order-bs/waitingpage/groupinvitelink`;

const useWaiting = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataWaiting, setDataWaiting] = useState<WaitingResponse>();

  const getWaiting = useCallback(async (token: string, orderNumber: string) => {
    setLoading(true);
    await fetcher(API_WAITING, {
      method: 'POST',
      token,
      body: JSON.stringify({
        order_no: orderNumber,
      }),
    })
      .then((result: WaitingResponse) => {
        setLoading(false);
        setDataWaiting(result);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getWaiting,
    dataWaiting,
    loading,
  };
};

export default useWaiting;
