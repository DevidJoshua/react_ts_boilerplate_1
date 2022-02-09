import { useState, useCallback } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { CartResponseInterface, CartItemResponseInterface } from '../interface';

interface Props {
  token: string;
  profileID: number;
}

const API_GET_CART = `${API_HOST}user-shopping-carts/withproductvarian?user_profile=`;

const useGetCart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCart, setDataCart] = useState<Array<CartItemResponseInterface>>([]);

  const getCart = useCallback(async ({ token, profileID }: Props) => {
    setLoading(true);
    const result = await fetcher(`${API_GET_CART}${profileID}`, {
      method: 'GET',
      token,
    })
      .then((result: CartResponseInterface) => {
        setLoading(false);
        setDataCart(result.carts);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });

    return result;
  }, []);

  return {
    getCart,
    dataCart,
    loading,
  };
};

export default useGetCart;
