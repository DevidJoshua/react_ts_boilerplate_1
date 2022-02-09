import { useState, useCallback } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';

interface Props {
  token: string;
  addressID: number;
  profileID: number;
}

const API = `${API_HOST}addresses/`;

const useRecipient = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSaveRecipient = useCallback(
    async ({ token, addressID, profileID }: Props, paramsBody, cb: () => void) => {
      setLoading(true);
      try {
        await fetcher(`${API}${addressID}?user_profile=${profileID}`, {
          method: 'PUT',
          token,
          body: JSON.stringify(paramsBody),
        })
          .then((result: { namaPenerima: string }) => {
            setLoading(false);
            const isSuccess = Boolean(result.namaPenerima);

            if (isSuccess) {
              cb();
            }
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
    onSaveRecipient,
    loading,
  };
};

export default useRecipient;
