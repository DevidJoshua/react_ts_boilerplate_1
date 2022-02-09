import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@/helpers/fetcher';

interface SetDefaultParams {
  token: string;
  profileID: number;
  body?: string;
}

interface setDefaultResponse {
  defaultAddress: {
    isDefault?: boolean;
  };
}

const API = `${API_HOST}addresses/updatedefault?user_profile=`;

const useSetDefault = () => {
  const [loading, setLoading] = useState(true);

  const onSetDefault = useCallback(
    async ({ token, profileID, body }: SetDefaultParams, cb: (isTrue: boolean) => void) => {
      try {
        setLoading(true);
        await fetcher(`${API}${profileID}`, {
          method: 'PUT',
          token,
          body,
        })
          .then((result: setDefaultResponse) => {
            setLoading(false);
            cb(result.defaultAddress.isDefault || false);
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
    onSetDefault,
    loading,
  };
};

export default useSetDefault;
