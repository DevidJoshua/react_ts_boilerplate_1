import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { GroupOrderResponse } from '../interface';

const API = `${API_HOST}buyer-group-bs/filteredgrouporder`;

const useGetGroup = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [dataGroup, setDataGroup] = useState<GroupOrderResponse['groupOrders']>([]);

  const getGroup = useCallback(async (token: string) => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
        token,
      })
        .then((result: GroupOrderResponse) => {
          setLoading(false);

          if (result.message) {
            setError(true);
          } else {
            setDataGroup(result.groupOrders);
          }
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
          setError(true);
        });
    } catch (error) {
      setLoading(false);
      console.warn(error);
      setError(true);
    }
  }, []);

  return {
    getGroup,
    dataGroup,
    loading,
    error,
  };
};

export default useGetGroup;
