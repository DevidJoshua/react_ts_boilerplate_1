import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProductTokenResponse } from '../inteface';

const API = `${API_HOST}sale-event-details/reward`;

const useGetProductToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProductToken, setDataProductToken] = useState<ProductTokenResponse[]>([]);

  const getProductToken = useCallback(async () => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
      })
        .then((result: ProductTokenResponse[]) => {
          setLoading(false);
          setDataProductToken(result.data);
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
    getProductToken,
    dataProductToken,
    loading,
  };
};

export default useGetProductToken;
