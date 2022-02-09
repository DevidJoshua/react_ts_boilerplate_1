import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { AddressResponse } from '@routes/Checkout/interface';

const API = `${API_HOST}addresses?user_profile=`;

const useGetAddress = () => {
  const [dataAddress, setDataAddress] = useState<AddressResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAddress = useCallback(async (token: string, profileID: number) => {
    setLoading(true);
    await fetcher(`${API}${profileID}`, {
      method: 'GET',
      token,
    })
      .then(response => {
        setDataAddress(response);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.warn(error);
      });
  }, []);

  return {
    getAddress,
    dataAddress,
    loading,
  };
};

export default useGetAddress;
