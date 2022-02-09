import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProductFreeResponse } from '../interface/productFree';

const API = `${API_HOST}sale-event-details/free`;

const useGetProductFree = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataProductFree, setDataProductFree] = useState<ProductFreeResponse[]>([]);

  const getProductFree = useCallback(async () => {
    setLoading(true);
    try {
      await fetcher(API, {
        method: 'GET',
      })
        .then((result: ProductFreeResponse[]) => {
          setLoading(false);
          setDataProductFree(result);
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
    getProductFree,
    dataProductFree,
    loading,
  };
};

export default useGetProductFree;
