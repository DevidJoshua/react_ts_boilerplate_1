import { useState, useCallback } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { DeleteCartResponse } from '../interface/delete';

interface Props {
  token: string;
  cartID: number;
}

const API_GET_CART = `${API_HOST}user-shopping-carts/`;

const useDeleteCart = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDeleteCart = useCallback(
    async ({ token, cartID }: Props, cb: (params: DeleteCartResponse) => void) => {
      setLoading(true);
      try {
        await fetcher(`${API_GET_CART}${cartID}`, {
          method: 'DELETE',
          token,
        })
          .then((result: DeleteCartResponse) => {
            setLoading(false);
            cb(result);
          })
          .catch(error => {
            setLoading(false);
            console.warn(error);
          });
      } catch (error) {
        setLoading(false);
        console.warn(error);
      }
    },
    [],
  );

  return {
    onDeleteCart,
    loading,
  };
};

export default useDeleteCart;
