import { useState, useCallback, useEffect } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { useUserData } from '@/context/userData';
import { CartResponseInterface, CartItemResponseInterface } from './interface';

const API_GET_CART = `${API_HOST}user-shopping-carts/withproductvarian?user_profile=`;

const useGetCart = (isAutoRun = false) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataCart, setDataCart] = useState<Array<CartItemResponseInterface>>([]);

  const {
    loading: loadingUserData,
    userInfo: { token, profileID },
  } = useUserData();

  const getCart = useCallback(async () => {
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
  }, [profileID, token]);

  useEffect(() => {
    if (isAutoRun && !loadingUserData && profileID > 0) {
      getCart();
    }
  }, [getCart, isAutoRun, loadingUserData, profileID]);

  return {
    getCart,
    dataCart,
    loading,
  };
};

export default useGetCart;
