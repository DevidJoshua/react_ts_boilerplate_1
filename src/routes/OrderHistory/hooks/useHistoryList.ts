import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { OrderListResponse } from '../interface';

const API_ORDER_LIST = `${API_HOST}purchase-order-bs/findorderwithflag/`;

const useHistoryList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataOrderList, setOrderList] = useState<Array<OrderListResponse>>([]);

  const getOrderList = useCallback(async (token: string, profileID: number) => {
    setLoading(true);
    await fetcher(`${API_ORDER_LIST}${profileID}`, {
      method: 'GET',
      token,
    })
      .then(result => {
        setLoading(false);
        setOrderList(result);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getOrderList,
    dataOrderList,
    loading,
  };
};

export default useHistoryList;
