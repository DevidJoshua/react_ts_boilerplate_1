import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { ProductListResponse } from '../interface';

const API_PRODUCTS = `${API_HOST}sale-event-details/category/`;

const useGetProductByCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProduct, setDataProduct] = useState<Array<ProductListResponse>>([]);

  const getProduct = useCallback(async (categoryID: string) => {
    setLoading(true);
    await fetcher(`${API_PRODUCTS}${categoryID}`, {
      method: 'GET',
    })
      .then(result => {
        setLoading(false);
        setDataProduct(result);
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

export default useGetProductByCategory;
