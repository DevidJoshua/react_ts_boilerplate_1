import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { OrderListResponse } from '../interface';

const API_ORDER_DETAIL = `${API_HOST}purchase-order-bs/orderdetailwithimage/`;

const useOrderDetail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOrderDetail, setOrderDetail] = useState<OrderListResponse>();

  const getOrderDetail = useCallback(async (token: string, orderID: string) => {
    setLoading(true);
    await fetcher(`${API_ORDER_DETAIL}${orderID}`, {
      method: 'GET',
      token,
    })
      .then(result => {
        setLoading(false);
        setOrderDetail(result);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getOrderDetail,
    dataOrderDetail,
    loading,
  };
};

export default useOrderDetail;
