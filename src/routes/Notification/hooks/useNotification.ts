import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import fetcher from '@helpers/fetcher';
import { NotificationResponse } from '../interface';

const API = `${API_HOST}user-inboxes?user_profile=`;

const useNotification = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataNotification, setDataNotification] = useState<NotificationResponse[]>([]);

  const getNotification = useCallback(async (token: string, profileID: number) => {
    try {
      setLoading(true);
      await fetcher(`${API}${profileID}`, {
        method: 'GET',
        token,
      })
        .then((result: NotificationResponse[]) => {
          setLoading(false);
          setDataNotification(result);
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
    getNotification,
    dataNotification,
    loading,
  };
};

export default useNotification;
