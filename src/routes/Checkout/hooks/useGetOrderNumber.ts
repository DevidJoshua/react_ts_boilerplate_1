import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { OrderNumberResponse, defaultPropsOrderNumberResponse } from '@routes/Checkout/interface';

const API = `${API_HOST}purchase-order-bs/generateordernum`;

const useGetOrderNumber = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataOrderNumber, setDataOrderNumber] = useState<OrderNumberResponse>(
    defaultPropsOrderNumberResponse,
  );

  const getOrderNumber = useCallback(async (token: string) => {
    setLoading(true);
    await fetcher(API, {
      method: 'GET',
      token,
    })
      .then(response => {
        setDataOrderNumber(response);
        setLoading(false);
      })
      .catch(error => {
        console.warn(error);
        setLoading(false);
      });
  }, []);

  return {
    getOrderNumber,
    dataOrderNumber,
    loading,
  };
};

export default useGetOrderNumber;
