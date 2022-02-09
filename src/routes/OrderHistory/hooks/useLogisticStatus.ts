import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { LogisticStatusResponse } from '../interface/LogisticStatus';

const API = `${API_HOST}ext-services/logistic/statusdescr`;

const useHistoryList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataLogisticStatus, setLogisticStatus] = useState<Array<LogisticStatusResponse>>([]);

  const getLogisticStatus = useCallback(async () => {
    try {
      setLoading(true);
      await fetcher(API, {
        method: 'GET',
      })
        .then(result => {
          setLoading(false);
          setLogisticStatus(result);
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
    getLogisticStatus,
    dataLogisticStatus,
    loading,
  };
};

export default useHistoryList;
