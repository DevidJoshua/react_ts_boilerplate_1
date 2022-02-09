import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@/helpers/fetcher';
import { AddressListResponse } from '@routes/Address/interface/list';

type GetAddressParams = {
  token: string;
  profileID: number;
  body?: string;
};

const API_ADDRESS_LIST = `${API_HOST}addresses?user_profile=`;

const useGetAddress = () => {
  const [loading, setLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState<Array<AddressListResponse>>([]);

  const getAddress = useCallback(async ({ token, profileID, body }: GetAddressParams) => {
    try {
      setLoading(true);
      await fetcher(`${API_ADDRESS_LIST}${profileID}`, {
        method: 'GET',
        token,
        body,
      })
        .then(result => {
          setLoading(false);
          setDataAddress(result);
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
    getAddress,
    dataAddress,
    loading,
  };
};

export default useGetAddress;
