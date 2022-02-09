import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProductListResponse,ParameterData } from '../interface';



const useProductList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<Array<ProductListResponse>>([]);

  const getProduct = useCallback(async (params:ParameterData) => {
    const {page,size} = params
    const API = `${API_HOST}sale-event-details/base?page=${page}&=${size}`;
    setLoading(true);
    await fetcher(API, {
      method: 'GET',
    })
      .then(result => {
        setLoading(false);
        dataProduct.push(result.data)
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getProduct,
    dataProduct,
    loading,
  };
};

export default useProductList;
