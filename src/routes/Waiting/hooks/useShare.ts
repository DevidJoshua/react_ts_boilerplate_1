import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ShareResponse } from '../interface';

const API_SHARE = `${API_HOST}purchase-order-bs/group/invitelink`;

const useWaiting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataShare, setDataShare] = useState<ShareResponse['data']>([]);

  const getShare = useCallback(async (token: string, params) => {
    setLoading(true);
    try {
      await fetcher(API_SHARE, {
        method: 'POST',
        token,
        body: JSON.stringify(params),
      })
        .then((result: ShareResponse) => {
          setLoading(false);
          setDataShare(result.data);
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
        });
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  }, []);

  return {
    getShare,
    dataShare,
    loading,
  };
};

export default useWaiting;
