import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ChallengeStatusResponse } from '../interface';

const API_ORDER_LIST = `${API_HOST}mgmcheckstats?refNo=`;

const useChallengeStatus = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataChallengeStatus, setDataChallengeStatus] = useState<ChallengeStatusResponse>(
    {} as ChallengeStatusResponse,
  );

  const getChallengeStatus = useCallback(async (refNo: string) => {
    setLoading(true);
    try {
      await fetcher(`${API_ORDER_LIST}${refNo}`, {
        method: 'GET',
      })
        .then(result => {
          setLoading(false);
          setDataChallengeStatus(result);
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
    getChallengeStatus,
    dataChallengeStatus,
    loading,
  };
};

export default useChallengeStatus;
