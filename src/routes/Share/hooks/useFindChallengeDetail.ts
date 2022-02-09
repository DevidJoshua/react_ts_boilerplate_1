import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ChallengeDetailResponse, ChallengeDetailDefault } from '../interface/challengeDetail';

const API = `${API_HOST}challenge-details?refChallengeNo=`;

const useFindChallengeDetail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataChallengeDetail, setDataChallengeDetail] =
    useState<ChallengeDetailResponse>(ChallengeDetailDefault);

  const getChallengeDetail = useCallback(async (refNo: string) => {
    setLoading(true);
    try {
      await fetcher(`${API}${refNo}`, {
        method: 'GET',
      })
        .then((result: ChallengeDetailResponse[]) => {
          setLoading(false);
          setDataChallengeDetail(result?.[0]);
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
    getChallengeDetail,
    dataChallengeDetail,
    loading,
  };
};

export default useFindChallengeDetail;
